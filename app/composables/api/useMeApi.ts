/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-27 09:23:25
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-27 09:25:24
 * @Description: 我的相关接口
 */
export function useMeApi() {
  const { get } = useRequest()

  /**
   * @description: 获取角色菜单
   */
  const getMenus = () => get<MenuTree[]>('/me/menus')

  return {
    getMenus,
  }
}
