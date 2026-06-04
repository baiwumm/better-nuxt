/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-04 13:55:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-04 14:55:58
 * @Description: OAuth 登录
 */
export function useSignInSocial(options?: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const isPending = ref(false)
  const { $authClient } = useNuxtApp()
  const { infoToast, errorToast } = useAppToast()
  const { i18nAuth } = useMessage()

  async function mutate(params: Parameters<typeof $authClient.signIn.social>[0]) {
    if (isPending.value) {
      return
    }

    try {
      infoToast({ title: i18nAuth('waitLogin') })
      isPending.value = true
      const { error } = await $authClient.signIn.social(params)

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
