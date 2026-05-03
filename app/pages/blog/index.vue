<script setup lang="ts">
const { t } = useI18n()

const { data: posts } = await useAsyncData('blogs', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

useSeoMeta({
  title: t('pages.blog.title'),
  ogTitle: t('pages.blog.title'),
  description: t('pages.blog.description'),
  ogDescription: t('pages.blog.description')
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
    <!-- Header -->
    <div class="mb-24">
      <ScrollReveal>
        <div class="flex items-center gap-4 mb-8">
          <span class="text-xs font-body uppercase tracking-[0.2em] text-muted">
            04 / Journal
          </span>
          <div class="h-px w-12 bg-white/10"></div>
        </div>
        
        <h1 class="font-display font-medium text-4xl sm:text-6xl tracking-tighter text-primary uppercase leading-none mb-6">
          {{ t('pages.blog.title') }}
        </h1>
        
        <p class="text-sm font-body tracking-widest text-muted uppercase max-w-xl">
          {{ t('pages.blog.description') }}
        </p>
      </ScrollReveal>
    </div>

    <!-- Blog Posts List -->
    <div v-if="posts && posts.length" class="flex flex-col">
      <div class="border-t border-white/10"></div>
      
      <ScrollReveal
        v-for="(post, index) in posts"
        :key="index"
        :delay="index * 100"
      >
        <NuxtLink
          :to="post.path"
          class="group flex flex-col md:flex-row gap-8 py-12 border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-500 px-4 md:px-6 -mx-4 md:-mx-6"
        >
          <!-- Meta Date / Info -->
          <div class="md:w-1/4 shrink-0 flex flex-col gap-2 pt-1">
            <span v-if="post.date" class="text-xs font-body tracking-widest text-muted uppercase">
              {{ new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </span>
            <span v-if="post.minRead" class="text-[10px] font-body tracking-[0.2em] text-muted/50 uppercase">
              {{ post.minRead }} {{ t('common.minRead') }}
            </span>
          </div>

          <!-- Title & Excerpt -->
          <div class="md:w-2/4 flex flex-col">
            <h3 class="font-display text-2xl md:text-3xl text-primary tracking-tight mb-4 group-hover:text-white transition-colors duration-300">
              {{ post.title }}
            </h3>
            <p class="text-sm sm:text-base font-body text-muted leading-relaxed line-clamp-3">
              {{ post.description }}
            </p>
          </div>

          <!-- Optional Thumbnail -->
          <div class="md:w-1/4 shrink-0 flex justify-end">
            <div v-if="post.image" class="w-full max-w-[160px] aspect-[4/3] overflow-hidden relative">
              <NuxtImg
                :src="post.image"
                :alt="post.title"
                class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
              />
            </div>
          </div>
        </NuxtLink>
      </ScrollReveal>
    </div>
  </div>
</template>
