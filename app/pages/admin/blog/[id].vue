<script setup lang="ts">
definePageMeta({
  middleware: ['admin']
})

const route = useRoute()
const { data: posts } = await useFetch('/api/blog')
const post = computed(() => posts.value?.find((p: any) => p.id === Number(route.params.id)))
</script>

<template>
  <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6">
    <div class="mb-8">
      <h1 class="font-display text-3xl text-primary tracking-tight uppercase">Edit Blog Post</h1>
    </div>
    
    <div v-if="post" class="glass-panel p-6 sm:p-8">
      <AdminBlogForm
        :data="post"
        @saved="navigateTo('/blog')"
        @cancel="navigateTo('/blog')"
      />
    </div>
    <div v-else class="text-white/50 py-12 text-center">
      Post not found.
    </div>
  </div>
</template>
