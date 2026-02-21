import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const syarikat = sqliteTable('syarikat', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  namaSyarikat: text('nama_syarikat').notNull(),
  noDaftar: text('no_daftar').notNull().unique(),
  alamat: text('alamat').notNull(),
  poskod: text('poskod'),
  negeri: text('negeri'),
  tel: text('tel'),
  email: text('email'),
  status: text('status', { enum: ['aktif', 'tutup'] }).notNull().default('aktif'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
})
