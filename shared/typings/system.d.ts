import type { menu } from '@/db/schema'

declare global {
  namespace System {
    /** @description: 菜单树 */
    type Menu = typeof menu.$inferSelect
    type MenuTree = Menu & {
      children: MenuTree[]
    }

    /** @description: 新增菜单 */
    type InsertMenu = typeof menu.$inferInsert

    /** @description: 更新菜单 */
    type UpdateMenu = Partial<InsertMenu> & { id: string }
  }
}
