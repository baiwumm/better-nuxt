/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-29 09:58:47
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-04 02:05:15
 * @Description: 接口鉴权
 */
import { auth } from '#server/utils/auth'
import { RESPONSE_CODE } from '@/enums'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // 获取用户会话信息
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  // 放行鉴权接口
  if (event.path.startsWith('/api/auth'))
    return

  if (!session?.user?.id) {
    return responseSuccess(null, '未登录', RESPONSE_CODE.UNAUTHORIZED)
  }

  // 检查环境
  const isDev = config.env === 'development'

  if (!isDev || session?.user?.email !== config.authEmail) {
    return responseSuccess(
      null,
      '别点了，点一百遍也是同一个回复：『已阅，但不执行』',
      RESPONSE_CODE.FORBIDDEN,
    )
  }
})
