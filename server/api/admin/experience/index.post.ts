import { db } from '../../../utils/db'
import { experience } from '../../../database/schema'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)

  const result = db.insert(experience).values({
    positionEn: body.positionEn,
    positionTr: body.positionTr || '',
    dateLabel: body.dateLabel || '',
    companyName: body.companyName || '',
    companyUrl: body.companyUrl || '#',
    companyLogo: body.companyLogo || '',
    companyColor: body.companyColor || '#3b82f6',
    sortOrder: body.sortOrder || 0
  }).run()

  return { success: true, id: result.lastInsertRowid }
})
