import { eq } from 'drizzle-orm'
import { db } from '../../../db'
import { permohonanLesen } from '../../../db/schema'
import { requireRole, insertAuditTrail } from '../../../utils/rbac'
import type { Role } from '../../../utils/rbac'

type StatusTransition = {
  from: string[]
  to: string
  roles: Role[]
}

const transitions: StatusTransition[] = [
  { from: ['draf'], to: 'dikemukakan', roles: ['PL', 'ADMIN'] },
  { from: ['dikemukakan'], to: 'semakan_PS', roles: ['PS', 'ADMIN'] },
  { from: ['semakan_PS'], to: 'lulus_PS', roles: ['PS', 'ADMIN'] },
  { from: ['semakan_PS'], to: 'ditolak', roles: ['PS', 'ADMIN'] },
  { from: ['lulus_PS'], to: 'semakan_KU', roles: ['KU', 'ADMIN'] },
  { from: ['semakan_KU'], to: 'diluluskan', roles: ['KU', 'ADMIN'] },
  { from: ['semakan_KU'], to: 'ditolak', roles: ['KU', 'ADMIN'] }
]

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)
  const { status: newStatus, catatan } = body

  const existing = await db.query.permohonanLesen.findFirst({
    where: (p, { eq }) => eq(p.id, id)
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Permohonan tidak dijumpai' })
  }

  const transition = transitions.find(t => t.to === newStatus && t.from.includes(existing.status))
  if (!transition) {
    throw createError({ statusCode: 400, statusMessage: `Tidak boleh tukar status dari "${existing.status}" ke "${newStatus}"` })
  }

  const session = await requireRole(event, transition.roles)
  const userRole = (session.user as { role?: string }).role as Role

  const updates: Record<string, unknown> = {
    status: newStatus,
    updatedAt: new Date()
  }

  if (newStatus === 'dikemukakan') updates.submittedAt = new Date()
  if (newStatus === 'diluluskan') updates.approvedAt = new Date()

  if (userRole === 'PS') updates.catatanPS = catatan ?? null
  if (userRole === 'KU') updates.catatanKU = catatan ?? null

  await db.update(permohonanLesen).set(updates).where(eq(permohonanLesen.id, id))

  await insertAuditTrail({
    userId: session.user.id,
    action: `STATUS_${newStatus.toUpperCase()}`,
    resourceType: 'permohonan_lesen',
    resourceId: String(id),
    oldValue: { status: existing.status },
    newValue: { status: newStatus, catatan },
    ipAddress: getRequestIP(event),
    userAgent: getRequestHeader(event, 'user-agent')
  })

  return { id, status: newStatus }
})
