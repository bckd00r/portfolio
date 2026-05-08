import { db } from '../../../utils/db'
import { projects } from '../../../database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  db.update(projects).set({
    titleEn: body.titleEn,
    titleTr: body.titleTr,
    descriptionEn: body.descriptionEn,
    descriptionTr: body.descriptionTr,
    image: body.image,
    url: body.url,
    tags: body.tags,
    date: body.date,
    sortOrder: body.sortOrder,
    updatedAt: new Date()
  }).where(eq(projects.id, Number(id))).run()

  return { success: true }
})
