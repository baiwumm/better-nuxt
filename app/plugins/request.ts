/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-19 11:10:04
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-02 11:55:53
 * @Description: $fetch 请求封装
 */
import { defineNuxtPlugin, navigateTo, useCookie, useRuntimeConfig } from '#app'
import { RESPONSE_CODE } from '@/enums'

export default defineNuxtPlugin(() => {
  const { start, finish } = useLoadingIndicator()
  const config = useRuntimeConfig()
  const toast = useToast()

  const request = $fetch.create({
    baseURL: config.public.apiBase as string,
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
      const res = response._data as Api.IResponse<any>
      if (!isSuccess(res.code)) {
        toast.add({
          title: res.msg || RESPONSE_CODE.label(RESPONSE_CODE.SERVER_ERROR),
          color: 'error',
          icon: 'lucide:x',
        })
        return Promise.reject(res)
      }
      return res.data
    },

    // 响应错误
    async onResponseError({ response, error }) {
      finish()

      const res = response?._data as Api.IResponse | undefined

      // 401
      if (res?.code === RESPONSE_CODE.UNAUTHORIZED) {
        toast.add({
          title: '登录已过期，请重新登录',
          color: 'error',
        })

        // 重定向到登录页
        navigateTo('/login')

        return Promise.reject(res)
      }

      toast.add({
        title: catchError(error),
        color: 'error',
      })

      return Promise.reject(res || error)
    },
  })

  return {
    provide: {
      request,
    },
  }
})
