export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession()
  
  if (!loggedIn.value) {
    return navigateTo('/') // Redirect to home page if not authenticated
  }
})
