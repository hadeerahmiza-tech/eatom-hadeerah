import { desc, eq } from 'drizzle-orm'
import { db } from '../../db'
import { auditTrail, user } from '../../db/schema'
import { requireRole } from '../../utils/rbac'

export default defineEventHandler(async (event) => {
  await requireRole(event, ['ADMIN', 'P', 'KP'])
  const query = getQuery(event)
  const limit = Number(query.limit ?? 50)

  const rows = await db
    .select({
      id: auditTrail.id,
      action: auditTrail.action,
      resourceType: auditTrail.resourceType,
      resourceId: auditTrail.resourceId,
      newValue: auditTrail.newValue,
      createdAt: auditTrail.createdAt,
      userName: user.name,
      userEmail: user.email,
      userRole: user.role
    })
    .from(auditTrail)
    .leftJoin(user, eq(auditTrail.userId, user.id))
    .orderBy(desc(auditTrail.createdAt))
    .limit(limit)

  return rows
})
