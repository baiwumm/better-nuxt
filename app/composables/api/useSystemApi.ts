/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-23 14:45:58
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-04-24 14:51:02
 * @Description: 系统设置模块
 */
export function useSystemApi() {
  const { get, post, put, del } = useRequest()

  /**
   * @description: 查询菜单
   */
  const getMenuList = (params?: { keyword: string }) =>
    get<System.MenuTree[]>('/system-settings/menu-manage', params)

  /**
   * @description: 新增菜单
   */
  const insertMenu = (body: System.InsertMenu) =>
    post<System.Menu>('/system-settings/menu-manage', body)

  /**
   * @description: 更新菜单
   */
  const updateMenu = ({ id, ...body }: System.UpdateMenu) =>
    put<System.Menu>(`/system-settings/menu-manage/${id}`, body)

  /**
   * @description: 删除菜单
   */
  const delMenu = (id: number) =>
    del<System.Menu>(`/system-settings/menu-manage/${id}`)

  return {
    getMenuList,
    insertMenu,
    updateMenu,
    delMenu,
  }
}
