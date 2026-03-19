/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-18 17:28:20
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-18 17:33:13
 * @Description: 认证鉴权
 */
const publicRoutes = ['/login']

export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.useSession(useFetch)
  const isLoggedIn = !!session.value

  // 未登录访问私有页面
  if (!isLoggedIn && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  // 已登录访问登录页
  if (isLoggedIn && to.path === '/login') {
    return navigateTo('/dashboard')
  }
})
