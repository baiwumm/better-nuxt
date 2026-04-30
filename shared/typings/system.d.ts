import type { logs, menu, user } from '@/db/schema'
import type { METHODS } from '@/enums'

declare global {
  namespace System {
    /** @description: 请求方式 */
    type Methods = typeof METHODS.valueType

    /** @description: 用户管理 */
    type User = typeof user.$inferSelect

    /** @description: 菜单树 */
    type Menu = typeof menu.$inferSelect
    type MenuTree = Menu & {
      children: MenuTree[]
    }

    /** @description: 新增菜单 */
    type InsertMenu = typeof menu.$inferInsert

    /** @description: 更新菜单 */
    type UpdateMenu = Partial<InsertMenu> & { id: string }

    /** @description: 操作日志 */
    type Log = typeof logs.$inferSelect & {
      user: User
    }

    /** @description: 操作日志 - 查询 */
    type LogParams = Partial<{
      userId: string
      method: Methods
    }>
  }
}
