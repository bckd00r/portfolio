import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// ── Projects ─────────────────────────────────────────
export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  titleEn: text('title_en').notNull(),
  titleTr: text('title_tr').default(''),
  descriptionEn: text('description_en').notNull(),
  descriptionTr: text('description_tr').default(''),
  image: text('image').default(''),
  url: text('url').default(''),
  tags: text('tags').default('[]'),
  date: text('date').default(''),
  sortOrder: integer('sort_order').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
})

// ── Blog Posts ────────────────────────────────────────
export const blogPosts = sqliteTable('blog_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  titleEn: text('title_en').notNull(),
  titleTr: text('title_tr').default(''),
  descriptionEn: text('description_en').default(''),
  descriptionTr: text('description_tr').default(''),
  bodyEn: text('body_en').default(''),
  bodyTr: text('body_tr').default(''),
  image: text('image').default(''),
  minRead: integer('min_read').default(5),
  authorName: text('author_name').default(''),
  authorAvatar: text('author_avatar').default(''),
  date: text('date').default(''),
  published: integer('published', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
})

// ── About ─────────────────────────────────────────────
export const about = sqliteTable('about', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  contentEn: text('content_en').default(''),
  contentTr: text('content_tr').default(''),
  profileImage: text('profile_image').default(''),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
})

// ── Experience ────────────────────────────────────────
export const experience = sqliteTable('experience', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  positionEn: text('position_en').notNull(),
  positionTr: text('position_tr').default(''),
  dateLabel: text('date_label').default(''),
  companyName: text('company_name').default(''),
  companyUrl: text('company_url').default(''),
  companyLogo: text('company_logo').default(''),
  companyColor: text('company_color').default('#3b82f6'),
  sortOrder: integer('sort_order').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
})

// ── Skill Categories ──────────────────────────────────
export const skillCategories = sqliteTable('skill_categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  titleEn: text('title_en').notNull(),
  titleTr: text('title_tr').default(''),
  icon: text('icon').default(''),
  sortOrder: integer('sort_order').default(0)
})

// ── Skills ────────────────────────────────────────────
export const skills = sqliteTable('skills', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  categoryId: integer('category_id').notNull().references(() => skillCategories.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  sortOrder: integer('sort_order').default(0)
})

// ── FAQ Categories ────────────────────────────────────
export const faqCategories = sqliteTable('faq_categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  titleEn: text('title_en').notNull(),
  titleTr: text('title_tr').default(''),
  sortOrder: integer('sort_order').default(0)
})

// ── FAQ Items ─────────────────────────────────────────
export const faqItems = sqliteTable('faq_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  categoryId: integer('category_id').notNull().references(() => faqCategories.id, { onDelete: 'cascade' }),
  questionEn: text('question_en').notNull(),
  questionTr: text('question_tr').default(''),
  answerEn: text('answer_en').notNull(),
  answerTr: text('answer_tr').default(''),
  sortOrder: integer('sort_order').default(0)
})

// ── Speaking Events ───────────────────────────────────
export const speakingEvents = sqliteTable('speaking_events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  category: text('category').notNull(),
  titleEn: text('title_en').notNull(),
  titleTr: text('title_tr').default(''),
  date: text('date').default(''),
  locationEn: text('location_en').default(''),
  locationTr: text('location_tr').default(''),
  url: text('url').default(''),
  sortOrder: integer('sort_order').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
})

// ── Hero Config ───────────────────────────────────────
export const heroConfig = sqliteTable('hero_config', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  subtitleEn: text('subtitle_en').default(''),
  subtitleTr: text('subtitle_tr').default(''),
  descriptionEn: text('description_en').default(''),
  descriptionTr: text('description_tr').default(''),
  available: integer('available', { mode: 'boolean' }).default(true),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
})

// ── Translations Cache ────────────────────────────────
export const translations = sqliteTable('translations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sourceTextHash: text('source_text_hash').notNull(),
  sourceLang: text('source_lang').notNull(),
  targetLang: text('target_lang').notNull(),
  translatedText: text('translated_text').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
})
