/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-22 17:28:59
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-17 15:34:06
 * @Description: 新增角色
 */
import { db } from '@/db/drizzle'
import { insertRolesSchema, roles } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const parsed = insertRolesSchema.parse(body)

    const [res] = await db
      .insert(roles)
      .values(parsed)
      .returning()

    return responseSuccess(res)
  }
  catch (error) {
    const dbError = (error as unknown as any)?.cause

    // PostgreSQL 唯一约束冲突
    if (dbError?.code === RESPONSE_CODE.UNIQUE_VIOLATION) {
      const constraint = dbError?.constraint

      switch (constraint) {
        case 'roles_name_unique':
          return responseSuccess(null, '角色名称已存在', RESPONSE_CODE.BAD_REQUEST)

        case 'roles_code_unique':
          return responseSuccess(null, '角色编码已存在', RESPONSE_CODE.BAD_REQUEST)

        default:
          return responseSuccess(null, '数据已存在', RESPONSE_CODE.BAD_REQUEST)
      }
    }
    return responseError(error)
  }
})
