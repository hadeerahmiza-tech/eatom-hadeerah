import { eq } from 'drizzle-orm'
import { db } from '../../../db'
import { permohonanLesen, syarikat, user } from '../../../db/schema'
import { requireAuth } from '../../../utils/rbac'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const id = Number(getRouterParam(event, 'id'))

  const [row] = await db
    .select({
      id: permohonanLesen.id,
      noRujukan: permohonanLesen.noRujukan,
      jenisPermohonan: permohonanLesen.jenisPermohonan,
      status: permohonanLesen.status,
      kategoriLesen: permohonanLesen.kategoriLesen,
      subKategori: permohonanLesen.subKategori,
      lokasi: permohonanLesen.lokasi,
      aktiviti: permohonanLesen.aktiviti,
      bilPeralatan: permohonanLesen.bilPeralatan,
      noLesenSediaAda: permohonanLesen.noLesenSediaAda,
      keteranganPermohonan: permohonanLesen.keteranganPermohonan,
      kategoriKawalan: permohonanLesen.kategoriKawalan,
      catatanKategori: permohonanLesen.catatanKategori,
      catatanPS: permohonanLesen.catatanPS,
      catatanKU: permohonanLesen.catatanKU,
      createdAt: permohonanLesen.createdAt,
      updatedAt: permohonanLesen.updatedAt,
      submittedAt: permohonanLesen.submittedAt,
      approvedAt: permohonanLesen.approvedAt,
      syarikatId: permohonanLesen.syarikatId,
      namaSyarikat: syarikat.namaSyarikat,
      noDaftar: syarikat.noDaftar,
      alamat: syarikat.alamat,
      poskod: syarikat.poskod,
      negeri: syarikat.negeri,
      tel: syarikat.tel,
      emailSyarikat: syarikat.email,
      createdByName: user.name,
      createdByEmail: user.email
    })
    .from(permohonanLesen)
    .leftJoin(syarikat, eq(permohonanLesen.syarikatId, syarikat.id))
    .leftJoin(user, eq(permohonanLesen.createdBy, user.id))
    .where(eq(permohonanLesen.id, id))

  if (!row) {
    throw createError({ statusCode: 404, statusMessage: 'Permohonan tidak dijumpai' })
  }

  return row
})
