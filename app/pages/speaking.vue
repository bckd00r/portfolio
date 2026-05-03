<script setup lang="ts">
const { t } = useI18n()

type Event = {
  title: string
  date: string
  location: string
  url?: string
  category: 'Conference' | 'Live talk' | 'Podcast'
}

const { data: page } = await useAsyncData('speaking', () => {
  return queryCollection('speaking').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: t('pages.speaking.title'),
  ogTitle: t('pages.speaking.title'),
  description: t('pages.speaking.description'),
  ogDescription: t('pages.speaking.description')
})

const categoryLabels: Record<string, string> = {
  'Conference': 'Core Expertise',
  'Live talk': 'Applied Skills',
  'Podcast': 'Insights'
}

const groupedEvents = computed((): Record<Event['category'], Event[]> => {
  const events = page.value?.events || []
  const grouped: Record<Event['category'], Event[]> = {
    'Conference': [],
    'Live talk': [],
    'Podcast': []
  }
  for (const event of events) {
    if (grouped[event.category]) grouped[event.category].push(event)
  }
  return grouped
})

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}
</script>

<template>
  <div v-if="page" class="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
    <!-- Header -->
    <div class="mb-24">
      <ScrollReveal>
        <div class="flex items-center gap-4 mb-8">
          <span class="text-xs font-body uppercase tracking-[0.2em] text-muted">
            03 / Speaking
          </span>
          <div class="h-px w-12 bg-white/10"></div>
        </div>
        
        <h1 class="font-display font-medium text-4xl sm:text-6xl tracking-tighter text-primary uppercase leading-none mb-6">
          {{ t('pages.speaking.title') }}
        </h1>
        
        <p class="text-sm font-body tracking-widest text-muted uppercase max-w-xl">
          {{ t('pages.speaking.description') }}
        </p>
      </ScrollReveal>
    </div>

    <!-- Events List -->
    <div class="flex flex-col gap-24">
      <div
        v-for="(eventsInCategory, category) in groupedEvents"
        :key="category"
        class="flex flex-col md:flex-row gap-12 border-t border-white/10 pt-12"
      >
        <div class="md:w-1/3 shrink-0">
          <ScrollReveal :slide-x="30">
            <h2 class="font-display text-2xl uppercase tracking-tight text-primary">
              {{ categoryLabels[category] || category }}
            </h2>
          </ScrollReveal>
        </div>

        <div class="md:w-2/3 flex flex-col">
          <ScrollReveal
            v-for="(event, index) in eventsInCategory"
            :key="`${category}-${index}`"
            :delay="index * 100"
          >
            <div class="group relative py-8 border-b border-white/10 last:border-transparent hover:bg-white/[0.02] transition-colors duration-500 px-4 md:px-6 -mx-4 md:-mx-6 cursor-default">
              
              <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-2">
                <h3 class="font-display text-xl md:text-2xl text-primary transition-colors">
                  {{ event.title }}
                </h3>
                <span v-if="event.date" class="text-xs font-body tracking-widest text-muted uppercase shrink-0">
                  {{ formatDate(event.date) }}
                </span>
              </div>

              <div class="flex items-center gap-3">
                <p class="text-sm font-body tracking-wide text-muted uppercase">
                  {{ event.location }}
                </p>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </div>
</template>
