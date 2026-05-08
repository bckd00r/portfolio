import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { parse } from 'yaml'
import * as schema from './schema'

const rootDir = resolve(__dirname, '../..')
const sqlite = new Database(resolve(rootDir, 'data/portfolio.db'))
sqlite.pragma('journal_mode = WAL')
sqlite.pragma('foreign_keys = ON')
const db = drizzle(sqlite, { schema })

function readYaml(relativePath: string) {
  const raw = readFileSync(resolve(rootDir, 'content', relativePath), 'utf-8')
  return parse(raw)
}

function readMarkdown(relativePath: string) {
  const raw = readFileSync(resolve(rootDir, 'content', relativePath), 'utf-8')
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!fmMatch) return { meta: {}, body: raw }
  return { meta: parse(fmMatch[1]), body: fmMatch[2].trim() }
}

function seed() {
  console.log('Seeding database...')

  // ── Hero Config ──
  const indexData = readYaml('index.yml')
  db.insert(schema.heroConfig).values({
    subtitleEn: 'Software Developer',
    subtitleTr: 'Yazılım Geliştirici',
    descriptionEn: indexData.description || '',
    descriptionTr: 'Düşük seviye çözümler ve modern web deneyimleri üreten, pratik altyapıya sahip bir yazılım geliştirici.',
    available: true
  }).run()
  console.log('  ✓ Hero config')

  // ── About ──
  const aboutData = readYaml('about.yml')
  db.insert(schema.about).values({
    contentEn: aboutData.content || '',
    contentTr: '',
    profileImage: aboutData.images?.[0]?.src || '/profile.jpeg'
  }).run()
  console.log('  ✓ About')

  // ── Experience ──
  if (indexData.experience?.items) {
    for (let i = 0; i < indexData.experience.items.length; i++) {
      const item = indexData.experience.items[i]
      db.insert(schema.experience).values({
        positionEn: item.position,
        positionTr: '',
        dateLabel: String(item.date),
        companyName: item.company.name,
        companyUrl: item.company.url || '#',
        companyLogo: item.company.logo || '',
        companyColor: item.company.color || '#3b82f6',
        sortOrder: i
      }).run()
    }
    console.log(`  ✓ Experience (${indexData.experience.items.length} items)`)
  }

  // ── Skills ──
  if (indexData.skills?.categories) {
    for (let i = 0; i < indexData.skills.categories.length; i++) {
      const cat = indexData.skills.categories[i]
      const result = db.insert(schema.skillCategories).values({
        titleEn: cat.title,
        titleTr: '',
        icon: cat.icon || '',
        sortOrder: i
      }).run()
      const catId = Number(result.lastInsertRowid)

      for (let j = 0; j < cat.items.length; j++) {
        db.insert(schema.skills).values({
          categoryId: catId,
          name: cat.items[j],
          sortOrder: j
        }).run()
      }
    }
    console.log(`  ✓ Skills (${indexData.skills.categories.length} categories)`)
  }

  // ── FAQ ──
  if (indexData.faq?.categories) {
    for (let i = 0; i < indexData.faq.categories.length; i++) {
      const cat = indexData.faq.categories[i]
      const result = db.insert(schema.faqCategories).values({
        titleEn: cat.title,
        titleTr: '',
        sortOrder: i
      }).run()
      const catId = Number(result.lastInsertRowid)

      for (let j = 0; j < cat.questions.length; j++) {
        const q = cat.questions[j]
        db.insert(schema.faqItems).values({
          categoryId: catId,
          questionEn: q.label,
          questionTr: '',
          answerEn: q.content,
          answerTr: '',
          sortOrder: j
        }).run()
      }
    }
    console.log(`  ✓ FAQ (${indexData.faq.categories.length} categories)`)
  }

  // ── Projects ──
  const projectFiles = ['bloom-finance.yml', 'wavelength-music.yml', 'ecotrack.yml', 'internal-developer-hub.yml']
  let projCount = 0
  for (let i = 0; i < projectFiles.length; i++) {
    try {
      const proj = readYaml(`projects/${projectFiles[i]}`)
      db.insert(schema.projects).values({
        titleEn: proj.title,
        titleTr: '',
        descriptionEn: proj.description,
        descriptionTr: '',
        image: proj.image || '',
        url: proj.url || '#',
        tags: JSON.stringify(proj.tags || []),
        date: String(proj.date || ''),
        sortOrder: i
      }).run()
      projCount++
    } catch {
      console.log(`  ⚠ Skipped project: ${projectFiles[i]}`)
    }
  }
  console.log(`  ✓ Projects (${projCount} items)`)

  // ── Blog Posts ──
  const blogFiles = [
    'psychology-of-color-in-ui-design.md',
    'slow-design-in-fast-paced-digital-world.md',
    'from-mockup-to-market.md',
    'how-i-built-my-own-design-system-from-scratch.md'
  ]
  let blogCount = 0
  for (const file of blogFiles) {
    try {
      const { meta, body } = readMarkdown(`blog/${file}`)
      const slug = file.replace('.md', '')
      db.insert(schema.blogPosts).values({
        slug,
        titleEn: meta.title || slug,
        titleTr: '',
        descriptionEn: meta.description || '',
        descriptionTr: '',
        bodyEn: body,
        bodyTr: '',
        image: meta.image || '',
        minRead: meta.minRead || 5,
        authorName: meta.author?.name || '',
        authorAvatar: meta.author?.avatar?.src || '',
        date: meta.date ? String(meta.date) : '',
        published: true
      }).run()
      blogCount++
    } catch {
      console.log(`  ⚠ Skipped blog: ${file}`)
    }
  }
  console.log(`  ✓ Blog posts (${blogCount} items)`)

  // ── Speaking Events ──
  try {
    const speakingData = readYaml('speaking.yml')
    if (speakingData.events) {
      for (let i = 0; i < speakingData.events.length; i++) {
        const ev = speakingData.events[i]
        db.insert(schema.speakingEvents).values({
          category: ev.category,
          titleEn: ev.title,
          titleTr: '',
          date: String(ev.date || ''),
          locationEn: ev.location || '',
          locationTr: '',
          url: ev.url || '',
          sortOrder: i
        }).run()
      }
      console.log(`  ✓ Speaking events (${speakingData.events.length} items)`)
    }
  } catch {
    console.log('  ⚠ Skipped speaking events')
  }

  console.log('Seed complete!')
  sqlite.close()
}

seed()
