import { db } from '../../db'
import { permohonanLesen } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { requireRole, insertAuditTrail } from '../../utils/rbac'

export default defineEventHandler(async (event) => {
  const session = await requireRole(event, ['PS', 'KU', 'ADMIN', 'PL'])
  const body = await readBody(event)
  const { id, action, comment, assigneeId } = body

  if (!id || !action) throw createError({ statusCode: 400, statusMessage: 'Missing id or action' })

  const row = await db.query.permohonanLesen.findFirst({ where: (t, { eq }) => eq(t.id, Number(id)) })
  if (!row) throw createError({ statusCode: 404, statusMessage: 'Permohonan not found' })

  const oldValue = { status: row.status, assignedPSId: row.assignedPSId, assignedKUId: row.assignedKUId }

  switch (action) {
    case 'claim': {
      if (session.user.role === 'PS') {
        await db.update(permohonanLesen).set({ assignedPSId: session.user.id }).where(eq(permohonanLesen.id, Number(id))).run()
      } else if (session.user.role === 'KU') {
        await db.update(permohonanLesen).set({ assignedKUId: session.user.id }).where(eq(permohonanLesen.id, Number(id))).run()
      } else {
        throw createError({ statusCode: 403, statusMessage: 'Role cannot claim' })
      }
      await insertAuditTrail({ userId: session.user.id, action: 'CLAIM_PERMOHONAN', resourceType: 'permohonan_lesen', resourceId: String(id), oldValue, newValue: { claimedBy: session.user.id } })
      break
    }

    case 'approve_ps': {
      if (session.user.role !== 'PS') throw createError({ statusCode: 403, statusMessage: 'Only PS can approve here' })
      await db.update(permohonanLesen).set({ status: 'lulus_PS', catatanPS: comment ?? null }).where(eq(permohonanLesen.id, Number(id))).run()
      await insertAuditTrail({ userId: session.user.id, action: 'APPROVE_PS', resourceType: 'permohonan_lesen', resourceId: String(id), oldValue, newValue: { status: 'lulus_PS' } })
      break
    }

    case 'reject_ps': {
      if (session.user.role !== 'PS') throw createError({ statusCode: 403, statusMessage: 'Only PS can reject here' })
      await db.update(permohonanLesen).set({ status: 'ditolak', catatanPS: comment ?? null }).where(eq(permohonanLesen.id, Number(id))).run()
      await insertAuditTrail({ userId: session.user.id, action: 'REJECT_PS', resourceType: 'permohonan_lesen', resourceId: String(id), oldValue, newValue: { status: 'ditolak' } })
      break
    }

    case 'approve_ku': {
      if (session.user.role !== 'KU') throw createError({ statusCode: 403, statusMessage: 'Only KU can approve here' })
      await db.update(permohonanLesen).set({ status: 'diluluskan', catatanKU: comment ?? null, approvedAt: new Date() }).where(eq(permohonanLesen.id, Number(id))).run()
      await insertAuditTrail({ userId: session.user.id, action: 'APPROVE_KU', resourceType: 'permohonan_lesen', resourceId: String(id), oldValue, newValue: { status: 'diluluskan' } })
      break
    }

    case 'reject_ku': {
      if (session.user.role !== 'KU') throw createError({ statusCode: 403, statusMessage: 'Only KU can reject here' })
      await db.update(permohonanLesen).set({ status: 'ditolak', catatanKU: comment ?? null }).where(eq(permohonanLesen.id, Number(id))).run()
      await insertAuditTrail({ userId: session.user.id, action: 'REJECT_KU', resourceType: 'permohonan_lesen', resourceId: String(id), oldValue, newValue: { status: 'ditolak' } })
      break
    }

    case 'assign_ku': {
      if (!assigneeId) throw createError({ statusCode: 400, statusMessage: 'assigneeId required' })
      if (!['PS', 'ADMIN'].includes(session.user.role)) throw createError({ statusCode: 403, statusMessage: 'Not allowed' })
      await db.update(permohonanLesen).set({ assignedKUId: assigneeId }).where(eq(permohonanLesen.id, Number(id))).run()
      await insertAuditTrail({ userId: session.user.id, action: 'ASSIGN_KU', resourceType: 'permohonan_lesen', resourceId: String(id), oldValue, newValue: { assignedKUId: assigneeId } })
      break
    }

    default:
      throw createError({ statusCode: 400, statusMessage: 'Unknown action' })
  }

  const updated = await db.query.permohonanLesen.findFirst({ where: (t, { eq }) => eq(t.id, Number(id)) })
  return { ok: true, data: updated }
})
