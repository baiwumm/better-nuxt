export function useCurrentUser() {
  const { $authClient } = useNuxtApp()
  const session = $authClient.useSession()

  const user = computed(() => session.value?.data?.user)

  const userName = computed(() => {
    const u = user.value
    return u?.name || u?.email?.[0]
  })

  const email = computed(() => user.value?.email)
  const avatar = computed(() => user.value?.image || undefined)

  return {
    user,
    userName,
    email,
    avatar,
  }
}
