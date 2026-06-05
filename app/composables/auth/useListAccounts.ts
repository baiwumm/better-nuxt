/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-03 11:34:59
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-05 11:35:45
 * @Description: 获取用户账户列表
 */
export function useListAccounts() {
  const { $authClient } = useNuxtApp()
  const { errorToast } = useAppToast()
  return useAsyncData(
    'linked-accounts',
    async () => {
      const { data, error } = await $authClient.listAccounts()
      if (error) {
        errorToast({ title: error.message })
      }
      return data ?? []
    },
    {
      server: false,
      default: () => [],
    },
  )
}
