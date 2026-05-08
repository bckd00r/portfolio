import { db } from '../utils/db'
import { experience } from '../database/schema'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  return await db.select().from(experience).orderBy(asc(experience.sortOrder))
})
