import type { I18N_LOCALES, METHODS, RESPONSE_CODE } from '@/enums'

/** @description: 业务状态码 */
export type ResponseCode = typeof RESPONSE_CODE.valueType

/** @description: 请求方式 */
export type Methods = typeof METHODS.valueType

/** @description: 多语言 */
export type Locale = typeof I18N_LOCALES.valueType
