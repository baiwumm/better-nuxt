/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-04 10:18:00
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-04 10:31:57
 * @Description: 更改电子邮箱
 */
export function useChangeEmail(options?: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const isPending = ref(false)
  const { $authClient } = useNuxtApp()
  const { errorToast, successToast } = useAppToast()
  const { i18nAuth } = useMessage()

  async function mutate(params: Parameters<typeof $authClient.changeEmail>[0]) {
    if (isPending.value) {
      return
    }
    try {
      isPending.value = true

      const { error } = await $authClient.changeEmail(params)

      if (error) {
        throw new Error(error.message)
      }

      successToast({
        title: i18nAuth('signUp.verifyEmailSent'),
        description: i18nAuth('signUp.verifyEmailSentDesc'),
      })
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
