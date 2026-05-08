<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  label?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isUploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  isUploading.value = true
  try {
    const formData = new FormData()
    formData.append('file', file)

    const result = await $fetch<{ url: string }>('/api/admin/upload', {
      method: 'POST',
      body: formData
    })

    emit('update:modelValue', result.url)
  } catch (error) {
    console.error('Upload failed:', error)
  } finally {
    isUploading.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}
</script>

<template>
  <div>
    <label v-if="label" class="text-xs font-body uppercase tracking-[0.15em] text-white/40 block mb-2">
      {{ label }}
    </label>
    <div class="flex gap-3 items-end">
      <!-- Preview -->
      <div
        v-if="modelValue"
        class="size-16 rounded-lg overflow-hidden border border-white/10 shrink-0"
      >
        <img :src="modelValue" class="w-full h-full object-cover" alt="" />
      </div>

      <!-- Upload area -->
      <div class="flex-1 flex flex-col gap-2">
        <input
          ref="fileInput"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          class="hidden"
          @change="handleFileSelect"
        />
        <button
          type="button"
          class="w-full py-3 border border-dashed border-white/15 rounded-lg flex items-center justify-center gap-2 text-xs font-body uppercase tracking-[0.15em] text-white/30 hover:text-white/50 hover:border-white/25 transition-all disabled:opacity-30"
          :disabled="isUploading"
          @click="fileInput?.click()"
        >
          <UIcon
            :name="isUploading ? 'i-lucide-loader-2' : 'i-lucide-upload'"
            class="size-4"
            :class="isUploading ? 'animate-spin' : ''"
          />
          {{ isUploading ? 'Yükleniyor...' : 'Resim Yükle' }}
        </button>
        <!-- URL input fallback -->
        <input
          :value="modelValue"
          type="text"
          placeholder="/uploads/... veya URL"
          class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-body text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/20"
          @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
  </div>
</template>
