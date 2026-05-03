import type { NavigationMenuItem } from '@nuxt/ui'

export function useNavLinks(): NavigationMenuItem[] {
  const { t } = useI18n()

  return [{
    label: t('nav.home'),
    icon: 'i-lucide-home',
    to: '/'
  }, {
    label: t('nav.projects'),
    icon: 'i-lucide-folder',
    to: '/projects'
  }, {
    label: t('nav.blog'),
    icon: 'i-lucide-file-text',
    to: '/blog'
  }, {
    label: t('nav.skills'),
    icon: 'i-lucide-zap',
    to: '/speaking'
  }, {
    label: t('nav.about'),
    icon: 'i-lucide-user',
    to: '/about'
  }]
}
