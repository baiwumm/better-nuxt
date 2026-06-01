export function useMenu() {
  const menuStore = useMenuStore()
  const { t } = useI18n()

  /**
   * @description: 处理 label
   */
  function tMenu(items: MenuTree[]): MenuTree[] {
    return items.filter(item => !item.hideInMenu).map(item => ({
      ...item,
      label: item.label ? t(item.label) : item.label,
      children: item.children ? tMenu(item.children) : [],
    }))
  }

  const menuItems = computed(() => {
    const list = menuStore.menuTree ?? []
    return tMenu(list)
  })
  return {
    menuItems,
  }
}
