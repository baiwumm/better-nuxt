import type { z } from 'zod'
import type { departments, insertDepartmentsSchema } from '@/db/schema'

/** @description: 部门管理 */
export type Department = typeof departments.$inferSelect & {
  leader: User | null
}
export type DepartmentTree = Department & {
  children: DepartmentTree[]
}
export type InsertDepartment = z.infer<typeof insertDepartmentsSchema>
export type DepartmentQueryParams = z.infer<typeof DepartmentQuerySchema>
