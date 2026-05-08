export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
    scope: ['user:email', 'read:user']
  },
  async onSuccess(event, { user }) {
    const config = useRuntimeConfig(event)

    // Yalnızca belirlenen admin kullanıcısının erişimine izin ver
    if (user.login !== config.adminGithubUsername) {
      return sendRedirect(event, '/login?error=unauthorized')
    }

    // Seçilen kullanıcı doğru ise yetkili session oluştur
    await setUserSession(event, {
      user: {
        githubId: user.id,
        login: user.login,
        email: user.email,
        avatar: user.avatar_url
      },
      loggedInAt: Date.now()
    })

    return sendRedirect(event, '/')
  },
  onError(event, error) {
    console.error('GitHub OAuth Error:', error)
    return sendRedirect(event, '/login?error=github_auth_failed')
  }
})
