import { db } from '../../../utils/db'
import { experience } from '../../../database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  db.update(experience).set({
    positionEn: body.positionEn,
    positionTr: body.positionTr,
    dateLabel: body.dateLabel,
    companyName: body.companyName,
    companyUrl: body.companyUrl,
    companyLogo: body.companyLogo,
    companyColor: body.companyColor,
    sortOrder: body.sortOrder,
    updatedAt: new Date()
  }).where(eq(experience.id, id)).run()

  return { success: true }
})
