/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-23 10:08:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-04-29 14:29:58
 * @Description: 删除
 */
import { eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { menu } from '@/db/schema'
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
      .from(menu)
      .where(eq(menu.parentId, id))

    if (children.length > 0) {
      return responseSuccess(null, '请先删除子菜单', RESPONSE_CODE.CONFLICT)
    }

    const [res] = await db.delete(menu).where(eq(menu.id, id)).returning()

    return responseSuccess(res)
  }
  catch (err) {
    return responseError(err)
  }
})
