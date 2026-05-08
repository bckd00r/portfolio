import { db } from '../../../utils/db'
import { projects } from '../../../database/schema'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)
  
  const result = db.insert(projects).values({
    titleEn: body.titleEn,
    titleTr: body.titleTr || '',
    descriptionEn: body.descriptionEn,
    descriptionTr: body.descriptionTr || '',
    image: body.image || '',
    url: body.url || '#',
    tags: body.tags || '[]',
    date: body.date || '',
    sortOrder: body.sortOrder || 0
  }).run()

  return { success: true, id: result.lastInsertRowid }
})
