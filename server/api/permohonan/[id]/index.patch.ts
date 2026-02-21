import { eq } from 'drizzle-orm'
import { db } from '../../../db'
import { permohonanLesen, syarikat } from '../../../db/schema'
import { requireRole, insertAuditTrail } from '../../../utils/rbac'

export default defineEventHandler(async (event) => {
  const session = await requireRole(event, ['PL', 'ADMIN'])
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  const existing = await db.query.permohonanLesen.findFirst({
    where: (p, { eq }) => eq(p.id, id)
  })

  if (!existing) throw createError({ statusCode: 404, statusMessage: 'Permohonan tidak dijumpai' })
  if (existing.status !== 'draf') {
    throw createError({ statusCode: 400, statusMessage: 'Hanya draf boleh disunting' })
  }
  if (existing.createdBy !== session.user.id && (session.user as { role?: string }).role !== 'ADMIN') {
    throw createError({ statusCode: 403, statusMessage: 'Akses Dinafikan' })
  }

  const {
    namaSyarikat, noDaftar, alamat, poskod, negeri, tel, email,
    jenisPermohonan, keterangan,
    kategoriLesen, subKategori, lokasi, aktiviti, bilPeralatan, noLesenSediaAda
  } = body

  // Update syarikat if provided
  if (namaSyarikat && existing.syarikatId) {
    await db.update(syarikat).set({
      namaSyarikat, noDaftar, alamat, poskod, negeri, tel, email,
      updatedAt: new Date()
    }).where(eq(syarikat.id, existing.syarikatId))
  }

  await db.update(permohonanLesen).set({
    jenisPermohonan: jenisPermohonan ?? existing.jenisPermohonan,
    keteranganPermohonan: keterangan ?? existing.keteranganPermohonan,
    kategoriLesen: kategoriLesen ?? existing.kategoriLesen,
    subKategori: subKategori ?? existing.subKategori,
    lokasi: lokasi ?? existing.lokasi,
    aktiviti: aktiviti ?? existing.aktiviti,
    bilPeralatan: bilPeralatan ?? existing.bilPeralatan,
    noLesenSediaAda: noLesenSediaAda ?? existing.noLesenSediaAda,
    updatedAt: new Date()
  }).where(eq(permohonanLesen.id, id))

  await insertAuditTrail({
    userId: session.user.id,
    action: 'UPDATE_DRAF',
    resourceType: 'permohonan_lesen',
    resourceId: String(id),
    ipAddress: getRequestIP(event),
    userAgent: getRequestHeader(event, 'user-agent')
  })

  return { id, success: true }
})
