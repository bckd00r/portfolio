<script setup lang="ts">
const props = defineProps<{
  data?: any
}>()

const emit = defineEmits<{
  saved: []
  cancel: []
}>()

const isSaving = ref(false)

const form = reactive({
  contentEn: props.data?.contentEn || '',
  contentTr: props.data?.contentTr || '',
  profileImage: props.data?.profileImage || ''
})

const save = async () => {
  isSaving.value = true
  try {
    await $fetch('/api/admin/about', {
      method: 'PUT',
      body: form
    })
    emit('saved')
  } catch (error) {
    console.error('Save failed:', error)
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="save">
    <!-- Image -->
    <AdminImageUpload v-model="form.profileImage" label="Profile Image" />

    <!-- Content TR (TipTap) -->
    <div>
      <div class="flex items-center justify-between mb-2">
        <label class="text-xs font-body uppercase tracking-[0.15em] text-white/40">İçerik</label>
        <div class="flex items-center gap-2">
          <span v-if="form.contentEn" class="text-[10px] text-emerald-500/80 uppercase tracking-widest">✓ EN</span>
          <AdminTranslateButton :text="form.contentTr" from="tr" to="en" @translated="form.contentEn = $event" />
        </div>
      </div>
      <ClientOnly>
        <AdminTipTapEditor v-model="form.contentTr" placeholder="Kendinizden bahsedin..." />
      </ClientOnly>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
      <button
        type="button"
        class="px-6 py-2.5 text-xs font-body uppercase tracking-[0.15em] text-white/40 hover:text-white/70 transition-colors"
        @click="emit('cancel')"
      >
        İptal
      </button>
      <button
        type="submit"
        class="px-6 py-2.5 bg-white text-black text-xs font-body uppercase tracking-[0.15em] hover:bg-white/90 transition-colors disabled:opacity-50"
        :disabled="isSaving"
      >
        {{ isSaving ? 'Kaydediliyor...' : 'Güncelle' }}
      </button>
    </div>
  </form>
</template>
