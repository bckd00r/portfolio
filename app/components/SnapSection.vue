<script setup lang="ts">
const props = withDefaults(defineProps<{
  direction?: 'left' | 'right'
}>(), {
  direction: 'left'
})

const el = ref<HTMLElement>()
const progress = ref(0)
let rafId = 0

function update() {
  if (!el.value) return
  const rect = el.value.getBoundingClientRect()
  const vh = window.innerHeight
  const offset = Math.abs(rect.top)
  progress.value = Math.max(0, Math.min(1, 1 - offset / (vh * 0.65)))
}

function onScroll() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(update)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  requestAnimationFrame(update)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(rafId)
})

const eased = computed(() => 1 - Math.pow(1 - progress.value, 3))

const slideOffset = computed(() => {
  const dir = props.direction === 'left' ? -1 : 1
  return (1 - eased.value) * 50 * dir
})
</script>

<template>
  <section
    ref="el"
    class="snap-section"
  >
    <div
      class="snap-inner"
      :style="{
        opacity: eased,
        transform: `translateX(${slideOffset}px)`,
      }"
    >
      <slot />
    </div>
  </section>
</template>
