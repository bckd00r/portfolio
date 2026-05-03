<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text: string
  repeat?: number
}>()

// Repeat the text multiple times to ensure the screen is filled
const items = computed(() => Array(props.repeat || 4).fill(props.text))
</script>

<template>
  <div class="relative w-full overflow-hidden border-y border-white/10 bg-black py-3 sm:py-4">
    <div class="flex whitespace-nowrap animate-marquee will-change-transform">
      <div v-for="(item, i) in items" :key="i" class="flex items-center px-4">
        <span class="font-display uppercase text-sm sm:text-base tracking-[0.2em] text-white/70">
          {{ item }}
        </span>
        <span class="mx-8 w-1.5 h-1.5 bg-white/30 rounded-full"></span>
      </div>
      <!-- Duplicate the items for seamless looping -->
      <div v-for="(item, i) in items" :key="'dup-'+i" class="flex items-center px-4">
        <span class="font-display uppercase text-sm sm:text-base tracking-[0.2em] text-white/70">
          {{ item }}
        </span>
        <span class="mx-8 w-1.5 h-1.5 bg-white/30 rounded-full"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 25s linear infinite;
  display: flex;
  width: max-content;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
