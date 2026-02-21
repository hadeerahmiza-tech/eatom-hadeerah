import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { syarikat } from './syarikat'
import { user } from './auth'

export const permohonanLesen = sqliteTable('permohonan_lesen', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  noRujukan: text('no_rujukan').notNull().unique(),
  syarikatId: integer('syarikat_id').notNull().references(() => syarikat.id),
  jenisPermohonan: text('jenis_permohonan', { enum: ['baru', 'pinda', 'perbaharui'] }).notNull().default('baru'),
  status: text('status', {
    enum: [
      'draf',
      'dikemukakan',
      'semakan_PS',
      'lulus_PS',
      'semakan_KU',
      'diluluskan',
      'ditolak'
    ]
  }).notNull().default('draf'),
  kategoriLesen: text('kategori_lesen'),
  subKategori: text('sub_kategori'),
  lokasi: text('lokasi'),
  aktiviti: text('aktiviti'),
  bilPeralatan: integer('bil_peralatan'),
  noLesenSediaAda: text('no_lesen_sedia_ada'),
  keteranganPermohonan: text('keterangan_permohonan'),
  kategoriKawalan: text('kategori_kawalan'),
  catatanKategori: text('catatan_kategori'),
  catatanPS: text('catatan_PS'),
  catatanKU: text('catatan_KU'),
  assignedPSId: text('assigned_PS_id').references(() => user.id),
  assignedKUId: text('assigned_KU_id').references(() => user.id),
  createdBy: text('created_by').notNull().references(() => user.id),
  submittedAt: integer('submitted_at', { mode: 'timestamp' }),
  approvedAt: integer('approved_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
})
