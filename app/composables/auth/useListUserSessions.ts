/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-04 10:43:43
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-04 10:56:08
 * @Description: 列出用户会话
 */
export function useListUserSessions(userId: MaybeRefOrGetter<string | undefined>) {
  const { $authClient } = useNuxtApp()
  const { errorToast } = useAppToast()
  return useAsyncData(
    () => `list-user-sessions-${toValue(userId)}`,
    async () => {
      const id = toValue(userId)

      if (!id) {
        return null
      }

      const { data, error } = await $authClient.admin.listUserSessions({
        userId: id,
      })
      if (error) {
        errorToast({ title: error.message })
      }

      return data
    },
    {
      immediate: false,
      watch: [() => toValue(userId)],
    },
  )
}
