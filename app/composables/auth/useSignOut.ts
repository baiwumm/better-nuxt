/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-05 12:10:05
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-05 12:10:33
 * @Description: 注销登录
 */
export function useSignOut() {
  const { $authClient } = useNuxtApp()
  const confirm = useConfirmDialog()
  const { errorToast } = useAppToast()
  const { i18nAuth, i18nCommon } = useMessage()

  return async (redirectTo = '/auth/sign-in') => {
    const confirmed = await confirm({
      title: i18nAuth('logout.confirmTitle'),
      description: i18nAuth('logout.confirmDescription'),
      confirmLabel: i18nCommon('confirm'),
      loadingLabel: i18nAuth('waitLogout'),
      onConfirm: async () => {
        const { error } = await $authClient.signOut()

        if (error) {
          errorToast({ title: error.message })
        }

        return !error
      },
    })

    if (confirmed && redirectTo) {
      await navigateTo(redirectTo)
    }
  }
}
