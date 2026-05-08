import { db } from '../../../utils/db'
import { skills } from '../../../database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  db.update(skills).set({
    categoryId: body.categoryId,
    name: body.name,
    sortOrder: body.sortOrder
  }).where(eq(skills.id, id)).run()

  return { success: true }
})
