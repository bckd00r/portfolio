<template>
  <div class="fixed inset-0 z-[9998] pointer-events-none mix-blend-screen opacity-30 sm:opacity-20 pointer-events-none">
    <!-- Inline SVG for Noise Filter -->
    <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <filter id="noiseFilter" x="0%" y="0%" width="100%" height="100%">
        <!-- Use fractalNoise for a natural film grain look -->
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.5 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
</template>
