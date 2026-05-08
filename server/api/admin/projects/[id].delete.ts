import { db } from '../../../utils/db'
import { projects } from '../../../database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id')
  db.delete(projects).where(eq(projects.id, Number(id))).run()
  return { success: true }
})
