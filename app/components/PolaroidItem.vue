<script setup lang="ts">
defineProps<{
  image: {
    src: string
    alt: string
  }
  index: number
}>()
</script>

<template>
  <div class="glass-panel p-2.5 flex flex-col">
    <img
      :src="image.src"
      :alt="image.alt"
      class="size-36 object-cover rounded-lg"
    >
    <span class="w-36 text-xs text-muted font-medium text-center mt-2">
      {{ image.alt }}
    </span>
  </div>
</template>
