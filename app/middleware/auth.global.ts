/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-18 17:28:20
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-22 10:16:44
 * @Description: 认证鉴权
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const { $authClient } = useNuxtApp()
  const menuStore = useMenuStore()

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

  if (isAuth) {
    return
  }

  const routePath = normalizePath(
    to.matched.at(-1)?.path ?? to.path,
  )

  // 菜单未就绪时等待加载完成后再校验权限（首次导航/直接输入 URL 也能生效）
  if (!menuStore.inited || menuStore.loading) {
    await menuStore.init()
  }

  const menu = menuStore.menuPathMap.get(routePath)

  if (!menu) {
    return showError({
      statusCode: 403,
      statusMessage: '您没有访问权限!',
    })
  }
})
