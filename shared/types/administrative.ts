import type { z } from 'zod'
import type { departments, insertDepartmentsSchema, insertPostsSchema, posts } from '@/db/schema'

/** @description: 部门管理 */
export type Department = typeof departments.$inferSelect & {
  leader: User | null
  posts: Post[]
}
export type DepartmentTree = Department & {
  children: DepartmentTree[]
}
export type InsertDepartment = z.infer<typeof insertDepartmentsSchema>
export type DepartmentQueryParams = z.infer<typeof DepartmentQuerySchema>

/** @description: 岗位管理 - 查询参数 */
export type Post = typeof posts.$inferSelect & {
  department: Department | null
}
export type PostQueryParams = z.infer<typeof PostQuerySchema>
export type InsertPost = z.infer<typeof insertPostsSchema>
