import { H3Event } from 'h3'

export async function requireAdmin(event: H3Event) {
  const session = await requireUserSession(event)
  const config = useRuntimeConfig(event)

  if (session.user.login !== config.adminGithubUsername) {
    throw createError({
      statusCode: 403,
      message: 'Unauthorized: Admin access required'
    })
  }

  return session
}
