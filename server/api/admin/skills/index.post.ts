import { db } from '../../../utils/db'
import { skills } from '../../../database/schema'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)

  const result = db.insert(skills).values({
    categoryId: body.categoryId,
    name: body.name,
    sortOrder: body.sortOrder || 0
  }).run()

  return { success: true, id: result.lastInsertRowid }
})
