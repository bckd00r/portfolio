import { db } from '../../utils/db'
import { about } from '../../database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)

  // about is a single-row table, always id=1
  const existing = await db.select().from(about).get()

  if (existing) {
    db.update(about).set({
      contentEn: body.contentEn,
      contentTr: body.contentTr,
      profileImage: body.profileImage,
      updatedAt: new Date()
    }).where(eq(about.id, existing.id)).run()
  } else {
    db.insert(about).values({
      contentEn: body.contentEn || '',
      contentTr: body.contentTr || '',
      profileImage: body.profileImage || ''
    }).run()
  }

  return { success: true }
})
