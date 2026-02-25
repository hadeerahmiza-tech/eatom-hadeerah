import { db } from '../../db'
import { syarikat } from '../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const q = getQuery(event)
  const noDaftar = q.noDaftar as string | undefined
  if (!noDaftar) throw createError({ statusCode: 400, statusMessage: 'noDaftar required' })

  const row = await db.query.syarikat.findFirst({ where: (t, { eq }) => eq(t.noDaftar, noDaftar) })
  if (!row) return { ok: false, message: 'Not found' }
  // Return a small validated payload used by integrations
  return {
    ok: true,
    data: {
      id: row.id,
      namaSyarikat: row.namaSyarikat,
      noDaftar: row.noDaftar,
      alamat: row.alamat,
      poskod: row.poskod,
      negeri: row.negeri,
      tel: row.tel,
      email: row.email
    }
  }
})
