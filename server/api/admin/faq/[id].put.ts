import { db } from '../../../utils/db'
import { faqItems } from '../../../database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  db.update(faqItems).set({
    categoryId: body.categoryId,
    questionEn: body.questionEn,
    questionTr: body.questionTr,
    answerEn: body.answerEn,
    answerTr: body.answerTr,
    sortOrder: body.sortOrder
  }).where(eq(faqItems.id, id)).run()

  return { success: true }
})
