/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-23 14:45:58
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-25 15:36:06
 * @Description: 系统设置模块
 */
export function useSystemApi() {
  const { get, post, put, del } = useRequest()

  /**
   * @description: 查询用户列表
   */
  const getUserList = (params?: UserQueryParams) =>
    get<PaginatingQueryList<User>>('/system-settings/user-manage', params)

  /**
   * @description: 查询菜单
   */
  const getMenuList = (params?: MenuQueryParams) =>
    get<MenuTree[]>('/system-settings/menu-manage', params)

  /**
   * @description: 新增菜单
   */
  const insertMenu = (body: InsertMenu) =>
    post<Menu>('/system-settings/menu-manage', body)

  /**
   * @description: 更新菜单
   */
  const updateMenu = ({ id, ...body }: Partial<InsertMenu> & { id: string }) =>
    put<Menu>(`/system-settings/menu-manage/${id}`, body)

  /**
   * @description: 删除菜单
   */
  const delMenu = (id: string) =>
    del<Menu>(`/system-settings/menu-manage/${id}`)

  /**
   * @description: 查询角色列表
   */
  const getRoleList = (params: RoleQueryParams) =>
    get<PaginatingQueryList<Role>>('/system-settings/role-manage', params)

  /**
   * @description: 新增角色
   */
  const insertRole = (body: InsertRole) =>
    post<Role>('/system-settings/role-manage', body)

  /**
   * @description: 更新菜单
   */
  const updateRole = ({ id, ...body }: Partial<InsertRole> & { id: string }) =>
    put<Role>(`/system-settings/role-manage/${id}`, body)

  /**
   * @description: 删除角色
   */
  const delRole = (id: string) =>
    del<Role>(`/system-settings/role-manage/${id}`)

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

  /**
   * @description: 获取角色权限
   */
  const getRolePermissions = (roleId: string) =>
    get<RoleMenu[]>(`/system-settings/role-manage/${roleId}/permissions`)

  /**
   * @description: 保存角色权限
   */
  const insertRolePermissions = (body: InsertRolePermission & { roleId: string }) =>
    post<RoleMenu[]>(`/system-settings/role-manage/${body.roleId}/permissions`, body)

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
    getUserList,
    getRoleList,
    insertRole,
    updateRole,
    delRole,
    insertRolePermissions,
    getRolePermissions,
  }
}
