<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()

const slug = route.params.slug as string

const { data: post } = await useFetch(`/api/blog/${slug}`)
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const title = computed(() => locale.value === 'tr' && post.value?.titleTr ? post.value.titleTr : post.value?.titleEn)
const description = computed(() => locale.value === 'tr' && post.value?.descriptionTr ? post.value.descriptionTr : post.value?.descriptionEn)
const body = computed(() => locale.value === 'tr' && post.value?.bodyTr ? post.value.bodyTr : post.value?.bodyEn)

useSeoMeta({
  title: title.value,
  description: description.value,
  ogTitle: title.value,
  ogDescription: description.value
})

if (post.value?.image) {
  defineOgImage({ url: post.value.image })
}

const formatDate = (dateString: string) => {
  const loc = locale.value === 'tr' ? 'tr-TR' : 'en-US'
  return new Date(dateString).toLocaleDateString(loc, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const articleLink = computed(() => typeof window !== 'undefined' ? window.location.href : '')

const copyLink = async () => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    await navigator.clipboard.writeText(articleLink.value)
  }
}
</script>

<template>
  <div v-if="post" class="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
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
        <span v-if="post.date">{{ formatDate(post.date) }}</span>
        <span v-if="post.date && post.minRead" class="w-1 h-1 bg-white/20 rounded-full"></span>
        <span v-if="post.minRead">{{ post.minRead }} {{ t('common.minRead') }}</span>
      </div>

      <h1 class="font-display font-medium text-4xl sm:text-5xl md:text-6xl tracking-tighter text-primary uppercase leading-tight mb-8 max-w-3xl">
        {{ title }}
      </h1>

      <p class="text-base md:text-lg font-body text-muted leading-relaxed max-w-2xl">
        {{ description }}
      </p>
    </header>

    <!-- Cover Image -->
    <div v-if="post.image" class="w-full aspect-[21/9] md:aspect-[2.5/1] overflow-hidden relative mb-16 md:mb-24">
      <NuxtImg
        :src="post.image"
        :alt="title || ''"
        class="w-full h-full object-cover grayscale opacity-90"
      />
      <div class="absolute inset-0 border border-white/10 pointer-events-none"></div>
    </div>

    <!-- Article Body -->
    <article class="rich-text max-w-2xl mx-auto" v-html="body" />

    <!-- Footer Actions -->
    <div class="max-w-2xl mx-auto mt-24 pt-12 border-t border-white/10 flex items-center justify-between">
      <div v-if="post.authorName" class="flex items-center gap-3">
        <NuxtImg
          v-if="post.authorAvatar"
          :src="post.authorAvatar"
          :alt="post.authorName"
          class="size-10 rounded-full grayscale opacity-80 object-cover"
        />
        <span class="font-body text-sm uppercase tracking-wide text-primary">{{ post.authorName }}</span>
      </div>

      <button
        class="text-xs font-body tracking-[0.2em] uppercase text-muted hover:text-primary transition-colors duration-300 flex items-center gap-2"
        @click="copyLink"
      >
        <UIcon name="lucide:link" class="size-4" />
        {{ t('common.copyLink') }}
      </button>
    </div>
  </div>
</template>
