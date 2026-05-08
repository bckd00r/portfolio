import { db } from '../../utils/db'
import { blogPosts } from '../../database/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  return await db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.date))
})
