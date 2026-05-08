import { db } from '../../../utils/db'
import { blogPosts } from '../../../database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  db.update(blogPosts).set({
    slug: body.slug,
    titleEn: body.titleEn,
    titleTr: body.titleTr,
    descriptionEn: body.descriptionEn,
    descriptionTr: body.descriptionTr,
    bodyEn: body.bodyEn,
    bodyTr: body.bodyTr,
    image: body.image,
    minRead: body.minRead,
    authorName: body.authorName,
    authorAvatar: body.authorAvatar,
    date: body.date,
    published: body.published,
    updatedAt: new Date()
  }).where(eq(blogPosts.id, Number(id))).run()

  return { success: true }
})
