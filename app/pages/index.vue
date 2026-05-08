<script setup lang="ts">
const { t } = useI18n()

// Fetch all data from API instead of @nuxt/content
const { data: hero } = await useFetch('/api/hero')
const { data: aboutData } = await useFetch('/api/about')
const { data: experienceData } = await useFetch('/api/experience')
const { data: skillsData } = await useFetch('/api/skills')
const { data: faqData } = await useFetch('/api/faq')

useSeoMeta({
  title: t('hero.title'),
  ogTitle: t('hero.title'),
  description: hero.value?.descriptionEn || '',
  ogDescription: hero.value?.descriptionEn || ''
})

const activeSection = ref(0)
const totalSections = 7
const isTransitioning = ref(false)
const dirs = [-1, 1, -1, 1, -1, 1, -1] // alternating slide directions

function getTranslateX(i: number): number {
  if (i === activeSection.value) return 0
  const d = dirs[i]
  return i < activeSection.value ? -60 * d : 60 * d
}

function go(delta: number) {
  if (isTransitioning.value) return
  const next = activeSection.value + delta
  if (next < 0 || next >= totalSections) return
  isTransitioning.value = true
  activeSection.value = next
  setTimeout(() => { isTransitioning.value = false }, 750)
}

function handleWheel(e: WheelEvent) {
  // Allow internal scroll if section content overflows
  const el = document.querySelector('.fp-section-active') as HTMLElement | null
  if (el && el.scrollHeight > el.clientHeight + 2) {
    const atTop = el.scrollTop <= 0
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2
    if (e.deltaY > 0 && !atBottom) return
    if (e.deltaY < 0 && !atTop) return
  }
  e.preventDefault()
  if (Math.abs(e.deltaY) < 25) return
  go(e.deltaY > 0 ? 1 : -1)
}

let touchY = 0
function onTouchStart(e: TouchEvent) { touchY = e.touches[0].clientY }
function onTouchEnd(e: TouchEvent) {
  const diff = touchY - e.changedTouches[0].clientY
  if (Math.abs(diff) < 50) return
  go(diff > 0 ? 1 : -1)
}

onMounted(() => {
  document.documentElement.style.overflow = 'hidden'
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchend', onTouchEnd, { passive: true })
})

onUnmounted(() => {
  document.documentElement.style.overflow = ''
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchend', onTouchEnd)
})

const sectionLabels = computed(() => [
  t('nav.home'),
  t('about.title'),
  t('experience.title'),
  t('skills.title'),
  t('gallery.title'),
  t('blog.title'),
  t('faq.title')
])
</script>

<template>
  <div class="fixed inset-0 z-20">
    <!-- Section indicator dots -->
    <div class="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-3">
      <button
        v-for="i in totalSections"
        :key="i"
        class="group relative flex items-center justify-end p-0 cursor-pointer"
        @click="activeSection = i - 1"
      >
        <span
          class="absolute right-5 text-[10px] font-mono tracking-wider text-white/0 group-hover:text-white/50 transition-all duration-300 whitespace-nowrap block"
        >{{ sectionLabels[i - 1] }}</span>
        <span
          class="size-1.5 rounded-full transition-all duration-500"
          :class="activeSection === i - 1
            ? [
                i === 1 ? 'bg-white/70' : '',
                i === 2 ? 'bg-emerald-400/80' : '',
                i === 3 ? 'bg-amber-400/80' : '',
                i === 4 ? 'bg-rose-400/80' : '',
                i === 5 ? 'bg-emerald-400/80' : '',
                i === 6 ? 'bg-blue-400/80' : '',
                i === 7 ? 'bg-blue-400/80' : '',
                'scale-[1.6] shadow-[0_0_8px_rgba(255,255,255,0.3)]'
              ]
            : 'bg-white/15 hover:bg-white/30'"
        />
      </button>
    </div>

    <!-- Stacked sections -->
    <div
      v-for="i in totalSections"
      :key="i"
      class="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-y-auto px-4 sm:px-8"
      :class="activeSection === i - 1 ? 'fp-section-active' : ''"
      :style="{
        opacity: activeSection === i - 1 ? 1 : 0,
        transform: `translateX(${getTranslateX(i - 1)}px)`,
        pointerEvents: activeSection === i - 1 ? 'auto' : 'none',
        zIndex: activeSection === i - 1 ? 10 : 1
      }"
    >
      <div 
        :class="[
          'w-full mx-auto h-full flex flex-col pt-20 pb-12 sm:py-20',
          i === 5 ? 'max-w-7xl px-4 sm:px-6' : 'max-w-5xl px-4 sm:px-8'
        ]"
      >
        <LandingHero v-if="i === 1" :hero="hero" />
        <LandingAbout v-else-if="i === 2" :about="aboutData" />
        <LandingWorkExperience v-else-if="i === 3" :items="experienceData" />
        <LandingSkills v-else-if="i === 4" :categories="skillsData" />
        <LandingGallery v-else-if="i === 5" />
        <LandingBlog v-else-if="i === 6" />
        <LandingFAQ v-else-if="i === 7" :categories="faqData" />
      </div>
    </div>
  </div>
</template>
