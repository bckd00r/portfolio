import { db } from '../utils/db'
import { about } from '../database/schema'

export default defineEventHandler(async (event) => {
  const data = await db.select().from(about).get()
  return data || null
})
