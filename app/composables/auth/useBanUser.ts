/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-04 09:55:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-04 14:54:44
 * @Description: 封禁用户
 */
export function useBanUser(options?: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const isPending = ref(false)
  const { $authClient } = useNuxtApp()
  const { successToast, errorToast } = useAppToast()

  async function mutate(params: Parameters<typeof $authClient.admin.banUser>[0]) {
    if (isPending.value) {
      return
    }
    try {
      isPending.value = true

      const { error } = await $authClient.admin.banUser(params)

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
