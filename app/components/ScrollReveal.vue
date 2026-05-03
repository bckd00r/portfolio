<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** Viewport fraction where fade starts (0=top, 1=bottom) */
  from?: number
  /** Viewport fraction where element is fully visible */
  to?: number
  /** Horizontal slide distance in px (negative = from left) */
  slideX?: number
}>(), {
  from: 0.95,
  to: 0.25,
  slideX: 30
})

const el = ref<HTMLElement>()
const progress = ref(0)
let rafId = 0

function update() {
  if (!el.value) return
  const rect = el.value.getBoundingClientRect()
  const vh = window.innerHeight
  const start = vh * props.from
  const end = vh * props.to

  if (rect.top >= start) progress.value = 0
  else if (rect.top <= end) progress.value = 1
  else progress.value = (start - rect.top) / (start - end)
}

function onScroll() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(update)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  requestAnimationFrame(update)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(rafId)
})

/* ease-out cubic for smoother visual feel */
const eased = computed(() => 1 - Math.pow(1 - progress.value, 3))
</script>

<template>
  <div
    ref="el"
    :style="{
      opacity: eased,
      transform: `translateX(${(1 - eased) * -slideX}px)`,
      willChange: 'opacity, transform',
    }"
  >
    <slot />
  </div>
</template>
