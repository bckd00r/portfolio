<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMouseInElement } from '@vueuse/core'

const target = ref(null)
const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(target)

const cardTransform = computed(() => {
  if (isOutside.value || elementWidth.value === 0 || elementHeight.value === 0) {
    return 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }
  
  const MAX_ROTATION = 12 // max rotation in degrees
  
  const x = (elementX.value / elementWidth.value) - 0.5
  const y = (elementY.value / elementHeight.value) - 0.5
  
  const rotateY = x * MAX_ROTATION * 2
  const rotateX = y * MAX_ROTATION * -2
  
  return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
})
</script>

<template>
  <div 
    ref="target"
    class="will-change-transform"
    :class="isOutside ? 'transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]' : 'transition-transform duration-100 ease-linear'"
    :style="{ transform: cardTransform }"
  >
    <slot />
  </div>
</template>
