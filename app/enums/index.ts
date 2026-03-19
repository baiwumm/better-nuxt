import { Enum } from 'enum-plus'

/**
 * @description: HTTP 状态码（可根据实际需求添加业务状态码）
 */
export const RESPONSE_CODE = Enum({
  SUCCESS: { value: 200, label: '请求成功' },
  BAD_REQUEST: { value: 400, label: '请求参数错误' },
  UNAUTHORIZED: { value: 401, label: '未登录或 token 失效' },
  FORBIDDEN: { value: 403, label: '没有权限' },
  NOT_FOUND: { value: 404, label: '资源不存在' },
  SERVER_ERROR: { value: 500, label: '服务器错误' },
})
