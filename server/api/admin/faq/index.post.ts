import { db } from '../../../utils/db'
import { faqItems } from '../../../database/schema'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)

  const result = db.insert(faqItems).values({
    categoryId: body.categoryId,
    questionEn: body.questionEn,
    questionTr: body.questionTr || '',
    answerEn: body.answerEn,
    answerTr: body.answerTr || '',
    sortOrder: body.sortOrder || 0
  }).run()

  return { success: true, id: result.lastInsertRowid }
})
