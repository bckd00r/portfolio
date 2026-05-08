<script setup lang="ts">
const emit = defineEmits<{
  confirm: []
}>()

const showConfirm = ref(false)

const handleClick = () => {
  if (showConfirm.value) {
    emit('confirm')
    showConfirm.value = false
  } else {
    showConfirm.value = true
    setTimeout(() => { showConfirm.value = false }, 3000)
  }
}
</script>

<template>
  <button
    class="absolute top-2 right-12 z-30 size-8 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer"
    :class="showConfirm
      ? 'bg-red-500/30 border-red-500/40 hover:bg-red-500/50'
      : 'bg-white/10 backdrop-blur-sm border-white/10 hover:bg-white/20'"
    @click.stop="handleClick"
  >
    <UIcon
      :name="showConfirm ? 'i-lucide-check' : 'i-lucide-trash-2'"
      class="size-3.5"
      :class="showConfirm ? 'text-red-400' : 'text-white/70'"
    />
  </button>
</template>
