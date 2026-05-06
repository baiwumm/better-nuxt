import { z } from 'zod'

/**
 * @description: 菜单管理 - 查询参数
 */
export const MenuQuerySchema = z.object({
  keyword: z.string().optional(),
  enabled: z
    .enum(['true', 'false'])
    .transform(val => val === 'true')
    .optional()
    .catch(undefined),
})

/**
 * @description: 国际化 - 查询参数
 */
export const InternalizationQuerySchema = z.object({
  name: z.string().optional(),
  zh: z.string().optional(),
  startTime: z.coerce.number().optional(),
  endTime: z.coerce.number().optional(),
})

/**
 * @description: 操作日志 - 查询参数
 */
export const LogQuerySchema = z.object({
  userId: z.string().optional(),
  method: z.preprocess(
    v => v === '' ? undefined : v,
    z.enum(['GET', 'POST', 'PUT', 'DELETE']).optional(),
  ),
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
})
