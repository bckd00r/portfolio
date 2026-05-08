import { requireAdmin } from '../../utils/auth'
import { translateText } from '../../utils/translate'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)

  if (!body.text || !body.from || !body.to) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields: text, from, to'
    })
  }

  const translated = await translateText(body.text, body.from, body.to)

  return { translated }
})
