import { db } from '../utils/db'
import { speakingEvents } from '../database/schema'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  return await db.select().from(speakingEvents).orderBy(asc(speakingEvents.sortOrder))
})
