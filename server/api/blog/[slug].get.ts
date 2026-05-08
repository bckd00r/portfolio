import { db } from '../../utils/db'
import { blogPosts } from '../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const post = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug as string)).get()
  
  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }
  
  return post
})
