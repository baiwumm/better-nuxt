/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-07 15:45:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-07 15:46:47
 * @Description: 多会话
 */
import type { DropdownMenuItem } from '@nuxt/ui'

export async function useSessionMenu() {
  const { $authClient } = useNuxtApp()
  const { user: currentUser } = useCurrentUser()
  const { switchAccount } = useAuthActions()

  const { data: sessions } = await $authClient.multiSession.listDeviceSessions()

  const sessionItems = computed<DropdownMenuItem[]>(() => {
    return (
      sessions?.map(({ session, user }) => {
        const userName = user.name || user.email
        const alt = userName?.slice(0, 2).toUpperCase()
        const isCurrent = user?.id === currentUser.value?.id
        return {
          label: userName,
          avatar: { src: user.image || undefined, alt, loading: 'lazy' as const },
          type: 'checkbox',
          checked: isCurrent,
          async onSelect() {
            await switchAccount(session.token, isCurrent)
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
