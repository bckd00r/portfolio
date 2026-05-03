<script setup lang="ts">
const route = useRoute()
const isFullpage = computed(() => route.path === '/')
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Gradient mesh background -->
    <div class="gradient-mesh" />

    <!-- Header is always visible (z-50) -->
    <AppHeader />

    <!-- Main content -->
    <UContainer v-if="!isFullpage" class="relative z-1 pt-20">
      <slot />
      <AppFooter />
    </UContainer>

    <!-- Fullpage mode: slot renders fixed overlay, no container needed -->
    <template v-else>
      <slot />
    </template>
  </div>
</template>
