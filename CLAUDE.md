# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server at http://localhost:3000
pnpm build        # Production build
pnpm preview      # Preview production build locally
pnpm lint         # ESLint check
pnpm lint:fix     # ESLint auto-fix
pnpm typecheck    # Nuxt TypeScript type checking (vue-tsc)
```

Package manager is **pnpm** (v10.33.2). Do not use npm or yarn.

## Architecture

This is a **Nuxt 4** portfolio site using the app directory convention (`app/` holds all Vue source code). Built on top of the Nuxt UI Portfolio template, heavily customized with a "Dark Luxe" editorial design.

### Key Modules

- **@nuxt/ui v4** — UI component library (Tailwind CSS v4 based). Components are prefixed with `U` (e.g., `<UApp>`, `<UMain>`, `<UContainer>`).
- **@nuxt/content v3** — Content sourced from `content/` directory, backed by better-sqlite3. Collections and schemas defined in `content.config.ts`.
- **@nuxtjs/i18n** — Bilingual support (English `en` + Turkish `tr`). Strategy is `no_prefix` (no URL path prefixes). Translation files in `i18n/locales/`. Browser language detected via `i18n_lang` cookie.
- **motion-v** — Vue animation library for element transitions.
- **@vueuse/nuxt** — Vue utility composables.
- **nuxt-og-image** — Auto-generated Open Graph images.

### Content System

Content is defined via YAML and Markdown files in `content/`. The schema is strictly typed in `content.config.ts` using Zod. Collections:

| Collection | Source | Type | Purpose |
|------------|--------|------|---------|
| `index` | `index.yml` | page | Homepage sections (hero, about, experience, skills, blog, faq) |
| `projects` | `projects/*.yml` | data | Project showcase items |
| `blog` | `blog/*.md` | page | Blog posts (Markdown) |
| `pages` | `projects.yml`, `blog.yml` | page | List page headers |
| `speaking` | `speaking.yml` | page | Speaking/events page |
| `about` | `about.yml` | page | About page |

### Homepage Snap Scroll

The homepage (`app/pages/index.vue`) uses a custom full-page snap scroll system — not native CSS snap. It renders 7 fixed-position stacked sections with wheel/touch event handlers controlling which section is visible. Each section maps to a `Landing*` component. Section navigation dots appear on the right side (desktop only).

### Layout System

The default layout (`app/layouts/default.vue`) has two modes:
- **Fullpage mode** (homepage `/`): No container wrapping, slot renders as fixed overlay for the snap scroll system.
- **Standard mode** (all other pages): Wrapped in `<UContainer>` with header and footer.

### Global UI Features

Three components are rendered globally in `app.vue` outside the layout:
- `<Preloader>` — Page load animation
- `<NoiseOverlay>` — Film grain texture overlay
- `<CustomCursor>` — Custom cursor (desktop only, hidden on `pointer: coarse`)

### Design System

**Style: Motion-Driven Elegant Minimalist** — animation-heavy, microinteractions, smooth transitions, scroll effects, editorial aesthetic. Avoid corporate templates and generic layouts.

#### Typography
- **Display/Heading**: Archivo (`font-display` class, `--font-display`) — uppercase, tight tracking (`tracking-tighter`), used for section titles and large numbers
- **Body**: Space Grotesk (`font-body` class, `--font-sans`) — used for paragraphs, labels, UI text
- **Section labels**: `text-[10px] font-body uppercase tracking-[0.3em] text-muted` pattern (e.g., "04 / Selected Work")

#### Color Palette (Dark Monochrome)
Defined as CSS custom properties in `main.css`. The site is dark-first.

| Role | Token | Hex |
|------|-------|-----|
| Background | `--bg-deep` | `#000000` |
| Surface | `--bg-surface` | `#09090B` |
| Elevated | `--bg-elevated` | `#18181B` |
| Text primary | `--text-primary` | `#FFFFFF` |
| Text secondary | `--text-secondary` | `#A1A1AA` |
| Border subtle | `--border-subtle` | `#27272A` |
| Border strong | `--border-strong` | `#3F3F46` |

UI colors: Primary = `neutral`, Neutral = `zinc` (set in `app.config.ts`).

#### Icons
Lucide (`@iconify-json/lucide`) and Simple Icons (`@iconify-json/simple-icons`). Never use emojis as icons.

#### Motion & Interaction Components
The site uses custom wrapper components for microinteractions — use these when building new UI:

| Component | Purpose | Key Behavior |
|-----------|---------|-------------|
| `<ScrollReveal>` | Fade+slide on scroll | Viewport-driven opacity/translateX with cubic ease-out, configurable `from`/`to`/`slideX` props |
| `<TextReveal>` | Word-by-word entrance | IntersectionObserver triggers staggered translateY per word (30ms delay between words, 800ms duration) |
| `<MagneticWrapper>` | Magnetic hover pull | Element follows cursor within 15px radius, lerp on enter / spring-back on leave |
| `<TiltWrapper>` | 3D perspective tilt | `perspective(1000px)` with max 12deg rotation via `@vueuse/core` `useMouseInElement` |
| `<PolaroidItem>` | Glass-panel image card | `glass-panel` class with small image + caption |

#### Custom Cursor System
The native cursor is hidden on desktop (`cursor: none` on `pointer: fine` devices). `<CustomCursor>` renders two elements:
- **Inner dot** (5px): instant mouse tracking, `mix-blend-difference`
- **Outer ring** (8px default): lerp-trailing with factor 0.18, expands to 48px on hover (`cursorActive` state) or 96px with text label (`cursorText` state)

To trigger cursor states from any component, use `useState`:
```ts
useState('cursorText').value = 'VIEW'   // expand ring + show label
useState('cursorActive').value = true   // expand ring only
```

#### Animation Conventions
- **Easing**: `cubic-bezier(0.25, 1, 0.5, 1)` for most transitions (ease-out quart feel). Preloader uses `cubic-bezier(0.76, 0, 0.24, 1)`.
- **Hover transitions**: 150–400ms. Image zoom uses 2000ms for a slow cinematic feel.
- **Page transitions**: 600ms fade+translateY+blur (defined in `main.css` as `.page-enter-from` / `.page-leave-to`)
- **Grayscale-to-color**: Images default to `grayscale` and transition to `grayscale-0` on hover (Gallery pattern)
- **`will-change: transform`**: Applied on animated elements for GPU compositing
- **`prefers-reduced-motion`**: Respected globally — all animations/transitions collapse to near-zero duration

#### Responsive & Accessibility
- Breakpoints: 375px (mobile), 640px (sm), 768px (md), 1024px (lg), 1440px (xl)
- Touch targets: min 44x44px on `pointer: coarse` devices
- All scrollbars are globally hidden
- Safe area insets for notched devices
- `touch-action: manipulation` on all interactive elements (no 300ms tap delay)
- `overscroll-behavior-y: contain` to prevent pull-to-refresh
- Text contrast: 4.5:1 minimum
- Focus states must remain visible for keyboard navigation

### App Configuration

`app/app.config.ts` holds runtime config: profile picture, email, social links, footer credits, and Nuxt UI color/slot overrides.

## Code Style

- ESLint via `@nuxt/eslint` with stylistic rules: no trailing comma (`commaDangle: 'never'`), 1TBS brace style
- `@typescript-eslint/no-explicit-any` is disabled
- Prefer composables in `app/utils/` (auto-imported by Nuxt)
- Use `useI18n()` and `t()` for all user-facing strings — never hardcode English/Turkish text in templates

## Content Editing

To add/edit content, modify YAML/Markdown files in `content/`. The schema in `content.config.ts` validates all content at build time. When adding new content fields, update the Zod schema first.

For i18n strings (navigation labels, section titles, UI text), edit `i18n/locales/en.json` and `i18n/locales/tr.json`.
