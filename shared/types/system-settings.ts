import type { z } from 'zod'
import type { insertMenuSchema, insertRoleSchema, internalization, ipGeo, logs, menu, role, roleMenu, user, userRole } from '@/db/schema'

/** @description: 用户管理列表 */
export type User = typeof user.$inferSelect & {
  roles: (UserRole & {
    role: Role
  })[]
}
/** @description: 用户管理 - 查询参数 */
export type UserQueryParams = z.infer<typeof UserQuerySchema>
export type UpdateUserRoles = z.infer<typeof UpdateUserRolesSchema>
export type UserRole = typeof userRole.$inferSelect

/** @description: 菜单树 */
export type Menu = typeof menu.$inferSelect
export type MenuTree = Menu & {
  children: MenuTree[]
}
export type InsertMenu = z.infer<typeof insertMenuSchema>

/** @description: 角色管理列表 */
export type Role = typeof role.$inferSelect & {
  menus: (RoleMenu & {
    menu: Menu
  })[]
  users: (UserRole & {
    user: User
  })[]
}
/** @description: 角色管理 - 查询参数 */
export type RoleQueryParams = z.infer<typeof RoleQuerySchema>
export type InsertRole = z.infer<typeof insertRoleSchema>
/** @description: 角色管理 - 角色授权 */
export type RoleMenu = typeof roleMenu.$inferSelect
export type InsertRolePermission = z.infer<typeof RolePermissionSchema>

/** @description: 国际化 - 查询参数 */
export type MenuQueryParams = z.infer<typeof MenuQuerySchema>

/** @description: 国际化列表 */
export type Internalization = typeof internalization.$inferSelect
export type InternalizationTree = Internalization & {
  children: InternalizationTree[]
}

/** @description: 国际化 - 查询参数 */
export type InternalizationQueryParams = z.infer<typeof InternalizationQuerySchema>

/** @description: 操作日志 */
export type IpGeo = typeof ipGeo.$inferSelect
export type Log = typeof logs.$inferSelect & {
  user: User
  geo: IpGeo | null
}

/** @description: 操作日志 - 查询参数 */
export type LogQueryParams = z.infer<typeof LogQuerySchema>
