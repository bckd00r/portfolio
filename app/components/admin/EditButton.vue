<script setup lang="ts">
defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    class="absolute top-2 right-2 z-30 size-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 cursor-pointer"
    @click.stop="$emit('click')"
  >
    <UIcon name="i-lucide-pencil" class="size-3.5 text-white/70" />
  </button>
</template>
