/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-04 13:51:33
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-24 11:04:59
 * @Description: 请求密码重置
 */
export function useRequestPasswordReset(options?: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const isPending = ref(false)
  const { $authClient } = useNuxtApp()
  const { successToast, errorToast } = useAppToast()
  const { i18nAuth } = useMessage()
  const turnstileToken = useTurnstileToken()

  async function mutate(params: Parameters<typeof $authClient.requestPasswordReset>[0]) {
    if (isPending.value) {
      return
    }
    try {
      isPending.value = true

      const { error } = await $authClient.requestPasswordReset({
        ...params,
        fetchOptions: {
          headers: {
            'x-captcha-response': turnstileToken.value,
          },
        },
      })

      if (error) {
        throw new Error(error.message)
      }
      successToast({ title: i18nAuth('forgotPassword.success') })
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
