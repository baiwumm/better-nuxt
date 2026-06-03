/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-03 11:12:35
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-03 14:15:14
 * @Description: 取消关联
 */
export function useUnlinkAccount(options?: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const isPending = ref(false)
  const { $authClient } = useNuxtApp()
  const { successToast, errorToast } = useAppToast()
  const { i18nAccount } = useMessage()

  async function mutate(params: { providerId: string }) {
    if (isPending.value) {
      return false
    }
    try {
      isPending.value = true
      const { error } = await $authClient.unlinkAccount({
        providerId: params.providerId,
      })
      if (error) {
        throw new Error(error.message)
      }
      successToast(i18nAccount('securitySettings.linkAccounts.unlinkSuccess'))
      options?.onSuccess?.()
      return true
    }
    catch (error) {
      errorToast(catchError(error))
      options?.onError?.()
      return false
    }
    finally {
      isPending.value = false
    }
  }

  return {
    mutate,
    isPending,
  }
}
