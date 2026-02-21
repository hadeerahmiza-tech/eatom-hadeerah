import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { eq } from 'drizzle-orm'
import { mkdirSync } from 'node:fs'
import * as schema from './schema'

const DB_PATH = process.env.DATABASE_URL ?? './db/eatom.db'
mkdirSync('./db', { recursive: true })

const sqlite = new Database(DB_PATH)
sqlite.pragma('journal_mode = WAL')
sqlite.pragma('foreign_keys = ON')

const db = drizzle(sqlite, { schema })

// Run migrations
migrate(db, { migrationsFolder: './db/migrations' })
console.log('Migrations applied.')

// Use better-auth context for proper password hashing
const { betterAuth } = await import('better-auth')
const { drizzleAdapter } = await import('better-auth/adapters/drizzle')

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification
    }
  }),
  emailAndPassword: { enabled: true }
})

const ctx = await auth.$context
const PASSWORD = 'password123'
const hashedPassword = await ctx.password.hash(PASSWORD)

const seedUsers = [
  { name: 'Ahmad Admin', email: 'admin@eatom.gov.my', role: 'ADMIN' as const, bahagian: 'Pentadbiran' },
  { name: 'Siti Semakan', email: 'ps@eatom.gov.my', role: 'PS' as const, bahagian: 'BPP' },
  { name: 'Kamal Ketua', email: 'ku@eatom.gov.my', role: 'KU' as const, bahagian: 'BPP' },
  { name: 'Pengarah Penilaian', email: 'p@eatom.gov.my', role: 'P' as const, bahagian: 'BPP' },
  { name: 'Syarikat Atom PL', email: 'pl@syarikat.com', role: 'PL' as const, bahagian: '' }
]

console.log('Seeding users...')
const userIds: Record<string, string> = {}

for (const u of seedUsers) {
  const existing = await db.query.user.findFirst({ where: (t, { eq }) => eq(t.email, u.email) })
  if (existing) {
    userIds[u.role] = existing.id
    const acc = await db.query.account.findFirst({ where: (a, { eq }) => eq(a.userId, existing.id) })
    if (acc) {
      db.update(schema.account).set({ password: hashedPassword }).where(eq(schema.account.id, acc.id)).run()
    }
    console.log(`  Skip (exists): ${u.email}`)
    continue
  }

  const id = crypto.randomUUID()
  userIds[u.role] = id
  db.insert(schema.user).values({
    id,
    name: u.name,
    email: u.email,
    emailVerified: true,
    role: u.role,
    bahagian: u.bahagian
  }).run()

  db.insert(schema.account).values({
    id: crypto.randomUUID(),
    accountId: id,
    providerId: 'credential',
    userId: id,
    password: hashedPassword
  }).run()

  console.log(`  Created: ${u.email} (${u.role})`)
}

// Seed syarikat
console.log('Seeding syarikat...')
const syarikatData = [
  { namaSyarikat: 'Syarikat Atom Sdn Bhd', noDaftar: 'SA-2024-001', alamat: 'No. 1, Jalan Atom, Bandar Baru Bangi', poskod: '43650', negeri: 'Selangor', tel: '03-89111234', email: 'info@syarikat-atom.com' },
  { namaSyarikat: 'Radiasi Teknik Sdn Bhd', noDaftar: 'RT-2024-002', alamat: 'Lot 5, Kawasan Perindustrian Gebeng', poskod: '26080', negeri: 'Pahang', tel: '09-5831234', email: 'admin@radiasi-teknik.com' },
  { namaSyarikat: 'Perubatan Nuklear KL', noDaftar: 'PNK-2024-003', alamat: '22, Jalan Tun Razak, Kuala Lumpur', poskod: '50400', negeri: 'Wilayah Persekutuan', tel: '03-21611234', email: 'info@pnkl.com.my' },
  { namaSyarikat: 'Gamma Industrial Services', noDaftar: 'GIS-2024-004', alamat: 'Blok A, Kompleks Industri Senai', poskod: '81400', negeri: 'Johor', tel: '07-5991234', email: 'ops@gamma-ind.com' },
  { namaSyarikat: 'MediRad Diagnostik Sdn Bhd', noDaftar: 'MRD-2024-005', alamat: '15, Jalan Sultan Ahmad Shah', poskod: '10050', negeri: 'Pulau Pinang', tel: '04-2281234', email: 'info@medirad.com.my' },
  { namaSyarikat: 'SinarTech Engineering', noDaftar: 'STE-2025-006', alamat: 'Wisma SinarTech, Jalan Duta', poskod: '50480', negeri: 'Wilayah Persekutuan', tel: '03-62051234', email: 'contact@sinartech.com' },
  { namaSyarikat: 'Isotop Malaysia Berhad', noDaftar: 'IMB-2025-007', alamat: 'Menara Isotop, Cyberjaya', poskod: '63000', negeri: 'Selangor', tel: '03-83221234', email: 'admin@isotop.com.my' }
]

const syarikatIds: number[] = []
for (const s of syarikatData) {
  const existing = await db.query.syarikat.findFirst({ where: (t, { eq }) => eq(t.noDaftar, s.noDaftar) })
  if (existing) {
    syarikatIds.push(existing.id)
    console.log(`  Skip (exists): ${s.namaSyarikat}`)
    continue
  }
  const result = db.insert(schema.syarikat).values(s).run()
  syarikatIds.push(Number(result.lastInsertRowid))
  console.log(`  Created: ${s.namaSyarikat}`)
}

// Seed permohonan with various statuses
console.log('Seeding permohonan lesen...')
const existingPermohonan = await db.query.permohonanLesen.findFirst()
if (!existingPermohonan) {
  const plId = userIds['PL']
  const psId = userIds['PS']
  const kuId = userIds['KU']

  const now = Date.now()
  const day = 86400 * 1000

  const permohonanData = [
    // Approved applications
    {
      noRujukan: 'PL/2025/0001',
      syarikatId: syarikatIds[0],
      jenisPermohonan: 'baru' as const,
      status: 'diluluskan' as const,
      kategoriLesen: 'Perubatan',
      subKategori: 'Radiodiagnosis',
      lokasi: 'Hospital Serdang, Selangor',
      aktiviti: 'Penggunaan peralatan X-ray untuk diagnostik perubatan',
      bilPeralatan: 3,
      catatanPS: 'Dokumen lengkap. Disyorkan untuk kelulusan.',
      catatanKU: 'Diluluskan. Syarikat memenuhi semua syarat.',
      kategoriKawalan: 'B',
      assignedPSId: psId,
      assignedKUId: kuId,
      createdBy: plId,
      submittedAt: new Date(now - (30 * day)),
      approvedAt: new Date(now - (5 * day)),
      createdAt: new Date(now - (35 * day)),
      updatedAt: new Date(now - (5 * day))
    },
    {
      noRujukan: 'PL/2025/0002',
      syarikatId: syarikatIds[1],
      jenisPermohonan: 'baru' as const,
      status: 'diluluskan' as const,
      kategoriLesen: 'Industri',
      subKategori: 'Gauging',
      lokasi: 'Kilang Gebeng, Kuantan',
      aktiviti: 'Penggunaan sumber sinaran untuk pengukuran ketebalan',
      bilPeralatan: 5,
      catatanPS: 'Semua dokumen disahkan. Lulus.',
      catatanKU: 'Diluluskan.',
      kategoriKawalan: 'C',
      assignedPSId: psId,
      assignedKUId: kuId,
      createdBy: plId,
      submittedAt: new Date(now - (28 * day)),
      approvedAt: new Date(now - (3 * day)),
      createdAt: new Date(now - (32 * day)),
      updatedAt: new Date(now - (3 * day))
    },
    // In KU review
    {
      noRujukan: 'PL/2025/0003',
      syarikatId: syarikatIds[2],
      jenisPermohonan: 'baru' as const,
      status: 'semakan_KU' as const,
      kategoriLesen: 'Perubatan',
      subKategori: 'Nuklear Perubatan',
      lokasi: 'Klinik PNK, Jalan Tun Razak, KL',
      aktiviti: 'Penggunaan bahan radioaktif untuk diagnostik dan rawatan',
      bilPeralatan: 2,
      catatanPS: 'Dokumen lengkap. Cadangan kategori kawalan A.',
      assignedPSId: psId,
      assignedKUId: kuId,
      createdBy: plId,
      submittedAt: new Date(now - (14 * day)),
      createdAt: new Date(now - (20 * day)),
      updatedAt: new Date(now - (2 * day))
    },
    // PS approved, waiting KU
    {
      noRujukan: 'PL/2025/0004',
      syarikatId: syarikatIds[3],
      jenisPermohonan: 'pinda' as const,
      status: 'lulus_PS' as const,
      kategoriLesen: 'Industri',
      subKategori: 'Radiografi Industri',
      lokasi: 'Kompleks Industri Senai, Johor',
      aktiviti: 'Pengujian tanpa musnah (NDT) menggunakan sumber gamma',
      bilPeralatan: 4,
      noLesenSediaAda: 'L/JHR/2023/0456',
      catatanPS: 'Pindaan untuk tambahan 2 unit peralatan baru.',
      assignedPSId: psId,
      createdBy: plId,
      submittedAt: new Date(now - (10 * day)),
      createdAt: new Date(now - (15 * day)),
      updatedAt: new Date(now - (4 * day))
    },
    // In PS review
    {
      noRujukan: 'PL/2025/0005',
      syarikatId: syarikatIds[4],
      jenisPermohonan: 'baru' as const,
      status: 'semakan_PS' as const,
      kategoriLesen: 'Perubatan',
      subKategori: 'Radioterapi',
      lokasi: 'MediRad Centre, Georgetown, Pulau Pinang',
      aktiviti: 'Rawatan kanser menggunakan linear accelerator',
      bilPeralatan: 1,
      assignedPSId: psId,
      createdBy: plId,
      submittedAt: new Date(now - (7 * day)),
      createdAt: new Date(now - (12 * day)),
      updatedAt: new Date(now - (3 * day))
    },
    {
      noRujukan: 'PL/2025/0006',
      syarikatId: syarikatIds[5],
      jenisPermohonan: 'perbaharui' as const,
      status: 'semakan_PS' as const,
      kategoriLesen: 'Industri',
      subKategori: 'Well Logging',
      lokasi: 'Pejabat SinarTech, Jalan Duta, KL',
      aktiviti: 'Penggunaan sumber sinaran untuk well logging',
      bilPeralatan: 8,
      noLesenSediaAda: 'L/KL/2022/0123',
      assignedPSId: psId,
      createdBy: plId,
      submittedAt: new Date(now - (5 * day)),
      createdAt: new Date(now - (8 * day)),
      updatedAt: new Date(now - (2 * day))
    },
    // Submitted, waiting PS
    {
      noRujukan: 'PL/2025/0007',
      syarikatId: syarikatIds[6],
      jenisPermohonan: 'baru' as const,
      status: 'dikemukakan' as const,
      kategoriLesen: 'Penyelidikan',
      subKategori: 'Penyelidikan Akademik',
      lokasi: 'Makmal Isotop, Cyberjaya',
      aktiviti: 'Penyelidikan menggunakan isotop radioaktif',
      bilPeralatan: 6,
      createdBy: plId,
      submittedAt: new Date(now - (2 * day)),
      createdAt: new Date(now - (4 * day)),
      updatedAt: new Date(now - (2 * day))
    },
    {
      noRujukan: 'PL/2025/0008',
      syarikatId: syarikatIds[0],
      jenisPermohonan: 'perbaharui' as const,
      status: 'dikemukakan' as const,
      kategoriLesen: 'Perubatan',
      subKategori: 'Radiodiagnosis',
      lokasi: 'Hospital Serdang, Selangor',
      aktiviti: 'Pembaharuan lesen peralatan X-ray sedia ada',
      bilPeralatan: 3,
      noLesenSediaAda: 'L/SEL/2022/0789',
      createdBy: plId,
      submittedAt: new Date(now - (1 * day)),
      createdAt: new Date(now - (3 * day)),
      updatedAt: new Date(now - (1 * day))
    },
    // Drafts
    {
      noRujukan: 'PL/2025/0009',
      syarikatId: syarikatIds[1],
      jenisPermohonan: 'baru' as const,
      status: 'draf' as const,
      kategoriLesen: 'Industri',
      subKategori: 'Irradiator',
      lokasi: 'Kilang Baru Gebeng, Kuantan',
      aktiviti: 'Pemasangan irradiator untuk pemprosesan makanan',
      bilPeralatan: 1,
      createdBy: plId,
      createdAt: new Date(now - (1 * day)),
      updatedAt: new Date(now - (1 * day))
    },
    {
      noRujukan: 'PL/2025/0010',
      syarikatId: syarikatIds[3],
      jenisPermohonan: 'pinda' as const,
      status: 'draf' as const,
      kategoriLesen: 'Industri',
      subKategori: 'Radiografi Industri',
      lokasi: 'Tapak Pembinaan Johor Bahru',
      aktiviti: 'Pindaan lokasi kerja radiografi',
      bilPeralatan: 2,
      noLesenSediaAda: 'L/JHR/2023/0456',
      createdBy: plId,
      createdAt: new Date(now - (0.5 * day)),
      updatedAt: new Date(now - (0.5 * day))
    },
    // Rejected
    {
      noRujukan: 'PL/2025/0011',
      syarikatId: syarikatIds[4],
      jenisPermohonan: 'baru' as const,
      status: 'ditolak' as const,
      kategoriLesen: 'Perubatan',
      subKategori: 'Radiodiagnosis',
      lokasi: 'Klinik Swasta, Butterworth',
      aktiviti: 'Pemasangan mesin CT scan',
      bilPeralatan: 1,
      catatanPS: 'Dokumen tidak lengkap - tiada bukti kelayakan PPB.',
      assignedPSId: psId,
      createdBy: plId,
      submittedAt: new Date(now - (25 * day)),
      createdAt: new Date(now - (30 * day)),
      updatedAt: new Date(now - (20 * day))
    },
    {
      noRujukan: 'PL/2025/0012',
      syarikatId: syarikatIds[2],
      jenisPermohonan: 'pinda' as const,
      status: 'ditolak' as const,
      kategoriLesen: 'Perubatan',
      subKategori: 'Nuklear Perubatan',
      lokasi: 'Klinik PNK Cawangan Ampang',
      aktiviti: 'Pindaan untuk tambah lokasi baru',
      bilPeralatan: 1,
      catatanPS: 'Alamat tidak sah. Tidak sepadan rekod SSM.',
      catatanKU: 'Ditolak. Sila kemukakan semula dengan dokumen yang betul.',
      assignedPSId: psId,
      assignedKUId: kuId,
      createdBy: plId,
      submittedAt: new Date(now - (22 * day)),
      createdAt: new Date(now - (26 * day)),
      updatedAt: new Date(now - (18 * day))
    }
  ]

  for (const p of permohonanData) {
    db.insert(schema.permohonanLesen).values(p).run()
    console.log(`  Created: ${p.noRujukan} (${p.status})`)
  }
} else {
  console.log('  Permohonan already seeded, skipping.')
}

console.log(`\nSeed complete. Login password for all users: "${PASSWORD}"`)
sqlite.close()
