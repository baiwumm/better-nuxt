/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-23 14:45:58
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-04-30 12:24:03
 * @Description: 系统设置模块
 */
export function useSystemApi() {
  const { get, post, put, del } = useRequest()

  /**
   * @description: 查询菜单
   */
  const getMenuList = (params?: Partial<{ keyword: string, enabled: boolean }>) =>
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
  const delMenu = (id: string) =>
    del<System.Menu>(`/system-settings/menu-manage/${id}`)

  /**
   * @description: 查询日志
   */
  const getLogsList = (params: System.LogParams & Api.PaginatingParams) =>
    get<Api.PaginatingQueryList<System.Log>>('/system-settings/operation-log', params)

  /**
   * @description: 批量删除
   */
  const delLogs = (params: { ids: string[] }) =>
    del<System.Log[]>('/system-settings/operation-log', {}, { body: params })

  /**
   * @description: 用户列表（去重）
   */
  const getLogsUserList = () =>
    get<System.User[]>('/system-settings/operation-log/users')

  return {
    getMenuList,
    insertMenu,
    updateMenu,
    delMenu,
    getLogsList,
    delLogs,
    getLogsUserList,
  }
}
