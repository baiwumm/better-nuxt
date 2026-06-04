/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-04 09:55:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-04 14:56:03
 * @Description: 解除封禁
 */
export function useUnbanUser(options?: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const isPending = ref(false)
  const { $authClient } = useNuxtApp()
  const { successToast, errorToast, warningToast } = useAppToast()
  const { i18nUser, i18nCommon } = useMessage()

  async function mutate(params: Parameters<typeof $authClient.admin.unbanUser>[0]) {
    if (isPending.value) {
      return
    }
    try {
      isPending.value = true
      warningToast({ title: i18nUser('inUnbanUser') })

      const { error } = await $authClient.admin.unbanUser(params)

      if (error) {
        throw new Error(error.message)
      }
      successToast({ title: i18nCommon('actionSuccess') })
      options?.onSuccess?.()
    }
    catch (error) {
      errorToast({ title: catchError(error) })
      options?.onError?.()
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
