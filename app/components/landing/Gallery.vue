<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const { t } = useI18n()

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <div class="w-full h-full flex flex-col">

    <!-- Exhibition Header — compact -->
    <div class="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <span class="text-[10px] font-body uppercase tracking-[0.3em] text-muted mb-2 block">
          04 / Selected Work
        </span>
        <h2 class="font-display font-medium text-3xl sm:text-5xl tracking-tighter uppercase text-primary leading-none">
          {{ t('gallery.title') }}
        </h2>
      </div>
      <p class="text-xs sm:text-sm text-muted max-w-xs font-body leading-relaxed">
        {{ t('gallery.description') }}
      </p>
    </div>

    <!-- Exhibition Grid — Both pieces in one viewport -->
    <div class="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 min-h-0">

      <!-- Piece 01: Large -->
      <div 
        class="md:col-span-7 group cursor-pointer relative overflow-hidden"
        @mouseenter="useState('cursorText').value = 'VIEW'"
        @mouseleave="useState('cursorText').value = ''"
      >
        <TiltWrapper class="h-full">
          <div class="relative h-full overflow-hidden">
            <NuxtImg 
              src="/img/gallery_1.png" 
              alt="Systems Engineering" 
              class="w-full h-full object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03] grayscale group-hover:grayscale-0" 
              sizes="sm:100vw md:58vw"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <!-- Caption overlay (bottom-left) -->
            <div class="absolute bottom-0 left-0 p-4 md:p-6 flex items-end gap-4">
              <span class="font-display text-5xl md:text-7xl tracking-tighter text-white/15 font-medium leading-none">01</span>
              <div class="mb-1">
                <span class="text-[10px] font-body uppercase tracking-[0.2em] text-white/50 block mb-1">Software</span>
                <h3 class="font-display text-lg md:text-xl uppercase tracking-tight text-white">Systems Engineering</h3>
              </div>
            </div>
          </div>
        </TiltWrapper>
      </div>

      <!-- Piece 02: Smaller, offset -->
      <div 
        class="md:col-span-5 group cursor-pointer relative overflow-hidden flex flex-col"
        @mouseenter="useState('cursorText').value = 'VIEW'"
        @mouseleave="useState('cursorText').value = ''"
      >
        <!-- Top spacer for asymmetric offset on desktop -->
        <div class="hidden md:block h-12" />

        <TiltWrapper class="flex-1">
          <div class="relative h-full overflow-hidden">
            <NuxtImg 
              src="/img/gallery_2.png" 
              alt="Editorial Mode" 
              class="w-full h-full object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03] grayscale group-hover:grayscale-0" 
              sizes="sm:100vw md:42vw"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <!-- Caption overlay (bottom-left) -->
            <div class="absolute bottom-0 left-0 p-4 md:p-6 flex items-end gap-4">
              <span class="font-display text-5xl md:text-7xl tracking-tighter text-white/15 font-medium leading-none">02</span>
              <div class="mb-1">
                <span class="text-[10px] font-body uppercase tracking-[0.2em] text-white/50 block mb-1">Modeling</span>
                <h3 class="font-display text-lg md:text-xl uppercase tracking-tight text-white">Editorial & Print</h3>
              </div>
            </div>
          </div>
        </TiltWrapper>
      </div>

    </div>
  </div>
</template>
