/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-22 17:31:28
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-10 09:15:31
 * @Description: 删除部门
 */
import { eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { departments } from '@/db/schema'
import { RESPONSE_CODE } from '@/enums'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params!.id

    if (!id) {
      return responseSuccess(null, '缺少参数 id', RESPONSE_CODE.BAD_REQUEST)
    }

    // 检查是否有子节点
    const children = await db
      .select()
      .from(departments)
      .where(eq(departments.parentId, id))

    if (children.length > 0) {
      return responseSuccess(null, '请先删除子部门', RESPONSE_CODE.CONFLICT)
    }

    const [res] = await db.delete(departments).where(eq(departments.id, id)).returning()

    return responseSuccess(res)
  }
  catch (err) {
    return responseError(err)
  }
})
