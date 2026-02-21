import { count, eq, sql, desc } from 'drizzle-orm'
import { db } from '../../db'
import { permohonanLesen, syarikat, user } from '../../db/schema'
import { requireAuth } from '../../utils/rbac'

export default defineEventHandler(async (event) => {
  const session = await requireAuth(event)
  const userRole = (session.user as { role?: string }).role
  const userId = session.user.id

  // Status breakdown
  const allStatuses = await db
    .select({ status: permohonanLesen.status, count: count() })
    .from(permohonanLesen)
    .groupBy(permohonanLesen.status)

  const statusMap = Object.fromEntries(allStatuses.map(s => [s.status, s.count]))
  const jumlahPermohonan = Object.values(statusMap).reduce((a, b) => a + b, 0)

  // Jenis breakdown
  const allJenis = await db
    .select({ jenis: permohonanLesen.jenisPermohonan, count: count() })
    .from(permohonanLesen)
    .groupBy(permohonanLesen.jenisPermohonan)

  const jenisMap = Object.fromEntries(allJenis.map(j => [j.jenis, j.count]))

  // Kategori breakdown
  const allKategori = await db
    .select({ kategori: permohonanLesen.kategoriLesen, count: count() })
    .from(permohonanLesen)
    .groupBy(permohonanLesen.kategoriLesen)

  const kategoriMap = Object.fromEntries(
    allKategori
      .filter(k => k.kategori)
      .map(k => [k.kategori!, k.count])
  )

  // Tugasan saya
  let tugasanSaya = 0
  if (userRole === 'PS') {
    tugasanSaya = (statusMap['dikemukakan'] ?? 0) + (statusMap['semakan_PS'] ?? 0)
  } else if (userRole === 'KU') {
    tugasanSaya = (statusMap['lulus_PS'] ?? 0) + (statusMap['semakan_KU'] ?? 0)
  } else if (userRole === 'PL') {
    const [res] = await db
      .select({ count: count() })
      .from(permohonanLesen)
      .where(eq(permohonanLesen.createdBy, userId))
    tugasanSaya = res?.count ?? 0
  } else if (['P', 'KP', 'ADMIN'].includes(userRole ?? '')) {
    tugasanSaya = jumlahPermohonan
  }

  // Recent permohonan (latest 5)
  const recentPermohonan = await db
    .select({
      id: permohonanLesen.id,
      noRujukan: permohonanLesen.noRujukan,
      namaSyarikat: syarikat.namaSyarikat,
      jenisPermohonan: permohonanLesen.jenisPermohonan,
      status: permohonanLesen.status,
      updatedAt: permohonanLesen.updatedAt
    })
    .from(permohonanLesen)
    .leftJoin(syarikat, eq(permohonanLesen.syarikatId, syarikat.id))
    .orderBy(desc(permohonanLesen.updatedAt))
    .limit(5)

  // Count syarikat aktif
  const [syarikatCount] = await db
    .select({ count: count() })
    .from(syarikat)
    .where(eq(syarikat.status, 'aktif'))

  // Count users
  const [userCount] = await db
    .select({ count: count() })
    .from(user)

  return {
    tugasanSaya,
    jumlahPermohonan,
    dikemukakan: statusMap['dikemukakan'] ?? 0,
    semakan_PS: statusMap['semakan_PS'] ?? 0,
    lulus_PS: statusMap['lulus_PS'] ?? 0,
    semakan_KU: statusMap['semakan_KU'] ?? 0,
    diluluskan: statusMap['diluluskan'] ?? 0,
    ditolak: statusMap['ditolak'] ?? 0,
    draf: statusMap['draf'] ?? 0,
    statusMap,
    jenisMap,
    kategoriMap,
    recentPermohonan,
    jumlahSyarikat: syarikatCount?.count ?? 0,
    jumlahPengguna: userCount?.count ?? 0
  }
})
