/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-18 17:28:20
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-24 15:20:16
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

  // 获取用户会话信息
  const { data: session } = await $authClient.useSession(relativeFetch)
  const isLoggedIn = !!session.value

  // 判断是否权限页面
  const isAuth = to.path.startsWith('/auth/')

  // 未登录访问私有页面
  if (!isLoggedIn && !isAuth) {
    return navigateTo('/auth/sign-in')
  }
})
