import type { RESPONSE_CODE } from '@/enums'

declare global {
  namespace Api {
    /** @description: 业务状态码 */
    type ResponseCode = typeof RESPONSE_CODE.valueType

    /** @description: 请求分页参数 */
    interface PaginatingParams {
      page: number // 页码
      pageSize: number // 条数
    }

    /** @description: 分页列表 */
    interface PaginatingQueryList<T = unknown> {
      list: T[]
      total: number // 总条数
    }

    /** @description: 响应体 */
    interface IResponse<T = unknown> {
      code: ResponseCode
      data: T // 数据
      msg: string // 消息
      timestamp: number
    }
  }
}
