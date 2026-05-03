<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const { t } = useI18n()

defineProps<{
  page: IndexCollectionItem
}>()

const highlights = computed(() => [
  {
    icon: 'i-lucide-globe',
    label: t('about.highlights.england')
  },
  {
    icon: 'i-lucide-dumbbell',
    label: t('about.highlights.sports')
  },
  {
    icon: 'i-lucide-map-pin',
    label: t('about.highlights.travel')
  }
])
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-24 md:py-32">
    
    <div class="editorial-divider mb-12"></div>
    
    <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
      <!-- Title Area -->
      <div class="md:col-span-4">
        <ScrollReveal>
          <span class="text-[10px] font-body uppercase tracking-[0.2em] text-muted mb-4 block">
            03 / Background
          </span>
          <h2 class="font-display font-medium text-4xl sm:text-5xl tracking-tighter text-primary uppercase">
            {{ t('about.title') }}
          </h2>
        </ScrollReveal>
      </div>

      <!-- Content Area -->
      <div class="md:col-span-8 flex flex-col gap-8">
        <!-- Bio text with word-by-word reveal -->
        <div class="text-lg sm:text-xl md:text-2xl font-body text-primary leading-relaxed max-w-3xl">
          <TextReveal :text="t('about.description')" :delay="0.2" />
        </div>

        <!-- Experience Highlights Minimal -->
        <ScrollReveal :delay="400">
          <div class="flex flex-col sm:flex-row gap-6 sm:gap-12 mt-8 pt-8 border-t border-white/10">
            <div
              v-for="item in highlights"
              :key="item.label"
              class="flex items-center gap-3 group cursor-pointer"
            >
              <UIcon :name="item.icon" class="size-5 text-muted group-hover:text-primary transition-colors duration-300" />
              <span class="text-sm font-body tracking-wide text-muted group-hover:text-primary transition-colors duration-300">{{ item.label }}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
    
  </div>
</template>
