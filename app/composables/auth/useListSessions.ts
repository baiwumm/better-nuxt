/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-05 11:23:55
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-05 11:46:40
 * @Description: 列出会话
 */
export function useListSessions() {
  const { $authClient } = useNuxtApp()
  const { errorToast } = useAppToast()
  return useAsyncData(
    () => `list-sessions`,
    async () => {
      const { data, error } = await $authClient.listSessions()

      if (error) {
        errorToast({ title: error.message })
      }

      return data
    },
    {
      server: false,
      default: () => [],
    },
  )
}
