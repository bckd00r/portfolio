<script setup lang="ts">
const { t, locale } = useI18n()
const { loggedIn } = useUserSession()

const { data: aboutData } = await useFetch('/api/about')

const { global } = useAppConfig()

useSeoMeta({
  title: t('pages.about.title'),
  ogTitle: t('pages.about.title'),
  description: t('pages.about.description'),
  ogDescription: t('pages.about.description')
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-32 relative">
    <AdminEditButton v-if="loggedIn" class="absolute top-10 right-4 sm:right-6" @click="navigateTo('/admin/about')" />
    
    <!-- Header -->
    <div class="mb-20">
      <ScrollReveal>
        <div class="flex items-center gap-4 mb-8">
          <span class="text-xs font-body uppercase tracking-[0.2em] text-muted">
            01 / Profile
          </span>
          <div class="h-px w-12 bg-white/10"></div>
        </div>
        
        <h1 class="font-display font-medium text-4xl sm:text-6xl tracking-tighter text-primary uppercase leading-none mb-6">
          {{ t('pages.about.title') }}
        </h1>
        
        <p class="text-sm font-body tracking-widest text-muted uppercase">
          {{ t('pages.about.description') }}
        </p>
      </ScrollReveal>
    </div>

    <!-- Content -->
    <div class="flex flex-col md:flex-row gap-12 md:gap-24">
      <div class="md:w-1/3 shrink-0">
        <ScrollReveal :delay="200">
          <div class="aspect-[3/4] overflow-hidden relative group max-w-[240px]">
            <NuxtImg
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
              :src="aboutData?.profileImage || global.picture?.dark!"
              :alt="global.picture?.alt!"
              sizes="sm:100vw md:50vw lg:300px"
            />
            <div class="absolute inset-0 border border-white/10 pointer-events-none"></div>
          </div>
        </ScrollReveal>
      </div>

      <div class="md:w-2/3">
        <ScrollReveal :delay="400">
          <!-- Minimalist Prose -->
          <div class="prose prose-invert max-w-none 
                      prose-p:font-body prose-p:text-muted/90 prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base prose-p:mb-6
                      prose-headings:font-display prose-headings:font-medium prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-primary
                      prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-a:decoration-white/30 hover:prose-a:decoration-white
                      prose-strong:text-primary prose-strong:font-medium"
            v-html="locale === 'tr' && aboutData?.contentTr ? aboutData.contentTr : (aboutData?.contentEn || '')"
          />
        </ScrollReveal>
      </div>
    </div>
  </div>
</template>
