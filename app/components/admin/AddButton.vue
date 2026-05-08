<script setup lang="ts">
defineProps<{
  label?: string
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    class="group/add w-full py-6 border border-dashed border-white/10 hover:border-white/25 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white/[0.02] cursor-pointer"
    @click="$emit('click')"
  >
    <div class="size-8 rounded-full bg-white/5 flex items-center justify-center group-hover/add:bg-white/10 transition-colors">
      <UIcon name="i-lucide-plus" class="size-4 text-white/40 group-hover/add:text-white/70 transition-colors" />
    </div>
    <span class="text-xs font-body uppercase tracking-[0.2em] text-white/30 group-hover/add:text-white/50 transition-colors">
      {{ label || 'Yeni Ekle' }}
    </span>
  </button>
</template>
