import type { ApiResponse } from '@/types/common'
import { RESPONSE_CODE } from '@/enums'

/**
 * @description: 请求成功
 */
export function responseSuccess(data: unknown): ApiResponse {
  return { data, msg: RESPONSE_CODE.label(RESPONSE_CODE.SUCCESS), code: RESPONSE_CODE.SUCCESS, timestamp: Date.now() }
}

/**
 * @description: 请求失败
 */
export function responseError(data: unknown, msg = RESPONSE_CODE.label(RESPONSE_CODE.SERVER_ERROR)): ApiResponse {
  return { data, msg, code: RESPONSE_CODE.SERVER_ERROR, timestamp: Date.now() }
}

/**
 * @description: 判断请求是否成功
 */
export const isSuccess = (code: ApiResponse['code']) => code === RESPONSE_CODE.SUCCESS

/**
 * @description: 统一处理 catch 错误
 */
export function catchError(err: unknown): ApiResponse {
  let message = '未知错误'

  if (err instanceof Error) {
    message = err.message
  }
  else if (typeof err === 'string') {
    message = err
  }
  return responseError(null, message)
}
