export function useNotice() {
  const unreadCount = useState(
    'unread-notices-count',
    () => 0,
  )

  const { getUnreadCount } = useAccountApi()

  const refreshUnreadCount = async () => {
    const res = await getUnreadCount()
    unreadCount.value = res?.data ?? 0
  }

  return {
    unreadCount,
    refreshUnreadCount,
  }
}
