import { db } from '../../../utils/db'
import { speakingEvents } from '../../../database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  db.update(speakingEvents).set({
    category: body.category,
    titleEn: body.titleEn,
    titleTr: body.titleTr,
    date: body.date,
    locationEn: body.locationEn,
    locationTr: body.locationTr,
    url: body.url,
    sortOrder: body.sortOrder,
    updatedAt: new Date()
  }).where(eq(speakingEvents.id, id)).run()

  return { success: true }
})
