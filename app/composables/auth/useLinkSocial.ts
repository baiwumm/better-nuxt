/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-03 11:08:28
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-03 14:03:46
 * @Description: 关联账户
 */
export function useLinkSocial() {
  const isPending = ref(false)
  const { $authClient } = useNuxtApp()
  const { errorToast } = useAppToast()

  async function mutate(options: { provider: string, callbackURL: string }) {
    if (isPending.value) {
      return
    }
    try {
      isPending.value = true
      const { error } = await $authClient.linkSocial({
        provider: options.provider,
        callbackURL: options.callbackURL,
      })
      if (error) {
        throw new Error(error.message)
      }
    }
    catch (error) {
      errorToast(catchError(error))
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
