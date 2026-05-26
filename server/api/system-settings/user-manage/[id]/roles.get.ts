/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-26 10:40:13
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-26 14:25:16
 * @Description: 获取用户角色
 */
import { eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { role, user, userRole } from '@/db/schema'
import { RESPONSE_CODE } from '@/enums'

export default defineEventHandler(async (event) => {
  try {
    const userId = getRouterParam(event, 'id')

    if (!userId) {
      return responseSuccess(null, '缺少参数 id', RESPONSE_CODE.BAD_REQUEST)
    }

    // 可选：检查用户是否存在
    const userInfo = await db.query.user.findFirst({
      where: eq(user.id, userId),
      columns: {
        id: true,
      },
    })

    if (!userInfo) {
      return responseSuccess(null, '用户不存在', RESPONSE_CODE.BAD_REQUEST)
    }

    // 查询用户角色
    const userRoles = await db
      .select({
        id: role.id,
        name: role.name,
        code: role.code,
      })
      .from(userRole)
      .innerJoin(role, eq(userRole.roleId, role.id))
      .where(eq(userRole.userId, userId))

    return responseSuccess(userRoles)
  }
  catch (err) {
    return responseError(err)
  }
})
