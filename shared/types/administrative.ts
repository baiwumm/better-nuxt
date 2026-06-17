import type { z } from 'zod'
import type { departments, insertDepartmentsSchema, insertNoticesSchema, insertPostsSchema, noticeReads, notices, posts } from '@/db/schema'

/** @description: 已读 */
export type NoticeReads = typeof noticeReads.$inferSelect & {
  user: User
  notice: Notice
}

/** @description: 消息公告 */
export type Notice = typeof notices.$inferSelect & {
  author: User
  reads: NoticeReads[]
  isRead: boolean
}
export type NoticeQueryParams = z.infer<typeof NoticesQuerySchema>
export type InsertNotice = z.infer<typeof insertNoticesSchema>

/** @description: 部门管理 */
export type Department = typeof departments.$inferSelect & {
  leader: User
  posts: Post[]
}
export type DepartmentTree = Department & {
  children: DepartmentTree[]
}
export type InsertDepartment = z.infer<typeof insertDepartmentsSchema>
export type DepartmentQueryParams = z.infer<typeof DepartmentQuerySchema>

/** @description: 岗位管理 */
export type Post = typeof posts.$inferSelect & {
  department: Department | null
}
export type PostQueryParams = z.infer<typeof PostQuerySchema>
export type InsertPost = z.infer<typeof insertPostsSchema>
