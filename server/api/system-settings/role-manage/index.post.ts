/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-22 17:28:59
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-22 17:59:50
 * @Description: 新增角色
 */
import { db } from '@/db/drizzle'
import { insertRoleSchema, role } from '@/db/schema'
import { RESPONSE_CODE } from '@/enums'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const parsed = insertRoleSchema.parse(body)

    const [res] = await db
      .insert(role)
      .values(parsed)
      .returning()

    return responseSuccess(res)
  }
  catch (error) {
    const dbError = (error as unknown as any)?.cause

    // PostgreSQL 唯一约束冲突
    if (dbError?.code === '23505') {
      const constraint = dbError?.constraint

      switch (constraint) {
        case 'role_name_unique':
          return responseSuccess(null, '角色名称已存在', RESPONSE_CODE.BAD_REQUEST)

        case 'role_code_unique':
          return responseSuccess(null, '角色编码已存在', RESPONSE_CODE.BAD_REQUEST)

        default:
          return responseSuccess(null, '数据已存在', RESPONSE_CODE.BAD_REQUEST)
      }
    }
    return responseError(error)
  }
})
