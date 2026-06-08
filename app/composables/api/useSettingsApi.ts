/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-23 14:45:58
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-08 17:15:30
 * @Description: 系统设置模块
 */
export function useSettingsApi() {
  const { get, post, put, del } = useRequest()

  /**
   * @description: 查询用户列表
   */
  const getUserList = (params?: UserQueryParams) =>
    get<PaginatingQueryList<User>>('/settings/users', params)

  /**
   * @description: 查询菜单
   */
  const getMenuList = (params?: MenuQueryParams) =>
    get<MenuTree[]>('/settings/menus', params)

  /**
   * @description: 新增菜单
   */
  const insertMenu = (body: InsertMenu) =>
    post<Menu>('/settings/menus', body)

  /**
   * @description: 更新菜单
   */
  const updateMenu = ({ id, ...body }: Partial<InsertMenu> & { id: string }) =>
    put<Menu>(`/settings/menus/${id}`, body)

  /**
   * @description: 删除菜单
   */
  const delMenu = (id: string) =>
    del<Menu>(`/settings/menus/${id}`)

  /**
   * @description: 查询角色列表
   */
  const getRoleList = (params: RoleQueryParams) =>
    get<PaginatingQueryList<Role>>('/settings/roles', params)

  /**
   * @description: 新增角色
   */
  const insertRole = (body: InsertRole) =>
    post<Role>('/settings/roles', body)

  /**
   * @description: 更新菜单
   */
  const updateRole = ({ id, ...body }: Partial<InsertRole> & { id: string }) =>
    put<Role>(`/settings/roles/${id}`, body)

  /**
   * @description: 删除角色
   */
  const delRole = (id: string) =>
    del<Role>(`/settings/roles/${id}`)

  /**
   * @description: 查询日志
   */
  const getLogsList = (params: LogQueryParams) =>
    get<PaginatingQueryList<Log>>('/settings/logs', params)

  /**
   * @description: 批量删除
   */
  const delLogs = (params: { ids: string[] }) =>
    del<Log[]>('/settings/logs', {}, { body: params })

  /**
   * @description: 用户列表（去重）
   */
  const getLogsUserList = () =>
    get<User[]>('/settings/logs/users')

  /**
   * @description: 获取 i18n 多语言层级数据
   */
  const getLocales = () =>
    get<Record<Locale, any>>('/settings/i18n/locales')

  /**
   * @description: 查询国际化
   */
  const getI18nList = (params?: I18nQueryParams) =>
    get<I18nTree[]>('/settings/i18n', params)

  /**
   * @description: 新增国际化
   */
  const insertI18n = (body: I18nFormSchema) =>
    post<I18n>('/settings/i18n', body)

  /**
   * @description: 更新国际化
   */
  const updateI18n = ({ id, ...body }: Partial<I18nFormSchema> & { id: string }) =>
    put<I18n>(`/settings/i18n/${id}`, body)

  /**
   * @description: 删除国际化
   */
  const delI18n = (id: string) =>
    del<I18n>(`/settings/i18n/${id}`)

  /**
   * @description: 获取角色权限
   */
  const getRolePermissions = (roleId: string) =>
    get<RoleMenu[]>(`/settings/roles/${roleId}/permissions`)

  /**
   * @description: 保存角色权限
   */
  const insertRolePermissions = (body: InsertRolePermission & { roleId: string }) =>
    post<RoleMenu[]>(`/settings/roles/${body.roleId}/permissions`, body)

  /**
   * @description: 获取用户角色
   */
  const getUserRoles = (userId: string) =>
    get<Role[]>(`/settings/users/${userId}/roles`)

  /**
   * @description: 更新用户角色
   */
  const updateUserRoles = (body: { userId: string } & UpdateUserRoles) =>
    put<UserRole[]>(`/settings/users/${body.userId}/roles`, body)

  return {
    getMenuList,
    insertMenu,
    updateMenu,
    delMenu,
    getLogsList,
    delLogs,
    getLogsUserList,
    getLocales,
    getI18nList,
    insertI18n,
    updateI18n,
    delI18n,
    getUserList,
    getRoleList,
    insertRole,
    updateRole,
    delRole,
    insertRolePermissions,
    getRolePermissions,
    getUserRoles,
    updateUserRoles,
  }
}
