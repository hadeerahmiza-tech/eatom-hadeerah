import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { permohonanLesen } from './permohonan'
import { user } from './auth'

export const dokumenPermohonan = sqliteTable('dokumen_permohonan', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  permohonanId: integer('permohonan_id').notNull().references(() => permohonanLesen.id),
  namaFail: text('nama_fail').notNull(),
  jenisDoc: text('jenis_doc', {
    enum: ['ssm', 'lesen_sedia_ada', 'surat_sokongan', 'pelan_tapak', 'lain_lain']
  }).notNull(),
  saizFail: integer('saiz_fail'),
  mimeType: text('mime_type'),
  storagePath: text('storage_path').notNull(),
  uploadedBy: text('uploaded_by').notNull().references(() => user.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
})
