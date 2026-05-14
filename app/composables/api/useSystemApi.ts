/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-23 14:45:58
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-14 15:45:36
 * @Description: 系统设置模块
 */
export function useSystemApi() {
  const { get, post, put, del } = useRequest()

  /**
   * @description: 查询菜单
   */
  const getMenuList = (params?: MenuQueryParams) =>
    get<MenuTree[]>('/system-settings/menu-manage', params)

  /**
   * @description: 新增菜单
   */
  const insertMenu = (body: MenuFormSchema) =>
    post<Menu>('/system-settings/menu-manage', body)

  /**
   * @description: 更新菜单
   */
  const updateMenu = ({ id, ...body }: Partial<MenuFormSchema> & { id: string }) =>
    put<Menu>(`/system-settings/menu-manage/${id}`, body)

  /**
   * @description: 删除菜单
   */
  const delMenu = (id: string) =>
    del<Menu>(`/system-settings/menu-manage/${id}`)

  /**
   * @description: 查询日志
   */
  const getLogsList = (params: LogQueryParams) =>
    get<PaginatingQueryList<Log>>('/system-settings/operation-log', params)

  /**
   * @description: 批量删除
   */
  const delLogs = (params: { ids: string[] }) =>
    del<Log[]>('/system-settings/operation-log', {}, { body: params })

  /**
   * @description: 用户列表（去重）
   */
  const getLogsUserList = () =>
    get<User[]>('/system-settings/operation-log/users')

  /**
   * @description: 获取 i18n 多语言层级数据
   */
  const getLocales = () =>
    get<Record<Locale, any>>('/system-settings/internalization/locales')

  /**
   * @description: 查询国际化
   */
  const getInternalizationList = (params?: InternalizationQueryParams) =>
    get<InternalizationTree[]>('/system-settings/internalization', params)

  /**
   * @description: 新增国际化
   */
  const insertInternalization = (body: InternalizationFormSchema) =>
    post<Internalization>('/system-settings/internalization', body)

  /**
   * @description: 更新国际化
   */
  const updateInternalization = ({ id, ...body }: Partial<InternalizationFormSchema> & { id: string }) =>
    put<Internalization>(`/system-settings/internalization/${id}`, body)

  /**
   * @description: 删除国际化
   */
  const delInternalization = (id: string) =>
    del<Internalization>(`/system-settings/internalization/${id}`)

  return {
    getMenuList,
    insertMenu,
    updateMenu,
    delMenu,
    getLogsList,
    delLogs,
    getLogsUserList,
    getLocales,
    getInternalizationList,
    insertInternalization,
    updateInternalization,
    delInternalization,
  }
}
