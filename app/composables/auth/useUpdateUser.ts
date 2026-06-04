/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-04 10:25:55
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-04 14:56:25
 * @Description: 更改用户信息
 */
export function useUpdateUser(options?: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const isPending = ref(false)
  const { $authClient } = useNuxtApp()
  const { errorToast, successToast } = useAppToast()
  const { i18nCommon } = useMessage()

  async function mutate(params: Parameters<typeof $authClient.updateUser>[0]) {
    if (isPending.value) {
      return
    }
    try {
      isPending.value = true
      const { error } = await $authClient.updateUser(params)
      if (error) {
        throw new Error(error.message)
      }

      successToast({ title: i18nCommon('updateSuccess') })
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
