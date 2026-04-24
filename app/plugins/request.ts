/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-19 11:10:04
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-04-24 13:53:34
 * @Description: $fetch 请求封装
 */
import { defineNuxtPlugin, navigateTo, useCookie, useRuntimeConfig } from '#app'
import { BProgress } from '@bprogress/core'
import { ofetch } from 'ofetch'
import { RESPONSE_CODE } from '@/enums'

let requestCount = 0

/**
 * @description: 开始加载进度条
 */
function startLoading() {
  if (requestCount === 0) {
    BProgress.start()
  }
  requestCount++
}

/**
 * @description: 结束加载进度条
 */
function endLoading() {
  requestCount--
  if (requestCount <= 0) {
    BProgress.done()
    requestCount = 0
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const toast = useToast()

  const request = ofetch.create({
    baseURL: config.public.apiBase as string,
    timeout: 30 * 1000, // 超时时间，默认 30 秒
    // 请求拦截
    async onRequest({ options }) {
      startLoading()

      /**
       * 🔐 注入 token（BetterAuth）
       */
      const token = useCookie('better-auth.session-token').value

      if (token) {
        const headers = new Headers(options.headers || {})
        headers.set('Authorization', `Bearer ${token}`)
        options.headers = headers
      }
    },

    // 响应成功
    async onResponse({ response }) {
      endLoading()

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
      endLoading()

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
