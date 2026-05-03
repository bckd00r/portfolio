<script setup lang="ts">
import { ref, onMounted } from 'vue'

const percentage = ref(0)
const isLoaded = ref(false)
const isHidden = ref(false)

onMounted(() => {
  let current = 0
  
  const tick = () => {
    const increment = Math.floor(Math.random() * 12) + 3
    current = Math.min(current + increment, 100)
    percentage.value = current

    if (current >= 100) {
      setTimeout(() => {
        isLoaded.value = true
        // Remove from DOM after fade-out completes
        setTimeout(() => {
          isHidden.value = true
        }, 1600)
      }, 400)
      return
    }

    setTimeout(tick, 80 + Math.random() * 60)
  }

  // Start immediately
  tick()
})
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        v-if="!isHidden"
        class="fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
        :class="isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'"
      >
        <!-- Percentage Counter -->
        <div class="overflow-hidden">
          <div
            class="font-display text-5xl sm:text-7xl md:text-8xl tracking-tighter text-white tabular-nums transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
            :class="isLoaded ? 'translate-y-full' : 'translate-y-0'"
          >
            {{ percentage }}
          </div>
        </div>

        <!-- Bottom progress line -->
        <div class="absolute bottom-0 left-0 h-px bg-white/20 w-full">
          <div
            class="h-full bg-white transition-all duration-200 ease-linear"
            :style="{ width: `${percentage}%` }"
          />
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>
