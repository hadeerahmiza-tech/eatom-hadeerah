import type { H3Event } from 'h3'
import { auth } from './auth'

export type Role = 'ADMIN' | 'PS' | 'KU' | 'P' | 'KP' | 'PL' | 'AWAM'

export async function requireAuth(event: H3Event) {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, statusMessage: 'Tidak Dibenarkan' })
  }
  return session
}

export async function requireRole(event: H3Event, roles: Role[]) {
  const session = await requireAuth(event)
  const userRole = (session.user as { role?: string }).role as Role | undefined
  if (!userRole || !roles.includes(userRole)) {
    throw createError({ statusCode: 403, statusMessage: 'Akses Dinafikan' })
  }
  return session
}

export async function insertAuditTrail(params: {
  userId?: string | null
  action: string
  resourceType: string
  resourceId?: string | null
  oldValue?: unknown
  newValue?: unknown
  ipAddress?: string | null
  userAgent?: string | null
}) {
  const { db } = await import('../db')
  const { auditTrail } = await import('../db/schema')
  await db.insert(auditTrail).values({
    userId: params.userId ?? null,
    action: params.action,
    resourceType: params.resourceType,
    resourceId: params.resourceId ?? null,
    oldValue: params.oldValue ? JSON.stringify(params.oldValue) : null,
    newValue: params.newValue ? JSON.stringify(params.newValue) : null,
    ipAddress: params.ipAddress ?? null,
    userAgent: params.userAgent ?? null
  })
}
