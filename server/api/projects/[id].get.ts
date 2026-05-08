import { db } from '../../utils/db'
import { projects } from '../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  const project = await db.select().from(projects).where(eq(projects.id, id)).get()

  if (!project) {
    throw createError({ statusCode: 404, message: 'Project not found' })
  }

  return project
})
