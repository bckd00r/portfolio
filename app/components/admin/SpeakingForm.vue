<script setup lang="ts">
const props = defineProps<{
  data?: any
}>()

const emit = defineEmits<{
  saved: []
  cancel: []
}>()

const isEdit = computed(() => !!props.data?.id)
const isSaving = ref(false)

const form = reactive({
  category: props.data?.category || 'Talk',
  titleEn: props.data?.titleEn || '',
  titleTr: props.data?.titleTr || '',
  date: props.data?.date || new Date().toISOString().split('T')[0],
  locationEn: props.data?.locationEn || '',
  locationTr: props.data?.locationTr || '',
  url: props.data?.url || '',
  sortOrder: props.data?.sortOrder || 0
})

const save = async () => {
  isSaving.value = true
  try {
    if (isEdit.value) {
      await $fetch(`/api/admin/speaking/${props.data.id}`, {
        method: 'PUT',
        body: form
      })
    } else {
      await $fetch('/api/admin/speaking', {
        method: 'POST',
        body: form
      })
    }
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
    <!-- Category -->
    <div>
      <label class="text-xs font-body uppercase tracking-[0.15em] text-white/40 block mb-2">Category</label>
      <select
        v-model="form.category"
        class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-body text-white/80 focus:outline-none focus:border-white/25 appearance-none"
      >
        <option value="Talk">Talk</option>
        <option value="Workshop">Workshop</option>
        <option value="Panel">Panel</option>
      </select>
    </div>

    <!-- Title TR -->
    <div>
      <div class="flex items-center justify-between mb-2">
        <label class="text-xs font-body uppercase tracking-[0.15em] text-white/40">Başlık</label>
        <div class="flex items-center gap-2">
          <span v-if="form.titleEn" class="text-[10px] text-emerald-500/80 uppercase tracking-widest">✓ EN</span>
          <AdminTranslateButton :text="form.titleTr" from="tr" to="en" @translated="form.titleEn = $event" />
        </div>
      </div>
      <input
        v-model="form.titleTr"
        type="text"
        class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-body text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/25"
        placeholder="Etkinlik başlığı"
      />
    </div>

    <!-- Location TR -->
    <div>
      <div class="flex items-center justify-between mb-2">
        <label class="text-xs font-body uppercase tracking-[0.15em] text-white/40">Konum</label>
        <div class="flex items-center gap-2">
          <span v-if="form.locationEn" class="text-[10px] text-emerald-500/80 uppercase tracking-widest">✓ EN</span>
          <AdminTranslateButton :text="form.locationTr" from="tr" to="en" @translated="form.locationEn = $event" />
        </div>
      </div>
      <input
        v-model="form.locationTr"
        type="text"
        class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-body text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/25"
        placeholder="İstanbul, Türkiye"
      />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <!-- Date -->
      <div>
        <label class="text-xs font-body uppercase tracking-[0.15em] text-white/40 block mb-2">Date</label>
        <input
          v-model="form.date"
          type="date"
          class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-body text-white/80 focus:outline-none focus:border-white/25"
        />
      </div>

      <!-- Sort Order -->
      <div>
        <label class="text-xs font-body uppercase tracking-[0.15em] text-white/40 block mb-2">Sort Order</label>
        <input
          v-model.number="form.sortOrder"
          type="number"
          class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-body text-white/80 focus:outline-none focus:border-white/25"
        />
      </div>
    </div>

    <!-- URL -->
    <div>
      <label class="text-xs font-body uppercase tracking-[0.15em] text-white/40 block mb-2">Event URL</label>
      <input
        v-model="form.url"
        type="text"
        class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-body text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/25"
        placeholder="https://..."
      />
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
        {{ isSaving ? 'Kaydediliyor...' : (isEdit ? 'Güncelle' : 'Oluştur') }}
      </button>
    </div>
  </form>
</template>
