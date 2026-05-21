/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-07 15:44:08
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-21 09:23:05
 * @Description: auth actions（核心行为层）
 */
export function useAuthActions() {
  const { $authClient } = useNuxtApp()
  const toast = useToast()
  const { i18nCommon, i18nUser } = useMessage()

  /**
   * @description: 切换账户
   */
  const switchAccount = async (sessionToken: string, isCurrent: boolean) => {
    if (isCurrent)
      return

    await $authClient.multiSession.setActive({
      sessionToken,
    })

    await refreshNuxtData()
  }

  /**
   * @description: 封禁用户
   */
  const unbanUser = async (userId: string, callback: VoidFunction) => {
    const t = toast.add({
      title: i18nUser('inUnbanUser'),
      icon: 'lucide:loader',
      color: 'warning',
      duration: 0, // 不自动关闭
    })

    const { error } = await $authClient.admin.unbanUser({ userId })

    if (error) {
      toast.update(t.id, {
        title: error.message,
        icon: 'lucide:x',
        color: 'error',
      })
    }
    else {
      toast.update(t.id, {
        title: i18nCommon('actionSuccess'),
        icon: 'lucide:circle-check',
        color: 'success',
      })
      callback?.()
    }
  }

  return {
    switchAccount,
    unbanUser,
  }
}
