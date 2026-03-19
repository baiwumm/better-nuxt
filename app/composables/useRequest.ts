import type { FetchOptions } from 'ofetch'

type RequestOptions = FetchOptions<'json', any>

export function useRequest() {
  const { $request } = useNuxtApp()

  /**
   * 🔥 通用请求
   */
  const request = <T = unknown>(url: string, options?: RequestOptions) => {
    return $request<T>(url, options)
  }

  /**
   * @description: GET 请求
   */
  const get = <T = unknown>(url: string, params?: any, options?: RequestOptions) => {
    return request<T>(url, {
      method: 'GET',
      params,
      ...options,
    })
  }

  /**
   * @description: POST 请求
   */
  const post = <T = unknown>(url: string, body?: any, options?: RequestOptions) => {
    return request<T>(url, {
      method: 'POST',
      body,
      ...options,
    })
  }

  /**
   * @description: PUT 请求
   */
  const put = <T = unknown>(url: string, body?: any, options?: RequestOptions) => {
    return request<T>(url, {
      method: 'PUT',
      body,
      ...options,
    })
  }

  /**
   * @description: DELETE 请求
   */
  const del = <T = any>(url: string, params?: any, options?: RequestOptions) => {
    return request<T>(url, {
      method: 'DELETE',
      params,
      ...options,
    })
  }

  return {
    request,
    get,
    post,
    put,
    del,
  }
}
