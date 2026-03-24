export default defineNuxtRouteMiddleware((to) => {
  const token = to.query.token

  if (!token || Array.isArray(token)) {
    return navigateTo('/auth/sign-in')
  }
})
