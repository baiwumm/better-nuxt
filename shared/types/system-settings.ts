import type { z } from 'zod'
import type { insertInternalizationSchema, insertMenuSchema, internalization, logs, menu, updateInternalizationSchema, updateMenuSchema, user } from '@/db/schema'

/** @description: 用户管理列表 */
export type User = typeof user.$inferSelect

/** @description: 菜单树 */
export type Menu = typeof menu.$inferSelect
export type MenuTree = Menu & {
  children: MenuTree[]
}

/** @description: 国际化 - 查询参数 */
export type MenuQueryParams = z.infer<typeof MenuQuerySchema>

/** @description: 新增菜单 */
export type InsertMenu = z.infer<typeof insertMenuSchema>

/** @description: 更新菜单 */
export type UpdateMenu = z.infer<typeof updateMenuSchema>

/** @description: 国际化列表 */
export type Internalization = typeof internalization.$inferSelect
export type InternalizationTree = Internalization & {
  children: InternalizationTree[]
}

/** @description: 国际化 - 查询参数 */
export type InternalizationQueryParams = z.infer<typeof InternalizationQuerySchema>

/** @description: 新增国际化 */
export type InsertInternalization = z.infer<typeof insertInternalizationSchema>

/** @description: 更新国际化 */
export type UpdateInternalization = z.infer<typeof updateInternalizationSchema>

/** @description: 操作日志 */
export type Log = typeof logs.$inferSelect & {
  user: User
}

/** @description: 操作日志 - 查询参数 */
export type LogQueryParams = z.infer<typeof LogQuerySchema>
