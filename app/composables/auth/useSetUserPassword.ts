/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-04 10:59:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-04 14:55:50
 * @Description: 重置用户密码
 */
export function useSetUserPassword(options?: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const isPending = ref(false)
  const { $authClient } = useNuxtApp()
  const { successToast, errorToast } = useAppToast()

  async function mutate(params: Parameters<typeof $authClient.admin.setUserPassword>[0]) {
    if (isPending.value) {
      return
    }
    try {
      isPending.value = true

      const { error } = await $authClient.admin.setUserPassword(params)

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
