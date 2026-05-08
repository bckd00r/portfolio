import { requireAdmin } from '../../utils/auth'
import { randomUUID } from 'crypto'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, extname } from 'path'

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const formData = await readMultipartFormData(event)
  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, message: 'No file uploaded' })
  }

  const file = formData[0]
  if (!file.filename) {
    throw createError({ statusCode: 400, message: 'No filename provided' })
  }

  const ext = extname(file.filename).toLowerCase()
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    throw createError({
      statusCode: 400,
      message: `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`
    })
  }

  if (file.data.length > MAX_SIZE) {
    throw createError({ statusCode: 400, message: 'File too large. Max 5MB.' })
  }

  const uploadsDir = resolve(process.cwd(), 'public/uploads')
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true })
  }

  const filename = `${randomUUID()}${ext}`
  const filepath = resolve(uploadsDir, filename)
  writeFileSync(filepath, file.data)

  return { url: `/uploads/${filename}` }
})
