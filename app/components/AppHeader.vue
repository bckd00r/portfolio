<script setup lang="ts">
import { useNavLinks } from '~/utils/links'

const links = useNavLinks()
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() =>
  locales.value.filter(l => typeof l === 'object' && l.code !== locale.value)
)

function toggleLocale() {
  const next = locale.value === 'en' ? 'tr' : 'en'
  setLocale(next)
}
</script>

<template>
  <header>
    <!-- Desktop Header -->
    <div class="hidden sm:block fixed top-5 mx-auto left-1/2 transform -translate-x-1/2 z-50">
      <div class="relative">
        <div class="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/[0.03] via-white/[0.06] to-white/[0.03] blur-sm" />
        <UNavigationMenu
          :items="links"
          variant="link"
          color="neutral"
          class="relative glass-panel-sm px-6 py-1.5 shadow-2xl shadow-black/30 border-white/[0.08]"
          :ui="{
            link: 'px-3 py-1.5 transition-all duration-200 hover:text-highlighted',
            linkLeadingIcon: 'hidden'
          }"
        >
          <template #link="{ item }">
            <span class="text-sm tracking-wide">{{ item.label }}</span>
          </template>
          <template #list-trailing>
            <div class="flex items-center gap-2 pl-3 border-l border-white/[0.06]">
              <button
                class="px-2 py-1 text-[11px] font-mono uppercase tracking-widest text-muted/60 hover:text-highlighted transition-colors duration-200 cursor-pointer"
                :title="$t('common.language')"
                @click="toggleLocale"
              >
                {{ locale === 'en' ? 'TR' : 'EN' }}
              </button>
              <ColorModeButton />
            </div>
          </template>
        </UNavigationMenu>
      </div>
    </div>

    <!-- Mobile Top Bar (Language & Theme) -->
    <div class="sm:hidden fixed top-0 inset-x-0 h-24 bg-gradient-to-b from-black/90 via-black/40 to-transparent pointer-events-none z-40"></div>
    <div class="sm:hidden fixed top-4 right-4 z-50 flex items-center gap-2 glass-panel-sm px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
      <button
        class="text-[10px] font-mono uppercase tracking-widest text-muted hover:text-white transition-colors cursor-pointer"
        @click="toggleLocale"
      >
        {{ locale === 'en' ? 'TR' : 'EN' }}
      </button>
      <div class="w-px h-3 bg-white/10"></div>
      <ColorModeButton />
    </div>

    <!-- Mobile Bottom Dock (Navigation) -->
    <div class="sm:hidden fixed bottom-6 inset-x-4 z-50">
      <div class="relative max-w-sm mx-auto">
        <div class="absolute -inset-px rounded-2xl bg-gradient-to-r from-emerald-500/[0.08] via-white/[0.06] to-amber-500/[0.08] blur-sm" />
        <div class="relative glass-panel border border-white/10 rounded-2xl flex items-center justify-between px-6 py-3 shadow-2xl shadow-black/80">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="relative flex flex-col items-center justify-center group w-10 h-10"
            active-class="text-emerald-300"
            exact-active-class="text-emerald-300"
            :class="$route.path === link.to ? 'text-emerald-300' : 'text-muted/60'"
          >
            <UIcon :name="link.icon" class="size-[22px] transition-all duration-300 group-hover:scale-110 group-hover:text-emerald-300" />
            <div v-if="$route.path === link.to" class="absolute -bottom-1.5 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>
