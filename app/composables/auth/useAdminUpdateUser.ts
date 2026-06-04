/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-04 10:25:55
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-04 15:09:57
 * @Description: 管理员 - 更改用户
 */
export function useAdminUpdateUser(options?: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const isPending = ref(false)
  const { $authClient } = useNuxtApp()
  const { errorToast } = useAppToast()

  async function mutate(params: Parameters<typeof $authClient.admin.updateUser>[0]) {
    if (isPending.value) {
      return
    }
    try {
      isPending.value = true
      const { error } = await $authClient.admin.updateUser(params)
      if (error) {
        throw new Error(error.message)
      }
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
