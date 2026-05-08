<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'

const props = defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editor = useEditor({
  content: props.modelValue || '',
  extensions: [
    StarterKit.configure({
      heading: { levels: [2, 3, 4] }
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: { class: 'tiptap-link' }
    }),
    Image.configure({
      HTMLAttributes: { class: 'tiptap-image' }
    }),
    Placeholder.configure({
      placeholder: props.placeholder || 'İçerik yaz...'
    })
  ],
  editorProps: {
    attributes: {
      class: 'rich-text min-h-[200px] px-4 py-3 focus:outline-none'
    }
  },
  onUpdate: ({ editor: ed }) => {
    emit('update:modelValue', ed.getHTML())
  }
})

watch(() => props.modelValue, (val) => {
  if (editor.value && val !== editor.value.getHTML()) {
    editor.value.commands.setContent(val || '', false)
  }
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

const setLink = () => {
  const previousUrl = editor.value?.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)
  if (url === null) return
  if (url === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

const fileInput = ref<HTMLInputElement | null>(null)
const isUploadingImage = ref(false)

const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  isUploadingImage.value = true
  try {
    const formData = new FormData()
    formData.append('file', file)

    const result = await $fetch<{ url: string }>('/api/admin/upload', {
      method: 'POST',
      body: formData
    })

    if (result.url) {
      editor.value?.chain().focus().setImage({ src: result.url }).run()
    }
  } catch (error) {
    console.error('Image upload failed:', error)
    alert('Görsel yüklenemedi.')
  } finally {
    isUploadingImage.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}
</script>

<template>
  <div class="tiptap-editor border border-white/10 rounded-lg overflow-hidden bg-white/[0.02]">
    <input
      ref="fileInput"
      type="file"
      accept="image/jpeg,image/png,image/webp,image/gif"
      class="hidden"
      @change="handleImageUpload"
    />
    <!-- Toolbar -->
    <div v-if="editor" class="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-white/10 bg-white/[0.03]">
      <!-- Text Formatting -->
      <button
        type="button"
        class="tiptap-btn"
        :class="{ 'tiptap-btn-active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <UIcon name="i-lucide-bold" class="size-4" />
      </button>
      <button
        type="button"
        class="tiptap-btn"
        :class="{ 'tiptap-btn-active': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <UIcon name="i-lucide-italic" class="size-4" />
      </button>
      <button
        type="button"
        class="tiptap-btn"
        :class="{ 'tiptap-btn-active': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <UIcon name="i-lucide-strikethrough" class="size-4" />
      </button>
      <button
        type="button"
        class="tiptap-btn"
        :class="{ 'tiptap-btn-active': editor.isActive('code') }"
        @click="editor.chain().focus().toggleCode().run()"
      >
        <UIcon name="i-lucide-code" class="size-4" />
      </button>

      <div class="w-px h-5 bg-white/10 mx-1.5" />

      <!-- Headings -->
      <button
        type="button"
        class="tiptap-btn"
        :class="{ 'tiptap-btn-active': editor.isActive('heading', { level: 2 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <span class="text-[11px] font-bold">H2</span>
      </button>
      <button
        type="button"
        class="tiptap-btn"
        :class="{ 'tiptap-btn-active': editor.isActive('heading', { level: 3 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        <span class="text-[11px] font-bold">H3</span>
      </button>

      <div class="w-px h-5 bg-white/10 mx-1.5" />

      <!-- Lists -->
      <button
        type="button"
        class="tiptap-btn"
        :class="{ 'tiptap-btn-active': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <UIcon name="i-lucide-list" class="size-4" />
      </button>
      <button
        type="button"
        class="tiptap-btn"
        :class="{ 'tiptap-btn-active': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <UIcon name="i-lucide-list-ordered" class="size-4" />
      </button>

      <div class="w-px h-5 bg-white/10 mx-1.5" />

      <!-- Block Elements -->
      <button
        type="button"
        class="tiptap-btn"
        :class="{ 'tiptap-btn-active': editor.isActive('blockquote') }"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <UIcon name="i-lucide-quote" class="size-4" />
      </button>
      <button
        type="button"
        class="tiptap-btn"
        :class="{ 'tiptap-btn-active': editor.isActive('codeBlock') }"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        <UIcon name="i-lucide-file-code" class="size-4" />
      </button>
      <button
        type="button"
        class="tiptap-btn"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        <UIcon name="i-lucide-minus" class="size-4" />
      </button>

      <div class="w-px h-5 bg-white/10 mx-1.5" />

      <!-- Link & Image -->
      <button
        type="button"
        class="tiptap-btn"
        :class="{ 'tiptap-btn-active': editor.isActive('link') }"
        @click="setLink"
      >
        <UIcon name="i-lucide-link" class="size-4" />
      </button>
      <button
        type="button"
        class="tiptap-btn relative"
        :disabled="isUploadingImage"
        @click="fileInput?.click()"
      >
        <UIcon v-if="isUploadingImage" name="i-lucide-loader-2" class="size-4 animate-spin" />
        <UIcon v-else name="i-lucide-image" class="size-4" />
      </button>

      <div class="flex-1" />

      <!-- Undo/Redo -->
      <button
        type="button"
        class="tiptap-btn"
        :disabled="!editor.can().undo()"
        @click="editor.chain().focus().undo().run()"
      >
        <UIcon name="i-lucide-undo-2" class="size-4" />
      </button>
      <button
        type="button"
        class="tiptap-btn"
        :disabled="!editor.can().redo()"
        @click="editor.chain().focus().redo().run()"
      >
        <UIcon name="i-lucide-redo-2" class="size-4" />
      </button>
    </div>

    <!-- Editor Content -->
    <EditorContent :editor="editor" />
  </div>
</template>

<style scoped>
@reference "../../assets/css/main.css";

.tiptap-btn {
  @apply size-8 rounded flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed;
}
.tiptap-btn-active {
  @apply text-white bg-white/15;
}
.rich-text p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  @apply text-white/20 float-left h-0 pointer-events-none;
}
</style>
