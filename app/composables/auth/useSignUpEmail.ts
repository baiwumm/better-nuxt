/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-04 14:58:30
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-24 11:03:51
 * @Description: 邮箱注册
 */
export function useSignUpEmail(options?: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const isPending = ref(false)
  const { $authClient } = useNuxtApp()
  const { errorToast, successToast } = useAppToast()
  const { i18nAuth } = useMessage()
  const turnstileToken = useTurnstileToken()

  async function mutate(params: Parameters<typeof $authClient.signUp.email>[0]) {
    if (isPending.value) {
      return
    }

    try {
      isPending.value = true
      const { error } = await $authClient.signUp.email({
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
      options?.onSuccess?.()
      successToast({
        title: i18nAuth('signUp.verifyEmailSent'),
        description: i18nAuth('signUp.verifyEmailSentDesc'),
      })
    }
    catch (error) {
      errorToast({ title: i18nAuth('signUp.error'), description: catchError(error) })
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
