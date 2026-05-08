import { db } from '../../utils/db'
import { heroConfig } from '../../database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)

  // hero_config is a single-row table, always id=1
  const existing = await db.select().from(heroConfig).get()

  if (existing) {
    db.update(heroConfig).set({
      subtitleEn: body.subtitleEn,
      subtitleTr: body.subtitleTr,
      descriptionEn: body.descriptionEn,
      descriptionTr: body.descriptionTr,
      available: body.available,
      updatedAt: new Date()
    }).where(eq(heroConfig.id, existing.id)).run()
  } else {
    db.insert(heroConfig).values({
      subtitleEn: body.subtitleEn || '',
      subtitleTr: body.subtitleTr || '',
      descriptionEn: body.descriptionEn || '',
      descriptionTr: body.descriptionTr || '',
      available: body.available ?? true
    }).run()
  }

  return { success: true }
})
