/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-19 11:10:04
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-17 15:32:34
 * @Description: $fetch 请求封装
 */
import { defineNuxtPlugin, navigateTo, useCookie } from '#app'

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
       * 🔐 注入 token（BetterAuth）
       */
      const token = useCookie('better-auth.session-token').value

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

        // 重定向到登录页
        await nuxtApp.runWithContext(() => navigateTo('/login'))
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
