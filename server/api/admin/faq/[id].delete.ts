import { db } from '../../../utils/db'
import { faqItems } from '../../../database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))

  db.delete(faqItems).where(eq(faqItems.id, id)).run()

  return { success: true }
})
