import { db } from '../../../../utils/db'
import { skillCategories } from '../../../../database/schema'
import { requireAdmin } from '../../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)

  const result = db.insert(skillCategories).values({
    titleEn: body.titleEn,
    titleTr: body.titleTr || '',
    icon: body.icon || '',
    sortOrder: body.sortOrder || 0
  }).run()

  return { success: true, id: result.lastInsertRowid }
})
