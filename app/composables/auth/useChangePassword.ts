/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-05 15:17:04
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-05 16:01:56
 * @Description: 更改密码
 */
export function useChangePassword(options?: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const isPending = ref(false)
  const { $authClient } = useNuxtApp()
  const { errorToast, successToast } = useAppToast()
  const { t } = useI18n()

  async function mutate(params: Parameters<typeof $authClient.changePassword>[0]) {
    if (isPending.value) {
      return
    }
    try {
      isPending.value = true

      const { error } = await $authClient.changePassword(params)

      if (error) {
        throw new Error(error.message)
      }

      successToast({ title: t('auth.changePasswordSuccess') })

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
