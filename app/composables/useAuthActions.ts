/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-07 15:44:08
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-20 17:41:50
 * @Description: auth actions（核心行为层）
 */
export function useAuthActions() {
  const { $authClient } = useNuxtApp()

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

  return {
    switchAccount,
  }
}
