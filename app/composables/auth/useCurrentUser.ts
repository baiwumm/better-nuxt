export function useCurrentUser() {
  const { $authClient } = useNuxtApp()
  const session = $authClient.useSession()

  type Session = typeof $authClient.$Infer.Session

  const user = computed(() => session.value?.data?.user)
  const currentSession = computed(() => session.value?.data?.session)

  // 获取用户名
  function getUserDisplayName(user?: Session['user'] | null) {
    return [
      user?.displayUsername,
      user?.username,
      user?.name,
      user?.email,
    ].find(Boolean) ?? ''
  }

  const userName = computed(() => getUserDisplayName(user.value))

  const email = computed(() => user.value?.email)
  const avatar = computed(() => user.value?.image || undefined)

  const isPending = computed(() => {
    return session.value?.isPending ?? false
  })

  return {
    session: currentSession,
    user,
    userName,
    email,
    avatar,
    isPending,
    getUserDisplayName,
  }
}
