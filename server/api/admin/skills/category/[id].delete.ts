import { db } from '../../../../utils/db'
import { skillCategories } from '../../../../database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))

  db.delete(skillCategories).where(eq(skillCategories.id, id)).run()

  return { success: true }
})
