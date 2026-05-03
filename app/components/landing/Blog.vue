<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const { t } = useI18n()

defineProps<{
  page: IndexCollectionItem
}>()

const { data: posts } = await useAsyncData('index-blogs', () =>
  queryCollection('blog').order('date', 'DESC').limit(3).all()
)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
}
</script>

<template>
  <div v-if="posts && posts.length" class="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">
    
    <div class="editorial-divider mb-12"></div>
    
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
      <ScrollReveal>
        <span class="text-[10px] font-body uppercase tracking-[0.2em] text-muted mb-4 block">
          04 / Writing
        </span>
        <h2 class="font-display font-medium text-4xl sm:text-5xl tracking-tighter text-primary uppercase">
          {{ t('blog.title') }}
        </h2>
      </ScrollReveal>
      <ScrollReveal :delay="200">
        <UButton 
          label="All Articles" 
          to="/blog" 
          variant="link" 
          color="neutral" 
          class="font-body tracking-wider uppercase text-xs"
          trailing-icon="i-heroicons-arrow-long-right"
        />
      </ScrollReveal>
    </div>

    <div class="flex flex-col">
      <ScrollReveal 
        v-for="(post, index) in posts"
        :key="index"
        :delay="300 + (index * 100)"
      >
        <NuxtLink
          :to="post.path"
          class="group block border-t border-white/10 py-8 md:py-12 hover:bg-white/[0.02] transition-colors"
        >
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 md:px-8">
            <div class="flex-1">
              <span v-if="post.date" class="text-xs font-body tracking-widest text-muted uppercase mb-3 block">
                {{ formatDate(post.date) }}
              </span>
              <h3 class="font-display text-2xl md:text-3xl text-primary group-hover:text-white transition-colors duration-300">
                {{ post.title }}
              </h3>
            </div>
            
            <div class="md:w-1/3">
              <p class="text-sm font-body text-muted line-clamp-2 leading-relaxed">
                {{ post.description }}
              </p>
            </div>
            
            <div class="hidden md:flex items-center justify-end w-12">
              <UIcon
                name="i-heroicons-arrow-long-right"
                class="size-6 text-muted group-hover:text-primary transition-all duration-300 transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              />
            </div>
          </div>
        </NuxtLink>
      </ScrollReveal>
    </div>
  </div>
</template>
