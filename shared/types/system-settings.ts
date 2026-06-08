import type { z } from 'zod'
import type { i18n, insertMenusSchema, insertRolesSchema, ipGeos, logs, menus, roleMenus, roles, userRoles, users } from '@/db/schema'

/** @description: 用户管理列表 */
export type User = typeof users.$inferSelect & {
  roles: (UserRole & {
    role: Role
  })[]
}
/** @description: 用户管理 - 查询参数 */
export type UserQueryParams = z.infer<typeof UserQuerySchema>
export type UpdateUserRoles = z.infer<typeof UpdateUserRolesSchema>
export type UserRole = typeof userRoles.$inferSelect

/** @description: 菜单树 */
export type Menu = typeof menus.$inferSelect
export type MenuTree = Menu & {
  children: MenuTree[]
}
export type InsertMenu = z.infer<typeof insertMenusSchema>

/** @description: 角色管理列表 */
export type Role = typeof roles.$inferSelect & {
  menus: (RoleMenu & {
    menu: Menu
  })[]
  users: (UserRole & {
    user: User
  })[]
}
/** @description: 角色管理 - 查询参数 */
export type RoleQueryParams = z.infer<typeof RoleQuerySchema>
export type InsertRole = z.infer<typeof insertRolesSchema>
/** @description: 角色管理 - 角色授权 */
export type RoleMenu = typeof roleMenus.$inferSelect
export type InsertRolePermission = z.infer<typeof RolePermissionSchema>

/** @description: 国际化 - 查询参数 */
export type MenuQueryParams = z.infer<typeof MenuQuerySchema>

/** @description: 国际化列表 */
export type I18n = typeof i18n.$inferSelect
export type I18nTree = I18n & {
  children: I18nTree[]
}

/** @description: 国际化 - 查询参数 */
export type I18nQueryParams = z.infer<typeof InternalizationQuerySchema>

/** @description: 操作日志 */
export type IpGeo = typeof ipGeos.$inferSelect
export type Log = typeof logs.$inferSelect & {
  user: User
  geo: IpGeo | null
}

/** @description: 操作日志 - 查询参数 */
export type LogQueryParams = z.infer<typeof LogQuerySchema>
