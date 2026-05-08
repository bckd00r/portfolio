import { db } from '../../../utils/db'
import { speakingEvents } from '../../../database/schema'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)

  const result = db.insert(speakingEvents).values({
    category: body.category,
    titleEn: body.titleEn,
    titleTr: body.titleTr || '',
    date: body.date || '',
    locationEn: body.locationEn || '',
    locationTr: body.locationTr || '',
    url: body.url || '',
    sortOrder: body.sortOrder || 0
  }).run()

  return { success: true, id: result.lastInsertRowid }
})
