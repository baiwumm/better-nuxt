/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-29 09:58:47
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-17 15:34:24
 * @Description: 接口鉴权
 */

// 白名单
const whiteList = [
  '/api/account/avatar',
  // 登录/注册/重置密码页依赖的 i18n 词条（未登录可读）
  '/api/settings/i18n/locales',
]

// 需登录但不要求管理员身份的写操作路径（如普通用户标记通知已读）
const loginOnlyWritePaths = /^\/api\/administrative\/notices\/[^/]+\/read$/

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const path = url.pathname
  const method = event.method

  // 只处理 API
  if (!path.startsWith('/api'))
    return

  // 🚫 忽略 Nuxt 内部 API（关键）
  if (path.startsWith('/api/_'))
    return

  // 🚫 放行 auth
  if (path.startsWith('/api/auth'))
    return

  // 🚫 放行 白名单
  if (whiteList.includes(path))
    return

  const config = useRuntimeConfig()

  // 获取用户会话信息
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!session?.user?.id) {
    // 鉴权失败设置真实 HTTP 状态码（body 仍保留统一 IResponse 结构）
    setResponseStatus(event, RESPONSE_CODE.UNAUTHORIZED)
    return responseSuccess(null, '未登录', RESPONSE_CODE.UNAUTHORIZED)
  }

  // GET 请求仅要求登录（管理数据接口不再对未登录用户放行）
  if (method === 'GET')
    return

  // 需登录但不要求管理员身份的写操作（如普通用户标记通知已读）
  if (loginOnlyWritePaths.test(path))
    return

  // 检查环境
  const isDev = config.env === 'development'

  if (!isDev && !config.adminEmail.split(',').includes(session?.user?.email)) {
    setResponseStatus(event, RESPONSE_CODE.FORBIDDEN)
    return responseSuccess(
      null,
      '别点了，我就知道您不按规矩办事！',
      RESPONSE_CODE.FORBIDDEN,
    )
  }
})
