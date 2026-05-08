<script setup lang="ts">
const { t } = useI18n()
const { loggedIn, clear } = useUserSession()
const route = useRoute()

// Mevcut kullanıcı için sayfa başlığı vb. meta verileri
useSeoMeta({
  title: 'Admin Login',
  robots: 'noindex, nofollow'
})

const errorMessage = computed(() => {
  if (route.query.error === 'unauthorized') {
    return 'Yetkisiz erişim: Bu domaine sadece sistem yöneticisi giriş yapabilir.'
  }
  if (route.query.error === 'github_auth_failed') {
    return 'GitHub ile giriş yapılırken bir hata oluştu. Tekrar deneyin.'
  }
  return ''
})

const handleLogout = async () => {
  await clear()
  await navigateTo('/')
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4">
    <div class="glass-panel max-w-sm w-full p-8 rounded-2xl border flex flex-col items-center border-white/10 shadow-2xl">
      <!-- Icon & Header -->
      <div class="mb-8 text-center">
        <div class="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
          <UIcon name="i-lucide-lock" class="size-8 text-white/80" />
        </div>
        <h1 class="font-display font-medium text-2xl tracking-tighter text-primary uppercase">
          Admin Portal
        </h1>
        <p class="text-xs font-body tracking-[0.2em] text-muted uppercase mt-2">
          Yetkili erişim gerektirir
        </p>
      </div>

      <!-- Erros -->
      <div v-if="errorMessage" class="w-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-6 text-center">
        {{ errorMessage }}
      </div>

      <!-- Actions -->
      <div class="w-full flex flex-col gap-4">
        <!-- Zaten giriş yapılmışsa -->
        <template v-if="loggedIn">
          <UButton
            to="/"
            color="white"
            variant="solid"
            block
            size="lg"
            class="font-display tracking-widest text-black"
          >
            Siteye Dön
          </UButton>
          <UButton
            color="red"
            variant="soft"
            block
            size="lg"
            class="font-display tracking-widest"
            @click="handleLogout"
          >
            Çıkış Yap
          </UButton>
        </template>

        <!-- Giriş yapılmamışsa -->
        <template v-else>
          <UButton
            to="/auth/github"
            external
            color="white"
            variant="solid"
            block
            size="lg"
            class="font-display tracking-widest transition-transform hover:scale-[1.02] text-black"
            icon="i-simple-icons-github"
          >
            GitHub İle Giriş Yap
          </UButton>
          <p class="text-[10px] text-center text-muted font-body tracking-wider mt-4">
            Sadece yetkilendirilmiş GitHub hesabı ile giriş yapılabilir.
          </p>
        </template>
      </div>
    </div>
  </div>
</template>
