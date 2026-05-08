<script setup lang="ts">
const props = defineProps<{
  text: string
  from: 'en' | 'tr'
  to: 'en' | 'tr'
  loading?: boolean
}>()

const emit = defineEmits<{
  translated: [text: string]
}>()

const isLoading = ref(false)

const handleTranslate = async () => {
  if (!props.text || props.text.trim() === '') return
  isLoading.value = true

  try {
    const result = await $fetch('/api/admin/translate', {
      method: 'POST',
      body: { text: props.text, from: props.from, to: props.to }
    })
    emit('translated', result.translated)
  } catch (error) {
    console.error('Translation failed:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center gap-1.5 text-[10px] font-body uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors duration-300 disabled:opacity-30"
    :disabled="isLoading || !text"
    @click="handleTranslate"
  >
    <UIcon
      :name="isLoading ? 'i-lucide-loader-2' : 'i-lucide-languages'"
      class="size-3.5"
      :class="isLoading ? 'animate-spin' : ''"
    />
    <span>{{ from === 'en' ? 'EN → TR' : 'TR → EN' }}</span>
  </button>
</template>
