import { db } from '../utils/db'
import { skillCategories, skills } from '../database/schema'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const categories = await db.select().from(skillCategories).orderBy(asc(skillCategories.sortOrder))
  const allSkills = await db.select().from(skills).orderBy(asc(skills.sortOrder))
  
  return categories.map(cat => ({
    ...cat,
    items: allSkills.filter(s => s.categoryId === cat.id)
  }))
})
