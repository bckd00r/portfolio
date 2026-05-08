import { db } from '../../../../utils/db'
import { faqCategories } from '../../../../database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  db.update(faqCategories).set({
    titleEn: body.titleEn,
    titleTr: body.titleTr,
    sortOrder: body.sortOrder
  }).where(eq(faqCategories.id, id)).run()

  return { success: true }
})
