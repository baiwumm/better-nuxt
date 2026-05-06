import type { ResponseCode } from './common'

/** @description: 请求分页参数 */
export interface PaginatingParams {
  page: number // 页码
  pageSize: number // 条数
}

/** @description: 分页列表 */
export interface PaginatingQueryList<T = unknown> {
  list: T[]
  total: number // 总条数
}

/** @description: 响应体 */
export interface IResponse<T = unknown> {
  code: ResponseCode
  data: T // 数据
  msg: string // 消息
  timestamp: number
}
