/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-22 17:28:59
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-09 09:23:47
 * @Description: 新增部门
 */
import { db } from '@/db/drizzle'
import { departments, insertDepartmentsSchema } from '@/db/schema'
import { RESPONSE_CODE } from '@/enums'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const parsed = insertDepartmentsSchema.parse(body)

    const [res] = await db
      .insert(departments)
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
        case 'departments_name_unique':
          return responseSuccess(null, '部门名称已存在', RESPONSE_CODE.BAD_REQUEST)

        case 'departments_code_unique':
          return responseSuccess(null, '部门编码已存在', RESPONSE_CODE.BAD_REQUEST)

        default:
          return responseSuccess(null, '数据已存在', RESPONSE_CODE.BAD_REQUEST)
      }
    }
    return responseError(error)
  }
})
