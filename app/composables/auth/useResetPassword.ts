/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-04 13:45:07
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-04 14:55:23
 * @Description: 重置密码
 */
export function useResetPassword(options?: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const isPending = ref(false)
  const { $authClient } = useNuxtApp()
  const { successToast, errorToast } = useAppToast()
  const { i18nAuth } = useMessage()

  async function mutate(params: Parameters<typeof $authClient.resetPassword>[0]) {
    if (isPending.value) {
      return
    }
    try {
      isPending.value = true

      const { error } = await $authClient.resetPassword(params)

      if (error) {
        throw new Error(error.message)
      }
      successToast({ title: i18nAuth('resetPassword.success') })
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
