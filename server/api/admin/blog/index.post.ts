import { db } from '../../../utils/db'
import { blogPosts } from '../../../database/schema'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)
  
  const result = db.insert(blogPosts).values({
    slug: body.slug,
    titleEn: body.titleEn,
    titleTr: body.titleTr || '',
    descriptionEn: body.descriptionEn || '',
    descriptionTr: body.descriptionTr || '',
    bodyEn: body.bodyEn || '',
    bodyTr: body.bodyTr || '',
    image: body.image || '',
    minRead: body.minRead || 5,
    authorName: body.authorName || '',
    authorAvatar: body.authorAvatar || '',
    date: body.date || '',
    published: body.published ?? true
  }).run()

  return { success: true, id: result.lastInsertRowid }
})
