import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { permohonanLesen } from './permohonan'
import { user } from './auth'

export const invois = sqliteTable('invois', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  noInvois: text('no_invois').notNull().unique(),
  permohonanId: integer('permohonan_id').notNull().references(() => permohonanLesen.id),
  jenisInvois: text('jenis_invois', { enum: ['fee_permohonan', 'fee_lesen'] }).notNull(),
  jumlah: integer('jumlah').notNull(),
  status: text('status', {
    enum: ['belum_bayar', 'telah_bayar', 'disahkan', 'batal']
  }).notNull().default('belum_bayar'),
  tarikhBayar: integer('tarikh_bayar', { mode: 'timestamp' }),
  rujukanBayar: text('rujukan_bayar'),
  disahkanOleh: text('disahkan_oleh').references(() => user.id),
  tarikhSah: integer('tarikh_sah', { mode: 'timestamp' }),
  catatanKewangan: text('catatan_kewangan'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
})
