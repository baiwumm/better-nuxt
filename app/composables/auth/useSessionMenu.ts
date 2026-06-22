/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-07 15:45:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-22 10:33:58
 * @Description: 多会话
 */
import type { DropdownMenuItem } from '@nuxt/ui'

export async function useSessionMenu() {
  const { $authClient } = useNuxtApp()
  const { user: currentUser, getUserDisplayName } = useCurrentUser()
  const { errorToast } = useAppToast()

  const { data: sessions } = await $authClient.multiSession.listDeviceSessions()

  const sessionItems = computed<DropdownMenuItem[]>(() => {
    return (
      sessions?.map(({ session, user }) => {
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
              reloadNuxtApp({
                path: '/',
              })
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
