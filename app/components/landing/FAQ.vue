<script setup lang="ts">
const { t, locale } = useI18n()

const props = defineProps<{
  categories: any[] | null
}>()

const activeCategory = ref(0)
const openIndex = ref(-1)

watch(activeCategory, () => {
  openIndex.value = -1 // reset open state when category changes
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">
    
    <div class="editorial-divider mb-12"></div>
    
    <div class="flex flex-col md:flex-row gap-12">
      <!-- Title & Categories -->
      <div class="md:w-1/3">
        <ScrollReveal>
          <span class="text-[10px] font-body uppercase tracking-[0.2em] text-muted mb-4 block">
            07 / FAQ
          </span>
          <h2 class="font-display font-medium text-4xl sm:text-5xl tracking-tighter text-primary uppercase mb-8">
            {{ t('faq.title') }}
          </h2>
          <p class="text-sm font-body text-muted mb-12">
            {{ t('faq.description') }}
          </p>

          <!-- Minimal Category Tabs -->
          <div v-if="categories && categories.length" class="flex flex-col gap-4 border-l border-white/10 pl-6">
            <button
              v-for="(cat, i) in categories"
              :key="cat.id || i"
              class="text-left font-body uppercase tracking-widest text-xs transition-colors duration-300 py-3 min-h-[44px] flex items-center"
              :class="activeCategory === i ? 'text-primary' : 'text-muted hover:text-primary/70'"
              @click="activeCategory = i"
            >
              {{ locale === 'tr' && cat.titleTr ? cat.titleTr : cat.titleEn }}
            </button>
          </div>
        </ScrollReveal>
      </div>

      <!-- Accordion Questions -->
      <div class="md:w-2/3">
        <div v-if="categories && categories.length" class="flex flex-col">
          <div
            v-for="(item, index) in categories[activeCategory]?.questions || []"
            :key="item.id || index"
            class="group transition-colors duration-300 border-b border-white/10 last:border-transparent"
          >
            <button
              class="w-full text-left py-6 flex items-center justify-between cursor-pointer focus:outline-none"
              @click="openIndex = openIndex === index ? -1 : index"
            >
              <h3 
                class="font-display text-lg md:text-xl transition-colors duration-300 pr-8"
                :class="openIndex === index ? 'text-primary' : 'text-muted group-hover:text-primary'"
              >
                {{ locale === 'tr' && item.questionTr ? item.questionTr : item.questionEn }}
              </h3>
              <span
                class="transition-transform duration-300 shrink-0 text-muted"
                :class="openIndex === index ? 'rotate-45' : ''"
              >
                <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </button>
            <div
              class="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              :style="{
                maxHeight: openIndex === index ? '500px' : '0px',
                opacity: openIndex === index ? 1 : 0
              }"
            >
              <div class="pb-8 text-sm md:text-base font-body text-muted/80 leading-relaxed max-w-2xl">
                {{ locale === 'tr' && item.answerTr ? item.answerTr : item.answerEn }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
