<script setup lang="ts">
const { t, locale } = useI18n()
const { loggedIn } = useUserSession()

const { data: events, refresh } = await useFetch('/api/speaking')

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

type SpeakingEvent = {
  id: number
  category: string
  titleEn: string
  titleTr: string
  date: string
  locationEn: string
  locationTr: string
  url: string
}

const groupedEvents = computed(() => {
  const items = (events.value || []) as SpeakingEvent[]
  const grouped: Record<string, SpeakingEvent[]> = {
    'Conference': [],
    'Live talk': [],
    'Podcast': []
  }
  for (const event of items) {
    if (grouped[event.category]) grouped[event.category].push(event)
    else grouped[event.category] = [event]
  }
  return grouped
})

function formatDate(dateString: string): string {
  const loc = locale.value === 'tr' ? 'tr-TR' : 'en-US'
  return new Date(dateString).toLocaleDateString(loc, { year: 'numeric', month: 'long' })
}

const deleteEvent = async (id: number) => {
  if (confirm('Emin misiniz?')) {
    await $fetch(`/api/admin/speaking/${id}`, { method: 'DELETE' })
    refresh()
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-32 relative">
    <AdminAddButton v-if="loggedIn" class="absolute top-10 right-4 sm:right-6" @click="navigateTo('/admin/speaking/new')" />
    
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
            :key="event.id"
            :delay="index * 100"
          >
            <div class="group relative py-8 border-b border-white/10 last:border-transparent hover:bg-white/[0.02] transition-colors duration-500 px-4 md:px-6 -mx-4 md:-mx-6 cursor-default">
              
              <div v-if="loggedIn" class="absolute top-2 right-4 flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <AdminEditButton @click="navigateTo(`/admin/speaking/${event.id}`)" />
                <AdminDeleteButton @click="deleteEvent(event.id)" />
              </div>

              <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-2 mt-2">
                <h3 class="font-display text-xl md:text-2xl text-primary transition-colors">
                  {{ locale === 'tr' && event.titleTr ? event.titleTr : event.titleEn }}
                </h3>
                <span v-if="event.date" class="text-xs font-body tracking-widest text-muted uppercase shrink-0">
                  {{ formatDate(event.date) }}
                </span>
              </div>

              <div class="flex items-center gap-3">
                <p class="text-sm font-body tracking-wide text-muted uppercase">
                  {{ locale === 'tr' && event.locationTr ? event.locationTr : event.locationEn }}
                </p>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </div>
</template>
