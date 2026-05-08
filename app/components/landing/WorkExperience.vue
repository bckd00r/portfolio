<script setup lang="ts">
import { ref } from 'vue'
import { useMouse } from '@vueuse/core'

const { t, locale } = useI18n()
const { x, y } = useMouse()

const props = defineProps<{
  items: any[] | null
}>()

const hoveredIndex = ref<number | null>(null)

// Fallback to random placeholder for the floating image if data lacks images
const getHoverImage = (index: number) => `https://picsum.photos/seed/exp${index}/400/300`
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative">
    
    <!-- Floating Image Portal -->
    <ClientOnly>
      <div 
        class="fixed pointer-events-none z-50 w-64 h-48 overflow-hidden grayscale transition-all duration-300 ease-out will-change-transform hidden md:block"
        :class="hoveredIndex !== null ? 'opacity-80 scale-100 rotate-2' : 'opacity-0 scale-95 rotate-0'"
        :style="{ 
          transform: `translate3d(${x}px, ${y}px, 0) translate(-20%, -80%)`,
          left: 0,
          top: 0
        }"
      >
        <img 
          v-if="hoveredIndex !== null" 
          :src="getHoverImage(hoveredIndex)" 
          class="w-full h-full object-cover transition-transform duration-1000 scale-110" 
          alt="" 
        />
      </div>
    </ClientOnly>

    <div class="editorial-divider mb-12"></div>
    
    <div class="flex flex-col md:flex-row gap-12">
      <!-- Title -->
      <div class="md:w-1/3">
        <ScrollReveal>
          <span class="text-[10px] font-body uppercase tracking-[0.2em] text-muted mb-4 block">
            05 / Career
          </span>
          <h2 class="font-display font-medium text-4xl sm:text-5xl tracking-tighter text-primary uppercase">
            {{ t('experience.title') }}
          </h2>
        </ScrollReveal>
      </div>

      <!-- Timeline -->
      <div class="md:w-2/3 flex flex-col relative z-10">
        <ScrollReveal
          v-for="(exp, index) in items || []"
          :key="exp.id || index"
          :delay="index * 100"
        >
          <div 
            class="group relative py-8 border-t border-white/10 first:border-transparent first:pt-0 hover:bg-white/[0.02] transition-colors duration-500 px-4 md:px-6 -mx-4 md:-mx-6 cursor-crosshair"
            @mouseenter="hoveredIndex = index"
            @mouseleave="hoveredIndex = null"
          >
            
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
              <h3 class="font-display text-2xl md:text-3xl text-primary transition-colors">
                {{ locale === 'tr' && exp.positionTr ? exp.positionTr : exp.positionEn }}
              </h3>
              <span class="text-xs font-body tracking-widest text-muted uppercase shrink-0">
                {{ exp.dateLabel }}
              </span>
            </div>

            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center size-8 border border-white/10 bg-transparent text-muted group-hover:text-primary transition-colors duration-300">
                <UIcon v-if="exp.companyLogo" :name="exp.companyLogo" class="size-4" />
              </div>
              <p class="text-sm font-body tracking-wide text-muted group-hover:text-primary transition-colors duration-300 uppercase">
                {{ exp.companyName }}
              </p>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </div>

  </div>
</template>
