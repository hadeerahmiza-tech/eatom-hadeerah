import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { permohonanLesen } from './permohonan'
import { user } from './auth'

export const syaratLesen = sqliteTable('syarat_lesen', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  permohonanId: integer('permohonan_id').notNull().references(() => permohonanLesen.id),
  kodSyarat: text('kod_syarat'),
  penerangan: text('penerangan').notNull(),
  kategori: text('kategori'),
  addedBy: text('added_by').notNull().references(() => user.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
})
