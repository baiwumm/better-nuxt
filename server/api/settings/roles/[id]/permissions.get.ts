/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-22 17:21:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-08 16:58:51
 * @Description: 查询角色关联的权限
 */
import { eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { menus, roleMenus, roles } from '@/db/schema'
import { RESPONSE_CODE } from '@/enums'

export default defineEventHandler(async (event) => {
  try {
    const roleId = getRouterParam(event, 'id')

    if (!roleId) {
      return responseSuccess(null, '缺少参数 id', RESPONSE_CODE.BAD_REQUEST)
    }

    // 可选：检查角色是否存在
    const roleInfo = await db.query.roles.findFirst({
      where: eq(roles.id, roleId),
      columns: {
        id: true,
      },
    })

    if (!roleInfo) {
      return responseSuccess(null, '角色不存在', RESPONSE_CODE.BAD_REQUEST)
    }

    const permissions = await db
      .select({
        menuId: roleMenus.menuId,
        permissions: roleMenus.permissions,
      })
      .from(roleMenus)
      .leftJoin(menus, eq(roleMenus.menuId, menus.id))
      .where(eq(roleMenus.roleId, roleId))

    return responseSuccess(permissions)
  }
  catch (err) {
    return responseError(err)
  }
})
