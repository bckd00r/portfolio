import { db } from './db'
import { translations } from '../database/schema'
import { eq, and } from 'drizzle-orm'
import { createHash } from 'crypto'

function hashText(text: string): string {
  return createHash('sha256').update(text).digest('hex')
}

export async function translateText(
  text: string,
  from: 'en' | 'tr',
  to: 'en' | 'tr'
): Promise<string> {
  if (!text || text.trim() === '') return ''
  if (from === to) return text

  const hash = hashText(text)

  // Check cache first
  const cached = await db
    .select()
    .from(translations)
    .where(
      and(
        eq(translations.sourceTextHash, hash),
        eq(translations.sourceLang, from),
        eq(translations.targetLang, to)
      )
    )
    .get()

  if (cached) {
    return cached.translatedText
  }

  // Use google-translate-api-x for translation
  try {
    const { translate } = await import('google-translate-api-x')
    const result = await translate(text, { from, to })
    const translatedText = typeof result === 'string' ? result : result.text

    // Cache the result
    db.insert(translations).values({
      sourceTextHash: hash,
      sourceLang: from,
      targetLang: to,
      translatedText
    }).run()

    return translatedText
  } catch (error) {
    console.error('Translation error:', error)
    throw createError({
      statusCode: 500,
      message: 'Translation service failed'
    })
  }
}
