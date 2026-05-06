/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-29 09:58:47
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-06 16:47:51
 * @Description: 接口鉴权
 */
import { auth } from '#server/utils/auth'
import { RESPONSE_CODE } from '@/enums'

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const path = url.pathname
  const method = event.method

  // 只处理 API
  if (!path.startsWith('/api'))
    return

  // GET 请求放行
  if (method === 'GET') {
    return
  }

  // 🚫 忽略 Nuxt 内部 API（关键）
  if (path.startsWith('/api/_'))
    return

  // 🚫 放行 auth
  if (path.startsWith('/api/auth'))
    return

  const config = useRuntimeConfig()

  // 获取用户会话信息
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!session?.user?.id) {
    return responseSuccess(null, '未登录', RESPONSE_CODE.UNAUTHORIZED)
  }

  // 检查环境
  const isDev = config.env === 'development'

  if (!isDev && session?.user?.email !== config.authEmail) {
    return responseSuccess(
      null,
      '别点了，我就知道您不按规矩办事！',
      RESPONSE_CODE.FORBIDDEN,
    )
  }
})
