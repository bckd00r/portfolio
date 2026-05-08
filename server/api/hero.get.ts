import { db } from '../utils/db'
import { heroConfig } from '../database/schema'

export default defineEventHandler(async (event) => {
  const data = await db.select().from(heroConfig).get()
  return data || null
})
