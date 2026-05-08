import { db } from '../utils/db'
import { faqCategories, faqItems } from '../database/schema'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const categories = await db.select().from(faqCategories).orderBy(asc(faqCategories.sortOrder))
  const items = await db.select().from(faqItems).orderBy(asc(faqItems.sortOrder))
  
  return categories.map(cat => ({
    ...cat,
    questions: items.filter(q => q.categoryId === cat.id)
  }))
})
