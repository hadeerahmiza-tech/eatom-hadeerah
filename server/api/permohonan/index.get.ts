import { and, desc, eq, inArray, like } from 'drizzle-orm'
import { db } from '../../db'
import { permohonanLesen, syarikat } from '../../db/schema'
import { requireAuth } from '../../utils/rbac'

export default defineEventHandler(async (event) => {
  const session = await requireAuth(event)
  const userRole = (session.user as { role?: string }).role
  const userId = session.user.id
  const query = getQuery(event)

  const page = Number(query.page ?? 1)
  const limit = Number(query.limit ?? 20)
  const offset = (page - 1) * limit
  const search = query.search as string | undefined

  const conditions = []

  // Role-based filtering
  if (userRole === 'PL') {
    conditions.push(eq(permohonanLesen.createdBy, userId))
  } else if (userRole === 'PS') {
    conditions.push(inArray(permohonanLesen.status, ['dikemukakan', 'semakan_PS']))
  } else if (userRole === 'KU') {
    conditions.push(inArray(permohonanLesen.status, ['lulus_PS', 'semakan_KU']))
  }
  // P, KP, ADMIN see all

  if (query.status) {
    conditions.push(eq(permohonanLesen.status, query.status as string))
  }

  const rows = await db
    .select({
      id: permohonanLesen.id,
      noRujukan: permohonanLesen.noRujukan,
      jenisPermohonan: permohonanLesen.jenisPermohonan,
      status: permohonanLesen.status,
      createdAt: permohonanLesen.createdAt,
      updatedAt: permohonanLesen.updatedAt,
      submittedAt: permohonanLesen.submittedAt,
      namaSyarikat: syarikat.namaSyarikat,
      noDaftar: syarikat.noDaftar
    })
    .from(permohonanLesen)
    .leftJoin(syarikat, eq(permohonanLesen.syarikatId, syarikat.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(permohonanLesen.updatedAt))
    .limit(limit)
    .offset(offset)

  return { data: rows, page, limit }
})
