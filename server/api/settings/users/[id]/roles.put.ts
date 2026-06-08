/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-26 10:42:50
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-26 10:48:15
 * @Description: 更新用户角色
 */
import { eq, inArray } from 'drizzle-orm'
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

    const body = await readValidatedBody(event, UpdateUserRolesSchema.parse)
    const { roleIds } = body

    // 校验角色是否存在
    if (roleIds.length) {
      const existsRoles = await db
        .select({ id: role.id })
        .from(role)
        .where(inArray(role.id, roleIds))

      if (existsRoles.length !== roleIds.length) {
        return responseSuccess(null, '部分角色不存在!', RESPONSE_CODE.BAD_REQUEST)
      }
    }

    const res = await db.transaction(async (tx) => {
    // 删除旧角色
      await tx
        .delete(userRole)
        .where(eq(userRole.userId, userId))

      // 插入新角色
      if (roleIds.length) {
        const inserted = await tx.insert(userRole).values(
          roleIds.map(roleId => ({
            userId,
            roleId,
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
