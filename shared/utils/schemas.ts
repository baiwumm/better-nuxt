import { z } from 'zod'

/**
 * @description: 用户列表 - 查询参数
 */
export const UserQuerySchema = z.object({
  keyword: z.string().optional(),
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
})

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
 * @description: 角色管理 - 查询参数
 */
export const RoleQuerySchema = z.object({
  name: z.string().optional(),
  code: z.string().optional(),
  enabled: z
    .enum(['true', 'false'])
    .transform(val => val === 'true')
    .optional()
    .catch(undefined),
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
})

/**
 * @description: 国际化 - 查询参数
 */
export const I18nQuerySchema = z.object({
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

/**
 * @description: 插入角色权限
 */
export const RolePermissionSchema = z.object({
  permissions: z.array(
    z.object({
      menuId: z.string().min(1),
      permissions: z.number().int(),
    }),
  ),
})

/**
 * @description: 更新用户角色
 */
export const UpdateUserRolesSchema = z.object({
  roleIds: z.array(z.string()).default([]),
})

/**
 * @description: 部门管理 - 查询参数
 */
export const DepartmentQuerySchema = z.object({
  name: z.string().optional(),
  code: z.string().optional(),
})

/**
 * @description: 岗位管理 - 查询参数
 */
export const PostQuerySchema = z.object({
  name: z.string().optional(),
  code: z.string().optional(),
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
})
