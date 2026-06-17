/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-22 17:30:08
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-17 15:33:09
 * @Description: 编辑部门
 */
import { eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { departments, updateDepartmentsSchema } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params!.id
    const body = await readBody(event)

    const parsed = updateDepartmentsSchema.parse(body)

    if (!id) {
      return responseSuccess(null, '缺少参数 id', RESPONSE_CODE.BAD_REQUEST)
    }

    const [res] = await db
      .update(departments)
      .set(parsed)
      .where(eq(departments.id, id))
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
