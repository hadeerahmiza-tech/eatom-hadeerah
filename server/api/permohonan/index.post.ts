import { db } from '../../db'
import { permohonanLesen, syarikat } from '../../db/schema'
import { requireRole } from '../../utils/rbac'
import { insertAuditTrail } from '../../utils/rbac'

function generateNoRujukan() {
  const year = new Date().getFullYear()
  const random = Math.floor(10000 + Math.random() * 90000)
  return `BPP/${year}/${random}`
}

export default defineEventHandler(async (event) => {
  const session = await requireRole(event, ['PL', 'ADMIN'])
  const body = await readBody(event)

  const {
    namaSyarikat, noDaftar, alamat, poskod, negeri, tel, email,
    jenisPermohonan, keterangan, submit,
    kategoriLesen, subKategori, lokasi, aktiviti, bilPeralatan, noLesenSediaAda
  } = body

  // Upsert syarikat
  let syarikatRow = await db.query.syarikat.findFirst({
    where: (s, { eq }) => eq(s.noDaftar, noDaftar)
  })

  if (!syarikatRow) {
    const [inserted] = await db.insert(syarikat).values({
      namaSyarikat,
      noDaftar,
      alamat,
      poskod,
      negeri,
      tel,
      email
    }).returning()
    syarikatRow = inserted
  }

  const status = submit ? 'dikemukakan' : 'draf'

  const [permohonan] = await db.insert(permohonanLesen).values({
    noRujukan: generateNoRujukan(),
    syarikatId: syarikatRow!.id,
    jenisPermohonan: jenisPermohonan ?? 'baru',
    keteranganPermohonan: keterangan,
    kategoriLesen: kategoriLesen ?? null,
    subKategori: subKategori ?? null,
    lokasi: lokasi ?? null,
    aktiviti: aktiviti ?? null,
    bilPeralatan: bilPeralatan ?? null,
    noLesenSediaAda: noLesenSediaAda ?? null,
    status,
    createdBy: session.user.id,
    submittedAt: submit ? new Date() : null
  }).returning()

  await insertAuditTrail({
    userId: session.user.id,
    action: submit ? 'SUBMIT_PERMOHONAN' : 'CREATE_DRAF',
    resourceType: 'permohonan_lesen',
    resourceId: String(permohonan!.id),
    newValue: { status, noRujukan: permohonan!.noRujukan },
    ipAddress: getRequestIP(event),
    userAgent: getRequestHeader(event, 'user-agent')
  })

  return permohonan
})
