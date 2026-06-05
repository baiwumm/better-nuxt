/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-04 10:08:15
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-05 14:03:00
 * @Description: 撤销 session 会话
 */
export function useRevokeSession(options?: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const isPending = ref(false)
  const { $authClient } = useNuxtApp()
  const { successToast, errorToast } = useAppToast()

  async function mutate(params: Parameters<typeof $authClient.revokeSession>[0]) {
    if (isPending.value) {
      return false
    }
    try {
      isPending.value = true

      const { error } = await $authClient.revokeSession(params)

      if (error) {
        throw new Error(error.message)
      }
      successToast()
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
