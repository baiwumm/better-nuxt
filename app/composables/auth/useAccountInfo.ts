/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-03 09:50:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-03 14:35:17
 * @Description: 获取由提供商提供的账户信息
 */
export function useAccountInfo(accountId: MaybeRefOrGetter<string | undefined>) {
  const { $authClient } = useNuxtApp()
  const { errorToast } = useAppToast()
  return useAsyncData(
    () => `account-info-${toValue(accountId)}`,
    async () => {
      const id = toValue(accountId)

      if (!id) {
        return null
      }

      const { data, error } = await $authClient.accountInfo({
        query: {
          accountId: id,
        },
      })
      if (error) {
        errorToast({ title: error.message })
      }

      return data
    },
    {
      watch: [() => toValue(accountId)],
    },
  )
}
