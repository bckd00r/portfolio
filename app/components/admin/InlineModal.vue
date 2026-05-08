<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const close = () => emit('update:modelValue', false)

const maxWidthClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'max-w-md'
    case 'lg': return 'max-w-3xl'
    default: return 'max-w-xl'
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[200] flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/70 backdrop-blur-sm"
          @click="close"
        />

        <!-- Modal Panel -->
        <div
          :class="[
            'relative w-full glass-panel border border-white/10 rounded-xl shadow-2xl max-h-[85vh] flex flex-col',
            maxWidthClass
          ]"
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
            <h3 class="font-display text-lg uppercase tracking-tight text-primary">
              {{ title || 'Düzenle' }}
            </h3>
            <button
              class="size-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              @click="close"
            >
              <UIcon name="i-lucide-x" class="size-4 text-white/50" />
            </button>
          </div>

          <!-- Content (scrollable) -->
          <div class="flex-1 overflow-y-auto px-6 py-6">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from > div:last-child,
.modal-leave-to > div:last-child {
  transform: translateY(20px) scale(0.97);
  opacity: 0;
}
</style>
