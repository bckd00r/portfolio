<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMouse, useWindowSize } from '@vueuse/core'
import type { IndexCollectionItem } from '@nuxt/content'

const { footer, global } = useAppConfig()
const { t } = useI18n()

defineProps<{
  page: IndexCollectionItem
}>()

const fullTitle = computed(() => t('hero.title'))
const words = computed(() => fullTitle.value.split(' '))
const typedWords = ref<string[]>([])
const typingIndex = ref(0)
const typingChar = ref(0)
const isComplete = ref(false)

const { x, y } = useMouse()
const { width, height } = useWindowSize()

// Only enable parallax on desktop (pointer:fine)
const isTouch = ref(false)
onMounted(() => {
  isTouch.value = window.matchMedia('(pointer: coarse)').matches
})

// Parallax offsets for image depth — disabled on touch devices
const parallaxX = computed(() => {
  if (isTouch.value || !width.value) return 0
  return ((x.value / width.value) - 0.5) * -30
})
const parallaxY = computed(() => {
  if (isTouch.value || !height.value) return 0
  return ((y.value / height.value) - 0.5) * -30
})

onMounted(() => {
  typedWords.value = words.value.map(() => '')

  // On mobile: skip typewriter, show text instantly
  if (window.innerWidth < 640) {
    typedWords.value = [...words.value]
    typingIndex.value = words.value.length
    isComplete.value = true
    return
  }
  
  const typeNextChar = () => {
    if (typingIndex.value >= words.value.length) {
      isComplete.value = true
      return
    }
    
    const currentWord = words.value[typingIndex.value]
    if (typingChar.value < currentWord.length) {
      typedWords.value[typingIndex.value] += currentWord[typingChar.value]
      typingChar.value++
      setTimeout(typeNextChar, Math.random() * 80 + 40)
    } else {
      typingIndex.value++
      typingChar.value = 0
      setTimeout(typeNextChar, 250)
    }
  }

  setTimeout(typeNextChar, 1000)
})
</script>

<template>
  <div class="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between min-h-[60vh] md:min-h-[70vh] pt-24 pb-12 md:pt-24 md:pb-24 gap-8 md:gap-12">
    
    <!-- Left Column: Typography & Info -->
    <div class="flex-1 flex flex-col justify-center text-left z-10 w-full px-4 md:px-0">
      
      <!-- Subtitle -->
      <Motion
        :initial="{ opacity: 0, transform: 'translateX(-20px)' }"
        :animate="{ opacity: 1, transform: 'translateX(0)' }"
        :transition="{ duration: 0.8, delay: 0.2 }"
      >
        <span class="text-xs sm:text-sm font-body uppercase tracking-[0.3em] text-muted mb-4 block">
          {{ t('hero.subtitle') }}
        </span>
      </Motion>

      <!-- Name / Title (Animated Typewriter with White Background) -->
      <Motion
        :initial="{ opacity: 0, transform: 'translateY(30px)' }"
        :animate="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ duration: 1.0, delay: 0.4, easing: 'easeOutQuart' }"
        class="mt-2 mb-8"
      >
        <h1 class="font-display font-medium text-[2.5rem] sm:text-7xl lg:text-[6rem] leading-[1.05] tracking-tighter uppercase flex flex-col items-start gap-1 sm:gap-2">
          <div 
            v-for="(word, i) in words" 
            :key="i"
            class="relative inline-block"
          >
            <!-- Invisible placeholder to maintain layout -->
            <span class="invisible px-3 sm:px-4 pt-1 pb-2 block">{{ word }}</span>
            
            <!-- Typed Highlighted Text -->
            <span 
              v-if="typingIndex >= i"
              class="absolute top-0 left-0 h-full bg-white text-black px-3 sm:px-4 pt-1 pb-2 flex items-center whitespace-nowrap overflow-hidden transition-all"
            >
              {{ typedWords[i] }}
              <span 
                v-if="typingIndex === i && !isComplete"
                class="inline-block w-[0.1em] h-[0.75em] bg-black ml-[0.15em] animate-pulse"
              ></span>
            </span>
          </div>
        </h1>
      </Motion>

      <!-- Description -->
      <Motion
        :initial="{ opacity: 0, transform: 'translateY(20px)' }"
        :animate="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ duration: 0.8, delay: 0.6 }"
      >
        <p class="mt-4 text-base sm:text-lg text-muted leading-relaxed max-w-md font-body">
          {{ t('hero.description') }}
        </p>
      </Motion>

      <!-- CTA & Socials -->
      <Motion
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 1.0, delay: 0.8 }"
      >
        <div class="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <MagneticWrapper>
            <UButton 
              :label="t('hero.viewProjects')" 
              to="/projects" 
              size="lg"
              color="neutral"
              variant="solid"
              class="font-body tracking-wide rounded-none px-8 py-3 bg-white text-black hover:bg-white/90 transition-colors block"
            />
          </MagneticWrapper>
          
          <div class="flex gap-x-4">
            <MagneticWrapper v-for="(link, index) of footer?.links" :key="index">
              <UButton
                v-bind="{ size: 'sm', color: 'neutral', variant: 'ghost', ...link }"
                class="transition-opacity duration-300 opacity-50 hover:opacity-100 rounded-none hover:bg-white/5 block"
              />
            </MagneticWrapper>
          </div>
        </div>
      </Motion>
    </div>

    <!-- Right Column: Image -->
    <div class="flex-1 w-full flex justify-end items-center relative">
      <Motion
        :initial="{ opacity: 0, transform: 'scale(0.95)' }"
        :animate="{ opacity: 1, transform: 'scale(1)' }"
        :transition="{ duration: 1.2, delay: 0.3, easing: 'easeOutQuart' }"
        class="w-full max-w-md md:max-w-lg lg:max-w-xl"
      >
        <div 
          class="aspect-[3/4] overflow-hidden relative group transition-transform duration-75 ease-linear will-change-transform"
          :style="{ transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)` }"
        >
          <NuxtImg
            class="w-full h-full object-cover rounded-none grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
            :src="global.picture?.dark!"
            :alt="global.picture?.alt!"
            sizes="sm:100vw md:50vw lg:600px"
          />
          <div class="absolute inset-0 border border-white/10 pointer-events-none transition-colors duration-500 group-hover:border-white/20"></div>
        </div>
      </Motion>
    </div>
    
    <!-- Fixed Marquee at the bottom of the section -->
    <div class="absolute bottom-0 left-0 w-full z-0 opacity-40">
      <LandingMarquee text="SENIOR SOFTWARE DEVELOPER — FASHION MODEL — TECH ENTHUSIAST — CREATIVE MIND — " :repeat="8" />
    </div>

  </div>
</template>
