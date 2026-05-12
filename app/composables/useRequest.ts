type RequestOptions = Parameters<typeof $fetch>[1]

export function useRequest() {
  const { $request } = useNuxtApp()

  /**
   * 🔥 通用请求
   */
  const request = async <T = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<IResponse<T>> => {
    return await $request<IResponse<T>>(url, options)
  }

  /**
   * @description: GET 请求
   */
  const get = <T = unknown>(
    url: string,
    params?: Record<string, any>,
    options?: RequestOptions,
  ) => {
    return request<T>(url, {
      method: 'GET',
      params,
      ...options,
    })
  }

  /**
   * @description: POST 请求
   */
  const post = <T = unknown, B extends Record<string, any> = Record<string, any>>(
    url: string,
    body?: B,
    options?: RequestOptions,
  ) => {
    return request<T>(url, {
      method: 'POST',
      body,
      ...options,
    })
  }

  /**
   * @description: PUT 请求
   */
  const put = <T = unknown, B extends Record<string, any> = Record<string, any>>(
    url: string,
    body?: B,
    options?: RequestOptions,
  ) => {
    return request<T>(url, {
      method: 'PUT',
      body,
      ...options,
    })
  }

  /**
   * @description: DELETE 请求
   */
  const del = <T = unknown>(
    url: string,
    params?: Record<string, any>,
    options?: RequestOptions,
  ) => {
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
