/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-04 14:52:45
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-04 15:03:25
 * @Description: 邮箱一键登录
 */
export function useSignInMagicLink(options?: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const isPending = ref(false)
  const { $authClient } = useNuxtApp()
  const { successToast, errorToast } = useAppToast()
  const { i18nAuth } = useMessage()

  async function mutate(params: Parameters<typeof $authClient.signIn.magicLink>[0]) {
    if (isPending.value) {
      return
    }

    try {
      isPending.value = true
      const { error } = await $authClient.signIn.magicLink(params)

      if (error) {
        throw new Error(error.message)
      }
      options?.onSuccess?.()
      successToast({
        title: i18nAuth('magicLink.verifyEmailSent'),
        description: i18nAuth('magicLink.verifyEmailSentDesc'),
      })
    }
    catch (error) {
      isPending.value = false
      errorToast({ title: catchError(error) })
      options?.onError?.()
    }
  }

  return {
    mutate,
    isPending,
  }
}
