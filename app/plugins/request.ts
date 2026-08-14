/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-19 11:10:04
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-17 15:32:34
 * @Description: $fetch 请求封装
 */
import { defineNuxtPlugin, navigateTo, useCookie, useRequestHeaders } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { start, finish } = useLoadingIndicator()
  const toast = useToast()

  const request = $fetch.create({
    baseURL: '/api',
    timeout: 30 * 1000, // 超时时间，默认 30 秒
    // 请求拦截
    async onRequest({ options }) {
      start({ force: true })

      /**
       * 🔐 认证注入：
       * - SSR：服务端内部请求不自动携带 Cookie，须手动转发。
       *   BetterAuth 会话校验只认 Cookie（cookie 名 better-auth.session_token），不解析 Authorization
       * - 客户端：浏览器同源请求自动携带 Cookie；补充注入 Authorization（备用）
       */
      if (import.meta.server) {
        const cookie = useRequestHeaders(['cookie']).cookie

        if (cookie) {
          options.headers.set('cookie', cookie)
        }

        return
      }

      const token = useCookie('better-auth.session_token').value

      if (token) {
        options.headers.set('Authorization', `Bearer ${token}`)
      }
    },

    // 响应成功
    async onResponse({ response }) {
      finish()

      // 统一响应数据
      const res = response._data as IResponse
      if (!isSuccess(res.code)) {
        toast.add({
          title: res.msg || 'Request failed, please try again later',
          color: 'error',
          icon: 'lucide:x',
        })
      }
    },

    // 响应错误
    async onResponseError({ response, error }) {
      finish()

      const res = response?._data as IResponse | undefined

      // 401
      if (res?.code === RESPONSE_CODE.UNAUTHORIZED) {
        toast.add({
          title: 'Your login has expired. Please log in again!',
          color: 'error',
        })

        // 重定向到登录页（真实路由为 /auth/sign-in）
        await nuxtApp.runWithContext(() => navigateTo('/auth/sign-in'))

        // 401 已单独提示，避免重复 toast
        return
      }

      toast.add({
        title: catchError(error),
        color: 'error',
      })
    },
  })

  return {
    provide: {
      request,
    },
  }
})
