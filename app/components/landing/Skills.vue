<script setup lang="ts">
const { t, locale } = useI18n()

const props = defineProps<{
  categories: any[] | null
}>()
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">
    
    <div class="editorial-divider mb-12"></div>

    <div class="flex flex-col md:flex-row gap-12">
      <!-- Title Area -->
      <div class="md:w-1/3">
        <ScrollReveal>
          <span class="text-[10px] font-body uppercase tracking-[0.2em] text-muted mb-4 block">
            06 / Expertise
          </span>
          <h2 class="font-display font-medium text-4xl sm:text-5xl tracking-tighter text-primary uppercase">
            {{ t('skills.title') }}
          </h2>
        </ScrollReveal>
      </div>

      <!-- Skills Grid -->
      <div class="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
        <ScrollReveal
          v-for="(category, index) in categories || []"
          :key="category.id || index"
          :delay="100 * index"
        >
          <div class="flex flex-col group cursor-default">
            <div class="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
              <UIcon v-if="category.icon" :name="category.icon" class="size-6 text-muted group-hover:text-primary transition-colors duration-300" />
              <h3 class="font-display text-xl uppercase tracking-tight text-primary">
                {{ locale === 'tr' && category.titleTr ? category.titleTr : category.titleEn }}
              </h3>
            </div>

            <ul class="flex flex-col gap-3">
              <li
                v-for="item in category.items"
                :key="item.id || item.name"
                class="text-sm font-body tracking-wide text-muted group-hover:text-primary/80 transition-colors duration-300 flex items-center gap-2"
              >
                <span class="size-1 bg-white/20 rounded-full group-hover:bg-white/60 transition-colors"></span>
                {{ item.name || item }}
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </div>
    
  </div>
</template>
