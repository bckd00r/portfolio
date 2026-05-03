<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { mapContentNavigation } from '@nuxt/ui/utils/content'
import { findPageBreadcrumb } from '@nuxt/content/utils'

const route = useRoute()
const { t, locale } = useI18n()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('blog').path(route.path).first()
)
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings('blog', route.path, {
    fields: ['description']
  })
)

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))
const blogNavigation = computed(() => navigation.value.find(item => item.path === '/blog')?.children || [])

const breadcrumb = computed(() => mapContentNavigation(findPageBreadcrumb(blogNavigation?.value, page.value?.path)).map(({ icon, ...link }) => link))

if (page.value.image) {
  defineOgImage({ url: page.value.image })
} else {
  defineOgImageComponent('Blog', {
    headline: breadcrumb.value.map(item => item.label).join(' > ')
  }, {
    fonts: ['Geist:400', 'Geist:600']
  })
}

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title
})

const articleLink = computed(() => `${window?.location}`)

const formatDate = (dateString: string) => {
  const loc = locale.value === 'tr' ? 'tr-TR' : 'en-US'
  return new Date(dateString).toLocaleDateString(loc, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div v-if="page" class="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
    <!-- Back Link -->
    <div class="mb-16">
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-2 text-xs font-body tracking-[0.2em] uppercase text-muted hover:text-primary transition-colors duration-300"
      >
        <UIcon name="lucide:arrow-left" class="size-4" />
        {{ t('common.backToBlog') }}
      </NuxtLink>
    </div>

    <!-- Article Header -->
    <header class="mb-16 md:mb-24 text-center flex flex-col items-center">
      <div class="flex items-center gap-3 text-xs font-body tracking-[0.2em] uppercase text-muted mb-8">
        <span v-if="page.date">{{ formatDate(page.date) }}</span>
        <span v-if="page.date && page.minRead" class="w-1 h-1 bg-white/20 rounded-full"></span>
        <span v-if="page.minRead">{{ page.minRead }} {{ t('common.minRead') }}</span>
      </div>

      <h1 class="font-display font-medium text-4xl sm:text-5xl md:text-6xl tracking-tighter text-primary uppercase leading-tight mb-8 max-w-3xl">
        {{ page.title }}
      </h1>

      <p class="text-base md:text-lg font-body text-muted leading-relaxed max-w-2xl">
        {{ page.description }}
      </p>
    </header>

    <!-- Cover Image -->
    <div v-if="page.image" class="w-full aspect-[21/9] md:aspect-[2.5/1] overflow-hidden relative mb-16 md:mb-24">
      <NuxtImg
        :src="page.image"
        :alt="page.title"
        class="w-full h-full object-cover grayscale opacity-90"
      />
      <div class="absolute inset-0 border border-white/10 pointer-events-none"></div>
    </div>

    <!-- Article Body -->
    <article class="prose prose-invert max-w-2xl mx-auto
                    prose-p:font-body prose-p:text-muted/90 prose-p:leading-loose prose-p:text-base sm:prose-p:text-lg prose-p:mb-8
                    prose-headings:font-display prose-headings:font-medium prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-primary prose-headings:mt-16 prose-headings:mb-6
                    prose-h2:text-3xl prose-h3:text-2xl
                    prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-a:decoration-white/30 hover:prose-a:decoration-white
                    prose-strong:text-primary prose-strong:font-medium
                    prose-blockquote:border-l-primary prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:font-display prose-blockquote:text-xl prose-blockquote:not-italic prose-blockquote:text-primary
                    prose-img:grayscale">
      <ContentRenderer
        v-if="page.body"
        :value="page"
      />
    </article>

    <!-- Footer Actions -->
    <div class="max-w-2xl mx-auto mt-24 pt-12 border-t border-white/10 flex items-center justify-between">
      <UUser
        v-bind="page.author"
        size="lg"
        class="grayscale opacity-80"
        :ui="{ name: 'font-body text-sm uppercase tracking-wide', description: 'font-body text-xs text-muted' }"
      />

      <button
        class="text-xs font-body tracking-[0.2em] uppercase text-muted hover:text-primary transition-colors duration-300 flex items-center gap-2"
        @click="copyToClipboard(articleLink, 'Article link copied to clipboard')"
      >
        <UIcon name="lucide:link" class="size-4" />
        {{ t('common.copyLink') }}
      </button>
    </div>

    <div class="max-w-2xl mx-auto mt-16">
      <UContentSurround :surround />
    </div>
  </div>
</template>
