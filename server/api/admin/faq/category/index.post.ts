import { db } from '../../../../utils/db'
import { faqCategories } from '../../../../database/schema'
import { requireAdmin } from '../../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)

  const result = db.insert(faqCategories).values({
    titleEn: body.titleEn,
    titleTr: body.titleTr || '',
    sortOrder: body.sortOrder || 0
  }).run()

  return { success: true, id: result.lastInsertRowid }
})
