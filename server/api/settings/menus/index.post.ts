/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-23 09:22:09
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-08 16:57:57
 * @Description: 新增菜单
 */
import { db } from '@/db/drizzle'
import { insertMenusSchema, menus } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const parsed = insertMenusSchema.parse(body)

    const [res] = await db
      .insert(menus)
      .values(parsed)
      .returning()

    return responseSuccess(res)
  }
  catch (error) {
    return responseError(error)
  }
})
