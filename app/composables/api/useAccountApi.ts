/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-27 09:23:25
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-16 15:56:14
 * @Description: 我的账户
 */
export function useAccountApi() {
  const { get } = useRequest()

  /**
   * @description: 获取账户菜单
   */
  const getMenus = () => get<MenuTree[]>('/account/menus')

  /**
   * @description: 获取未读消息数量
   */
  const getUnreadCount = () => get<number>('/account/unreadCount')

  return {
    getMenus,
    getUnreadCount,
  }
}
