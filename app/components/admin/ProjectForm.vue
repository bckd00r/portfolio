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
  titleEn: props.data?.titleEn || '',
  titleTr: props.data?.titleTr || '',
  descriptionEn: props.data?.descriptionEn || '',
  descriptionTr: props.data?.descriptionTr || '',
  image: props.data?.image || '',
  url: props.data?.url || '',
  tags: props.data?.tags || '[]',
  sortOrder: props.data?.sortOrder || 0
})

const tagList = computed({
  get: () => {
    try { return JSON.parse(form.tags) }
    catch { return [] }
  },
  set: (val: string[]) => { form.tags = JSON.stringify(val) }
})

const newTag = ref('')
const addTag = () => {
  if (newTag.value.trim()) {
    const tags = tagList.value
    tags.push(newTag.value.trim())
    tagList.value = tags
    newTag.value = ''
  }
}
const removeTag = (index: number) => {
  const tags = tagList.value
  tags.splice(index, 1)
  tagList.value = tags
}

const save = async () => {
  isSaving.value = true
  try {
    if (isEdit.value) {
      await $fetch(`/api/admin/projects/${props.data.id}`, {
        method: 'PUT',
        body: form
      })
    } else {
      await $fetch('/api/admin/projects', {
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
        placeholder="Proje başlığı"
      />
    </div>

    <!-- Description TR -->
    <div>
      <div class="flex items-center justify-between mb-2">
        <label class="text-xs font-body uppercase tracking-[0.15em] text-white/40">Açıklama</label>
        <div class="flex items-center gap-2">
          <span v-if="form.descriptionEn" class="text-[10px] text-emerald-500/80 uppercase tracking-widest">✓ EN</span>
          <AdminTranslateButton :text="form.descriptionTr" from="tr" to="en" @translated="form.descriptionEn = $event" />
        </div>
      </div>
      <textarea
        v-model="form.descriptionTr"
        rows="3"
        class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-body text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/25 resize-none"
        placeholder="Proje açıklaması..."
      />
    </div>

    <!-- Image -->
    <AdminImageUpload v-model="form.image" label="Project Image" />

    <!-- URL -->
    <div>
      <label class="text-xs font-body uppercase tracking-[0.15em] text-white/40 block mb-2">Project URL</label>
      <input
        v-model="form.url"
        type="text"
        class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-body text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/25"
        placeholder="https://..."
      />
    </div>

    <!-- Tags -->
    <div>
      <label class="text-xs font-body uppercase tracking-[0.15em] text-white/40 block mb-2">Tags</label>
      <div class="flex flex-wrap gap-2 mb-3">
        <span
          v-for="(tag, i) in tagList"
          :key="i"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded text-xs font-body text-white/60"
        >
          {{ tag }}
          <button type="button" class="text-white/30 hover:text-red-400 transition-colors" @click="removeTag(i)">×</button>
        </span>
      </div>
      <div class="flex gap-2">
        <input
          v-model="newTag"
          type="text"
          class="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs font-body text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/25"
          placeholder="Tag ekle..."
          @keydown.enter.prevent="addTag"
        />
        <button
          type="button"
          class="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-body text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors"
          @click="addTag"
        >
          Ekle
        </button>
      </div>
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
