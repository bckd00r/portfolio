<script setup lang="ts">
const { footer } = useAppConfig()
const { t } = useI18n()
</script>

<template>
  <UFooter
    class="z-10 mt-16"
    :ui="{ left: 'text-muted text-xs' }"
  >
    <template #left>
      <span class="text-muted/60">{{ t('footer.credits') }} &middot; {{ new Date().getFullYear() }}</span>
    </template>

    <template #right>
      <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
          class="transition-opacity duration-200 opacity-50 hover:opacity-100"
        />
      </template>
    </template>
  </UFooter>
</template>
