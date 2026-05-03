<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  delay?: number
  /** Viewport fraction where animation triggers (0.85 = 85% from top) */
  threshold?: number
}>(), {
  delay: 0,
  threshold: 0.15
})

const words = computed(() => props.text ? props.text.split(' ') : [])
const isVisible = ref(false)
const container = ref<HTMLElement>()

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!container.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      })
    },
    { threshold: props.threshold }
  )

  observer.observe(container.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div ref="container" class="flex flex-wrap gap-x-[0.3em] leading-[1.3]">
    <span
      v-for="(word, i) in words"
      :key="i"
      class="inline-block overflow-hidden"
    >
      <span
        class="inline-block transition-all ease-[cubic-bezier(0.25,1,0.5,1)]"
        :style="{
          transitionDuration: '800ms',
          transitionDelay: isVisible ? `${(props.delay * 1000) + (i * 30)}ms` : '0ms',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(110%)',
        }"
      >{{ word }}</span>
    </span>
  </div>
</template>
