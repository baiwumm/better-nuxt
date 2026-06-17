/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-26 10:40:13
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-17 15:34:17
 * @Description: 获取用户角色
 */
import { eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { roles, userRoles, users } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const userId = getRouterParam(event, 'id')

    if (!userId) {
      return responseSuccess(null, '缺少参数 id', RESPONSE_CODE.BAD_REQUEST)
    }

    // 可选：检查用户是否存在
    const userInfo = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        id: true,
      },
    })

    if (!userInfo) {
      return responseSuccess(null, '用户不存在', RESPONSE_CODE.BAD_REQUEST)
    }

    // 查询用户角色
    const list = await db
      .select({
        id: roles.id,
        name: roles.name,
        code: roles.code,
      })
      .from(userRoles)
      .innerJoin(roles, eq(userRoles.roleId, roles.id))
      .where(eq(userRoles.userId, userId))

    return responseSuccess(list)
  }
  catch (err) {
    return responseError(err)
  }
})
