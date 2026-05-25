/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-22 17:21:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-25 13:55:12
 * @Description: 查询角色关联的权限
 */
import { eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { menu, role, roleMenu } from '@/db/schema'
import { RESPONSE_CODE } from '@/enums'

export default defineEventHandler(async (event) => {
  try {
    const roleId = getRouterParam(event, 'id')

    if (!roleId) {
      return responseSuccess(null, '缺少参数 id', RESPONSE_CODE.BAD_REQUEST)
    }

    // 可选：检查角色是否存在
    const roleInfo = await db.query.role.findFirst({
      where: eq(role.id, roleId),
      columns: {
        id: true,
      },
    })

    if (!roleInfo) {
      return responseSuccess(null, '角色不存在', RESPONSE_CODE.BAD_REQUEST)
    }

    const menus = await db
      .select({
        menuId: roleMenu.menuId,
        permissions: roleMenu.permissions,
      })
      .from(roleMenu)
      .leftJoin(menu, eq(roleMenu.menuId, menu.id))
      .where(eq(roleMenu.roleId, roleId))

    return responseSuccess(menus)
  }
  catch (err) {
    return responseError(err)
  }
})
