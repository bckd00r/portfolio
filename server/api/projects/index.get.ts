import { db } from '../../utils/db'
import { projects } from '../../database/schema'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  return await db.select().from(projects).orderBy(asc(projects.sortOrder))
})
