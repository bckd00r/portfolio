<script setup lang="ts">
definePageMeta({
  middleware: ['admin']
})

const route = useRoute()
const { data: events } = await useFetch('/api/speaking')
const event = computed(() => events.value?.find((e: any) => e.id === Number(route.params.id)))
</script>

<template>
  <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6">
    <div class="mb-8">
      <h1 class="font-display text-3xl text-primary tracking-tight uppercase">Edit Event</h1>
    </div>
    
    <div v-if="event" class="glass-panel p-6 sm:p-8">
      <AdminSpeakingForm
        :data="event"
        @saved="navigateTo('/speaking')"
        @cancel="navigateTo('/speaking')"
      />
    </div>
    <div v-else class="text-white/50 py-12 text-center">
      Event not found.
    </div>
  </div>
</template>
