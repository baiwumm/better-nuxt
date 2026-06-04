/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-04 14:58:30
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-04 15:03:18
 * @Description: 邮箱密码登录
 */
export function useSignInEmail(options?: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const isPending = ref(false)
  const { $authClient } = useNuxtApp()
  const { errorToast } = useAppToast()
  const { i18nAuth } = useMessage()

  async function mutate(params: Parameters<typeof $authClient.signIn.email>[0]) {
    if (isPending.value) {
      return
    }

    try {
      isPending.value = true
      const { error } = await $authClient.signIn.email(params)

      if (error) {
        throw new Error(error.message)
      }
      options?.onSuccess?.()
    }
    catch (error) {
      isPending.value = false
      errorToast({ title: i18nAuth('signIn.error'), description: catchError(error) })
      options?.onError?.()
    }
  }

  return {
    mutate,
    isPending,
  }
}
