<script setup lang="ts">
definePageMeta({
  middleware: ['admin']
})
</script>

<template>
  <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6">
    <div class="mb-8">
      <h1 class="font-display text-3xl text-primary tracking-tight uppercase">New Event</h1>
    </div>
    
    <div class="glass-panel p-6 sm:p-8">
      <AdminSpeakingForm
        @saved="navigateTo('/speaking')"
        @cancel="navigateTo('/speaking')"
      />
    </div>
  </div>
</template>
