<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">
    <div class="editorial-divider mb-12"></div>
    
    <ScrollReveal>
      <span class="text-[10px] font-body uppercase tracking-[0.2em] text-muted mb-12 block text-center">
        08 / Endorsements
      </span>
    </ScrollReveal>

    <UPageSection
      :ui="{
        container: 'px-0 pt-0!'
      }"
    >
      <UCarousel
        v-slot="{ item }"
        :items="page.testimonials"
        :autoplay="{ delay: 5000 }"
        loop
        dots
        :ui="{
          viewport: 'max-w-(--ui-container) bg-transparent'
        }"
      >
        <UPageCTA
          :description="item.quote"
          variant="naked"
          class="rounded-none bg-transparent"
          :ui="{
            container: 'sm:py-16 lg:py-24 sm:gap-12 flex flex-col items-center justify-center text-center',
            description: 'font-display text-2xl md:text-4xl text-primary font-medium tracking-tight text-balance before:content-[open-quote] before:text-5xl lg:before:text-7xl before:inline-block before:text-white/10 before:absolute before:-ml-6 lg:before:-ml-12 before:-mt-2 lg:before:-mt-4 after:content-[close-quote] after:text-5xl lg:after:text-7xl after:inline-block after:text-white/10 after:absolute after:mt-1 lg:after:mt-0 after:ml-1 lg:after:ml-2'
          }"
        >
          <div class="flex flex-col items-center gap-4 mt-8">
            <UUser
              v-bind="item.author"
              size="xl"
              class="justify-center grayscale opacity-80"
              :ui="{ name: 'font-body font-medium text-sm tracking-wide uppercase', description: 'font-body text-xs text-muted' }"
            />
          </div>
        </UPageCTA>
      </UCarousel>
    </UPageSection>
  </div>
</template>
