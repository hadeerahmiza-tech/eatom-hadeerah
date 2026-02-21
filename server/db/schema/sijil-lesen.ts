import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { permohonanLesen } from './permohonan'
import { user } from './auth'

export const sijilLesen = sqliteTable('sijil_lesen', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  permohonanId: integer('permohonan_id').notNull().references(() => permohonanLesen.id),
  noSijil: text('no_sijil').notNull().unique(),
  tarikhMula: integer('tarikh_mula', { mode: 'timestamp' }).notNull(),
  tarikhTamat: integer('tarikh_tamat', { mode: 'timestamp' }).notNull(),
  dijanaOleh: text('dijana_oleh').notNull().references(() => user.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
})
