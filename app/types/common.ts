import type { RESPONSE_CODE } from '@/enums'

/**
 * @description: 统一接口结构
 */
export interface ApiResponse<T = unknown> {
  code: typeof RESPONSE_CODE.valueType
  msg: string
  data: T
  timestamp: number
}

/**
 * @description: 分页参数（请求）
 */
export interface PageParams {
  page: number
  pageSize: number
}

/**
 * @description: 分页结果（响应）
 */
export interface PageResult<T = unknown> {
  list: T[]
  total: number
}
