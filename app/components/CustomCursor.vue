<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isDesktop = ref(true)

// Global state
const cursorText = useState('cursorText', () => '')
const cursorActive = useState('cursorActive', () => false)

// Raw mouse coords — updated via native listener for zero lag
const mx = ref(0)
const my = ref(0)

// Outer ring trails the dot with lerp for an elegant drag
const rx = ref(0)
const ry = ref(0)

let rafId = 0

function onMove(e: MouseEvent) {
  mx.value = e.clientX
  my.value = e.clientY
}

function loop() {
  // Lerp factor: 0.15 = silky smooth trail, 1 = instant
  const lerp = 0.18
  rx.value += (mx.value - rx.value) * lerp
  ry.value += (my.value - ry.value) * lerp
  rafId = requestAnimationFrame(loop)
}

onMounted(() => {
  if (window.matchMedia('(pointer: coarse)').matches) {
    isDesktop.value = false
    return
  }
  window.addEventListener('mousemove', onMove, { passive: true })
  rafId = requestAnimationFrame(loop)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <ClientOnly>
    <template v-if="isDesktop">
      <!-- Inner dot: instant tracking, always sharp -->
      <div
        class="fixed top-0 left-0 pointer-events-none z-[2147483647] rounded-full mix-blend-difference"
        :class="cursorText ? 'w-0 h-0 opacity-0' : 'w-[5px] h-[5px] bg-white opacity-100'"
        :style="{
          transform: `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`,
          transition: 'width 0.3s, height 0.3s, opacity 0.3s',
        }"
      />

      <!-- Outer ring: lerp-trailing, expands on hover -->
      <div
        class="fixed top-0 left-0 pointer-events-none z-[2147483646] rounded-full flex items-center justify-center mix-blend-difference"
        :class="[
          cursorText
            ? 'w-24 h-24 bg-white'
            : cursorActive
              ? 'w-12 h-12 border border-white/60 bg-white/5'
              : 'w-8 h-8 border border-white/40'
        ]"
        :style="{
          transform: `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`,
          transition: 'width 0.4s cubic-bezier(0.25,1,0.5,1), height 0.4s cubic-bezier(0.25,1,0.5,1), background 0.4s, border 0.4s',
        }"
      >
        <span
          v-if="cursorText"
          class="text-black text-[9px] tracking-[0.25em] font-display uppercase font-semibold select-none"
        >
          {{ cursorText }}
        </span>
      </div>
    </template>
  </ClientOnly>
</template>
