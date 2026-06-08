/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-25 11:17:31
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-08 16:59:00
 * @Description: 保存角色权限
 */
import { eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { roleMenus } from '@/db/schema'
import { RESPONSE_CODE } from '@/enums'

export default defineEventHandler(async (event) => {
  try {
    const roleId = getRouterParam(event, 'id')
    const body = await readBody(event)

    const { permissions } = RolePermissionSchema.parse(body)

    if (!roleId) {
      return responseSuccess(null, '缺少参数 roleId', RESPONSE_CODE.BAD_REQUEST)
    }

    const res = await db.transaction(async (tx) => {
    // 1️⃣ 删除旧权限
      await tx
        .delete(roleMenus)
        .where(eq(roleMenus.roleId, roleId))

      // 2️⃣ 插入新权限
      if (permissions.length > 0) {
        const inserted = await tx.insert(roleMenus).values(
          permissions.map(p => ({
            roleId,
            menuId: p.menuId,
            permissions: p.permissions,
          })),
        ).returning()
        return inserted
      }
      return []
    })

    return responseSuccess(res)
  }
  catch (error) {
    return responseError(error)
  }
})
