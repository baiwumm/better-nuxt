/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-07 15:45:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-07-01 10:44:20
 * @Description: 多会话
 */
import type { DropdownMenuItem } from '@nuxt/ui'

export async function useSessionMenu() {
  const { $authClient } = useNuxtApp()
  const { user: currentUser, getUserDisplayName } = useCurrentUser()
  const { errorToast } = useAppToast()

  // 多会话数据：纯客户端获取（SSR 无 cookie 转发无意义），避免 setup 顶层裸 await 双重执行
  // key 含用户 id，切换账户后自动重新获取
  const { data: sessions } = await useAsyncData(
    () => `device-sessions-${currentUser.value?.id ?? 'anon'}`,
    () => $authClient.multiSession.listDeviceSessions().then(res => res.data ?? []),
    {
      server: false,
    },
  )

  const sessionItems = computed<DropdownMenuItem[]>(() => {
    return (
      sessions.value?.map(({ session, user }) => {
        const userName = getUserDisplayName(user as User)
        const isCurrent = user?.id === currentUser.value?.id
        return {
          label: userName,
          avatar: { src: user.image || undefined, alt: userName, loading: 'lazy' as const },
          type: 'checkbox',
          checked: isCurrent,
          async onSelect() {
            if (isCurrent)
              return

            try {
              const { error } = await $authClient.multiSession.setActive({
                sessionToken: session.token,
              })

              if (error) {
                throw new Error(error.message)
              }
              await refreshNuxtData()
              navigateTo('/')
            }
            catch (error) {
              errorToast({ title: catchError(error) })
            }
          },
        }
      }) ?? []
    )
  })

  return {
    sessions,
    sessionItems,
  }
}
