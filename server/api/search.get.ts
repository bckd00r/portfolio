import { db } from '../utils/db'
import { blogPosts } from '../database/schema'
import { like, or, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = String(query.q || '').trim()

  if (!q) {
    return []
  }

  const pattern = `%${q}%`

  const results = await db
    .select()
    .from(blogPosts)
    .where(
      or(
        like(blogPosts.titleEn, pattern),
        like(blogPosts.titleTr, pattern),
        like(blogPosts.descriptionEn, pattern),
        like(blogPosts.descriptionTr, pattern)
      )
    )
    .all()

  // Only return published posts for public search
  return results.filter(post => post.published)
})
