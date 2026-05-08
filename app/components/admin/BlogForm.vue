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
  slug: props.data?.slug || '',
  titleEn: props.data?.titleEn || '',
  titleTr: props.data?.titleTr || '',
  descriptionEn: props.data?.descriptionEn || '',
  descriptionTr: props.data?.descriptionTr || '',
  bodyEn: props.data?.bodyEn || '',
  bodyTr: props.data?.bodyTr || '',
  image: props.data?.image || '',
  date: props.data?.date || new Date().toISOString().split('T')[0],
  minRead: props.data?.minRead || 5,
  published: props.data?.published ?? true,
  authorName: props.data?.authorName || 'Mustafa Barış Göktepe',
  authorAvatar: props.data?.authorAvatar || '/profile.jpeg'
})

const autoSlug = () => {
  if (!isEdit.value && form.titleTr) {
    form.slug = form.titleTr
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
}

const save = async () => {
  isSaving.value = true
  try {
    if (isEdit.value) {
      await $fetch(`/api/admin/blog/${props.data.id}`, {
        method: 'PUT',
        body: form
      })
    } else {
      await $fetch('/api/admin/blog', {
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
    <!-- Slug -->
    <div>
      <label class="text-xs font-body uppercase tracking-[0.15em] text-white/40 block mb-2">Slug</label>
      <input
        v-model="form.slug"
        type="text"
        class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-body text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/25"
        placeholder="blog-post-slug"
      />
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
        placeholder="Blog yazı başlığı"
        @blur="autoSlug"
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
        rows="2"
        class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-body text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/25 resize-none"
        placeholder="Kısa açıklama..."
      />
    </div>

    <!-- Body TR (TipTap) -->
    <div>
      <div class="flex items-center justify-between mb-2">
        <label class="text-xs font-body uppercase tracking-[0.15em] text-white/40">İçerik</label>
        <div class="flex items-center gap-2">
          <span v-if="form.bodyEn" class="text-[10px] text-emerald-500/80 uppercase tracking-widest">✓ EN</span>
          <AdminTranslateButton :text="form.bodyTr" from="tr" to="en" @translated="form.bodyEn = $event" />
        </div>
      </div>
      <ClientOnly>
        <AdminTipTapEditor v-model="form.bodyTr" placeholder="Blog yazınızı yazın..." />
      </ClientOnly>
    </div>

    <!-- Image Upload -->
    <AdminImageUpload v-model="form.image" label="Cover Image" />

    <!-- Meta -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="text-xs font-body uppercase tracking-[0.15em] text-white/40 block mb-2">Date</label>
        <input
          v-model="form.date"
          type="date"
          class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-body text-white/80 focus:outline-none focus:border-white/25"
        />
      </div>
      <div>
        <label class="text-xs font-body uppercase tracking-[0.15em] text-white/40 block mb-2">Min Read</label>
        <input
          v-model.number="form.minRead"
          type="number"
          min="1"
          class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm font-body text-white/80 focus:outline-none focus:border-white/25"
        />
      </div>
    </div>

    <!-- Published toggle -->
    <label class="flex items-center gap-3 cursor-pointer">
      <input v-model="form.published" type="checkbox" class="sr-only peer" />
      <div class="w-10 h-5 rounded-full bg-white/10 peer-checked:bg-emerald-500/40 transition-colors relative">
        <div class="absolute top-0.5 left-0.5 size-4 rounded-full bg-white/50 peer-checked:translate-x-5 transition-transform" />
      </div>
      <span class="text-xs font-body uppercase tracking-[0.15em] text-white/40">Published</span>
    </label>

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
