import type { z } from 'zod'
import type { internalization, logs, menu, user } from '@/db/schema'

/** @description: 用户管理列表 */
export type User = typeof user.$inferSelect

/** @description: 菜单树 */
export type Menu = typeof menu.$inferSelect
export type MenuTree = Menu & {
  children: MenuTree[]
}

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
export type Log = typeof logs.$inferSelect & {
  user: User
}

/** @description: 操作日志 - 查询参数 */
export type LogQueryParams = z.infer<typeof LogQuerySchema>
