/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-18 17:28:20
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-24 11:33:31
 * @Description: 认证鉴权
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const { $authClient } = useNuxtApp()
  const relativeFetch = ((url: string, opts?: any) => {
    try {
      if (url.startsWith('http'))
        url = new URL(url).pathname
    }
    catch {}
    return useFetch(url, opts)
  }) as any
  const { data: session } = await $authClient.useSession(relativeFetch)
  const isLoggedIn = !!session.value

  // 未登录访问私有页面
  if (!isLoggedIn && !to.path.startsWith('/auth/')) {
    return navigateTo('/auth/login')
  }
})
