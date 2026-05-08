<script setup lang="ts">
const { t, locale } = useI18n()
const { loggedIn } = useUserSession()

const { data: projects, refresh } = await useFetch('/api/projects')

useSeoMeta({
  title: t('pages.projects.title'),
  ogTitle: t('pages.projects.title'),
  description: t('pages.projects.description'),
  ogDescription: t('pages.projects.description')
})

const deleteProject = async (id: number) => {
  if (confirm('Emin misiniz?')) {
    await $fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
    refresh()
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-32 relative">
    <AdminAddButton v-if="loggedIn" class="absolute top-10 right-4 sm:right-6" @click="navigateTo('/admin/projects/new')" />
    
    <!-- Header -->
    <div class="mb-20">
      <ScrollReveal>
        <div class="flex items-center gap-4 mb-8">
          <span class="text-xs font-body uppercase tracking-[0.2em] text-muted">
            02 / Work
          </span>
          <div class="h-px w-12 bg-white/10"></div>
        </div>
        
        <h1 class="font-display font-medium text-4xl sm:text-6xl tracking-tighter text-primary uppercase leading-none mb-6">
          {{ t('pages.projects.title') }}
        </h1>
        
        <p class="text-sm font-body tracking-widest text-muted uppercase">
          {{ t('pages.projects.description') }}
        </p>
      </ScrollReveal>
    </div>

    <!-- Projects Grid -->
    <div v-if="projects && projects.length" class="flex flex-col gap-16 md:gap-24">
      <ScrollReveal
        v-for="(project, index) in projects"
        :key="project.id"
        :delay="index * 100"
      >
        <div class="group flex flex-col md:flex-row gap-8 md:gap-12 items-start relative">
          
          <div v-if="loggedIn" class="absolute -top-10 right-0 flex items-center gap-2 z-10">
            <AdminEditButton @click="navigateTo(`/admin/projects/${project.id}`)" />
            <AdminDeleteButton @click="deleteProject(project.id)" />
          </div>

          <!-- Image -->
          <div class="w-full md:w-1/2 shrink-0 aspect-[4/3] overflow-hidden relative">
            <img
              v-if="project.image"
              :src="project.image"
              :alt="locale === 'tr' && project.titleTr ? project.titleTr : project.titleEn"
              class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
            >
            <div v-else class="w-full h-full bg-white/5"></div>
            <div class="absolute inset-0 border border-white/10 pointer-events-none transition-colors duration-500 group-hover:border-white/20"></div>
          </div>

          <!-- Content -->
          <div class="w-full md:w-1/2 flex flex-col justify-center h-full pt-4 md:pt-8">
            <h3 class="font-display text-2xl md:text-3xl text-primary tracking-tight mb-4 uppercase">
              {{ locale === 'tr' && project.titleTr ? project.titleTr : project.titleEn }}
            </h3>
            
            <p class="text-sm sm:text-base font-body text-muted leading-relaxed mb-8 max-w-md">
              {{ locale === 'tr' && project.descriptionTr ? project.descriptionTr : project.descriptionEn }}
            </p>
            
            <!-- Tags -->
            <div class="flex flex-wrap gap-4 mt-auto">
              <span
                v-for="tag in (typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags)"
                :key="tag"
                class="text-xs font-body tracking-widest text-muted uppercase"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
        </div>
      </ScrollReveal>
    </div>
  </div>
</template>
