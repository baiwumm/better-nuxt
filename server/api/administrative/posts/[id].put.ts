/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-22 17:30:08
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-10 10:37:00
 * @Description: 编辑岗位
 */
import { eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { posts, updatePostsSchema } from '@/db/schema'
import { RESPONSE_CODE } from '@/enums'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params!.id
    const body = await readBody(event)

    const parsed = updatePostsSchema.parse(body)

    if (!id) {
      return responseSuccess(null, '缺少参数 id', RESPONSE_CODE.BAD_REQUEST)
    }

    const [res] = await db
      .update(posts)
      .set(parsed)
      .where(eq(posts.id, id))
      .returning()

    return responseSuccess(res)
  }
  catch (error) {
    const dbError = (error as unknown as any)?.cause

    // PostgreSQL 唯一约束冲突
    if (dbError?.code === RESPONSE_CODE.UNIQUE_VIOLATION) {
      const constraint = dbError?.constraint

      switch (constraint) {
        case 'posts_name_unique':
          return responseSuccess(null, '岗位名称已存在', RESPONSE_CODE.BAD_REQUEST)

        case 'posts_code_unique':
          return responseSuccess(null, '岗位编码已存在', RESPONSE_CODE.BAD_REQUEST)

        default:
          return responseSuccess(null, '数据已存在', RESPONSE_CODE.BAD_REQUEST)
      }
    }
    return responseError(error)
  }
})
