export default defineAppConfig({
  global: {
    picture: {
      dark: '/profile.jpeg',
      light: '/profile.jpeg',
      alt: 'Mustafa Barış Göktepe'
    },
    meetingLink: 'mailto:barissgoktepe@gmail.com',
    email: 'barissgoktepe@gmail.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'neutral',
      neutral: 'zinc'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Crafted by Barış Göktepe • ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/barissgoktepe',
      'target': '_blank',
      'aria-label': 'GitHub'
    }, {
      'icon': 'i-simple-icons-discord',
      'to': '#',
      'target': '_blank',
      'aria-label': 'Discord'
    }, {
      'icon': 'i-simple-icons-x',
      'to': '#',
      'target': '_blank',
      'aria-label': 'X'
    }]
  }
})
