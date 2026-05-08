<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession()

const handleLogout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  await navigateTo('/')
}
</script>

<template>
  <Transition name="admin-bar">
    <div
      v-if="loggedIn"
      class="fixed top-0 left-0 right-0 z-[100] h-10 glass-panel border-b border-white/10 flex items-center justify-between px-4 sm:px-6"
    >
      <!-- Left: Admin indicator -->
      <div class="flex items-center gap-3">
        <div class="size-2 rounded-full bg-emerald-400 animate-pulse" />
        <span class="text-[10px] font-body uppercase tracking-[0.3em] text-white/60">
          Admin Mode
        </span>
        <span class="text-[10px] font-body text-white/30">
          {{ user?.login }}
        </span>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-3">
        <button
          class="text-[10px] font-body uppercase tracking-[0.2em] text-white/40 hover:text-red-400 transition-colors duration-300 flex items-center gap-1.5 min-h-[44px]"
          @click="handleLogout"
        >
          <UIcon name="i-lucide-log-out" class="size-3.5" />
          <span class="hidden sm:inline">Çıkış</span>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.admin-bar-enter-active,
.admin-bar-leave-active {
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;
}
.admin-bar-enter-from,
.admin-bar-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
