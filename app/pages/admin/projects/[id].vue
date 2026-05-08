<script setup lang="ts">
definePageMeta({
  middleware: ['admin']
})

const route = useRoute()
const { data: projects } = await useFetch('/api/projects')
const project = computed(() => projects.value?.find((p: any) => p.id === Number(route.params.id)))
</script>

<template>
  <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6">
    <div class="mb-8">
      <h1 class="font-display text-3xl text-primary tracking-tight uppercase">Edit Project</h1>
    </div>
    
    <div v-if="project" class="glass-panel p-6 sm:p-8">
      <AdminProjectForm
        :data="project"
        @saved="navigateTo('/projects')"
        @cancel="navigateTo('/projects')"
      />
    </div>
    <div v-else class="text-white/50 py-12 text-center">
      Project not found.
    </div>
  </div>
</template>
