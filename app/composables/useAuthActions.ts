/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-07 15:44:08
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-07 15:57:02
 * @Description: auth actions（核心行为层）
 */
export function useAuthActions() {
  const { $authClient } = useNuxtApp()
  const router = useRouter()
  const loading = ref(false)
  const toast = useToast()
  const { t } = useI18n()

  const switchAccount = async (sessionToken: string, isCurrent: boolean) => {
    if (isCurrent)
      return

    await $authClient.multiSession.setActive({
      sessionToken,
    })

    await refreshNuxtData()
  }

  const logout = async () => {
    loading.value = true
    toast.add({
      title: t('auth.waitLogout'),
      icon: 'lucide:log-out',
    })
    try {
      await $authClient.signOut()
      router.push('/auth/sign-in')
    }
    finally {
      loading.value = false
    }
  }

  return {
    loading,
    switchAccount,
    logout,
  }
}
