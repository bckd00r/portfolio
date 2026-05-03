<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const target = ref<HTMLElement | null>(null)
const bounds = ref<DOMRect | null>(null)
const x = ref(0)
const y = ref(0)
const isHovering = ref(false)

const handleMouseMove = (e: MouseEvent) => {
  if (!target.value || !bounds.value) return
  
  const clientX = e.clientX
  const clientY = e.clientY
  
  const centerX = bounds.value.left + bounds.value.width / 2
  const centerY = bounds.value.top + bounds.value.height / 2
  
  const maxDistance = 15 // px max pull distance
  
  const distanceX = (clientX - centerX) / (bounds.value.width / 2)
  const distanceY = (clientY - centerY) / (bounds.value.height / 2)
  
  x.value = distanceX * maxDistance
  y.value = distanceY * maxDistance
}

const handleMouseEnter = () => {
  if (!target.value) return
  bounds.value = target.value.getBoundingClientRect()
  isHovering.value = true
}

const handleMouseLeave = () => {
  isHovering.value = false
  x.value = 0
  y.value = 0
}

const updateBounds = () => {
  if (target.value) {
    bounds.value = target.value.getBoundingClientRect()
  }
}

onMounted(() => {
  window.addEventListener('resize', updateBounds)
  window.addEventListener('scroll', updateBounds, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateBounds)
  window.removeEventListener('scroll', updateBounds)
})
</script>

<template>
  <div
    ref="target"
    class="inline-block cursor-pointer"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="will-change-transform"
      :class="isHovering ? 'transition-transform duration-100 ease-linear' : 'transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]'"
      :style="{ transform: `translate3d(${x}px, ${y}px, 0)` }"
    >
      <slot />
    </div>
  </div>
</template>
