import type { AnyPgColumn } from 'drizzle-orm/pg-core'
import { relations, sql } from 'drizzle-orm'
import { boolean, index, integer, jsonb, pgEnum, pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod'
import { users } from '../../auth-schema'

export * from '../../auth-schema'

export const targetEnum = pgEnum('target_enum', [
  '_self',
  '_blank',
])

export const methodEnum = pgEnum('method', ['GET', 'POST', 'PUT', 'DELETE'])

export const noticesEnum = pgEnum('notice_type', [
  'notice',
  'message',
])

/**
 * @description: id
 */
export const id = text('id').primaryKey().default(sql`gen_random_uuid()`)

/**
 * @description: 父级 id
 */
export const parentId = text('parent_id')

/**
 * @description: 排序
 */
export const sort = integer('sort').default(0).notNull()

/**
 * @description: 创建时间
 */
export const createdAt = timestamp('created_at').defaultNow().notNull()

/**
 * @description: 更新时间
 */
export const updatedAt = timestamp('updated_at')
  .defaultNow()
  .$onUpdate(() => /* @__PURE__ */ new Date())
  .notNull()

/**
 * @description: 菜单管理
 */
export const menus = pgTable('menus', {
  id,
  // i18n key: pages.title
  label: text('label').notNull(),
  // icon: lucide:monitor
  icon: text('icon').notNull(),
  // route path: /
  to: text('to'),
  // badge: New
  badge: text('badge'),
  // 树形结构关键字段
  parentId: text('parent_id').references(
    (): AnyPgColumn => menus.id,
    {
      onDelete: 'restrict',
    },
  ),
  // 排序
  sort,
  // 是否缓存
  keepAlive: boolean('keep_alive').default(false).notNull(),
  // 是否在菜单中隐藏
  hideInMenu: boolean('hide_in_menu').default(false).notNull(),
  // 是否启用
  enabled: boolean('enabled').default(true).notNull(),
  // 是否默认打开
  defaultOpen: boolean('default_open').default(false).notNull(),
  // 是否新窗口打开
  target: targetEnum('target').default('_self').notNull(),
  // 按钮权限位
  permissions: integer('permissions').default(0).notNull(),
  createdAt,
  updatedAt,
}, t => ([
  index('menus_parent_idx').on(t.parentId),
  index('menus_sort_idx').on(t.parentId, t.sort),
]))
export const insertMenusSchema = createInsertSchema(menus).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const updateMenusSchema = createUpdateSchema(menus).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

/**
 * @description: 角色管理
 */
export const roles = pgTable('roles', {
  id,
  name: text('name').notNull().unique(),
  code: text('code').notNull().unique(),
  description: text('description'),
  // 是否启用
  enabled: boolean('enabled').default(true).notNull(),
  // 排序
  sort,
  createdAt,
  updatedAt,
})
export const insertRolesSchema = createInsertSchema(roles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const updateRolesSchema = createUpdateSchema(roles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

/**
 * @description: 角色关联菜单
 */
export const roleMenus = pgTable('role_menus', {
  roleId: text('role_id').notNull().references(() => roles.id, { onDelete: 'cascade' }),
  menuId: text('menu_id').notNull().references(() => menus.id, { onDelete: 'cascade' }),
  permissions: integer('permissions').default(0).notNull(),
  createdAt,
}, t => [
  primaryKey({
    columns: [t.roleId, t.menuId],
  }),
  index('role_menus_role_idx').on(t.roleId),
  index('role_menus_menu_idx').on(t.menuId),
])
export const insertRoleMenusSchema = createInsertSchema(roleMenus).omit({
  createdAt: true,
})

/**
 * @description: 用户关联角色
 */
export const userRoles = pgTable('user_roles', {
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  roleId: text('role_id').notNull().references(() => roles.id, { onDelete: 'cascade' }),
  createdAt,
}, t => [
  primaryKey({
    columns: [t.userId, t.roleId],
  }),
  index('user_roles_user_idx').on(t.userId),
  index('user_roles_role_idx').on(t.roleId),
])

export const insertUserRolesSchema = createInsertSchema(userRoles).omit({
  createdAt: true,
})

/**
 * @description: 国际化
 */
export const i18n = pgTable('i18n', {
  id,
  name: text('name').notNull(),
  // 中文
  zh: text('zh'),
  // 英文
  en: text('en'),
  // 树形结构关键字段
  parentId: text('parent_id').references(
    (): AnyPgColumn => i18n.id,
    {
      onDelete: 'restrict',
    },
  ),
  // 排序
  sort,
  createdAt,
  updatedAt,
}, t => ([
  index('i18n_parent_idx').on(t.parentId),
  index('i18n_sort_idx').on(t.parentId, t.sort),
]))
export const insertI18nSchema = createInsertSchema(i18n).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const updateI18nSchema = createUpdateSchema(i18n).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

/**
 * @description: 操作日志
 */
export const logs = pgTable('logs', {
  id,
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  ip: text('ip').notNull(),
  action: text('action').notNull(),

  method: methodEnum('method').notNull(),

  params: jsonb('params'),
  device: text('device').notNull(),
  os: text('os').notNull(),
  browser: text('browser').notNull(),
  createdAt,
}, t => [
  index('logs_user_idx').on(t.userId),
  index('logs_ip_idx').on(t.ip),
])

/**
 * @description: IP 地址映射表
 */
export const ipGeos = pgTable('ip_geos', {
  ip: text('ip').primaryKey(),

  country: text('country'),
  province: text('province'),
  city: text('city'),

  isp: text('isp'),

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
})

/**
 * @description: 消息公告
 */
export const notices = pgTable('notices', {
  id,
  // 标题
  title: text('title').notNull(),
  // 摘要
  summary: text('summary'),
  // 类型
  type: noticesEnum('type').default('notice').notNull(),
  // 内容
  content: text('content').notNull(),
  // 是否置顶
  pinned: boolean('pinned').default(false).notNull(),
  // 发布时间
  publishedAt: timestamp('published_at'),
  // 是否发布
  published: boolean('published').default(true).notNull(),
  // 作者 id
  userId: text('user_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  createdAt,
  updatedAt,
}, t => [
  index('notices_user_idx').on(t.userId),
])
export const insertNoticesSchema = createInsertSchema(notices).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const updateNoticesSchema = createUpdateSchema(notices).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

/**
 * @description: 消息公告 - 已读
 */
export const noticeReads = pgTable('notice_reads', {
  // 公告
  noticeId: text('notice_id')
    .notNull()
    .references(() => notices.id, {
      onDelete: 'cascade',
    }),

  // 用户
  userId: text('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),

  // 阅读时间
  readAt: timestamp('read_at')
    .defaultNow()
    .notNull(),
}, t => [
  primaryKey({
    columns: [t.noticeId, t.userId],
  }),

  index('notice_reads_notice_idx').on(t.noticeId),

  index('notice_reads_user_idx').on(t.userId),
])

/**
 * @description: 部门管理
 */
export const departments = pgTable('departments', {
  id,
  // 部门名称
  name: text('name').notNull().unique(),
  // 部门编码
  code: text('code').notNull().unique(),
  //  父级
  parentId: text('parent_id').references(
    (): AnyPgColumn => departments.id,
    {
      onDelete: 'restrict',
    },
  ),
  // 负责人 id
  leaderId: text('leader_id').references(() => users.id, {
    onDelete: 'set null',
  }),

  // 是否启用
  enabled: boolean('enabled').default(true).notNull(),

  // 部门描述
  description: text('description'),

  // 排序
  sort,
  createdAt,
  updatedAt,
}, t => [
  index('departments_parent_idx').on(t.parentId),
  index('departments_leader_idx').on(t.leaderId),
  index('departments_sort_idx').on(t.parentId, t.sort),
])
export const insertDepartmentsSchema = createInsertSchema(departments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const updateDepartmentsSchema = createUpdateSchema(departments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

/**
 * @description: 岗位管理
 */
export const posts = pgTable('posts', {
  id,
  // 岗位名称
  name: text('name').notNull().unique(),
  // 岗位编码
  code: text('code').notNull().unique(),
  // 部门 id
  departmentId: text('department_id').references(
    () => departments.id,
    {
      onDelete: 'cascade',
    },
  ),

  // 是否启用
  enabled: boolean('enabled').default(true).notNull(),

  // 岗位描述
  description: text('description'),

  // 排序
  sort,
  createdAt,
  updatedAt,
}, t => [
  index('posts_department_idx').on(t.departmentId),
])
export const insertPostsSchema = createInsertSchema(posts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const updatePostsSchema = createUpdateSchema(posts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

/**
 * @description: 表关联关系
 */

export const i18nRelations = relations(
  i18n,
  ({ one, many }) => ({
    parent: one(i18n, {
      fields: [i18n.parentId],
      references: [i18n.id],
      relationName: 'i18n_tree',
    }),

    children: many(i18n, {
      relationName: 'i18n_tree',
    }),
  }),
)

export const menuRelations = relations(
  menus,
  ({ one, many }) => ({
    parent: one(menus, {
      fields: [menus.parentId],
      references: [menus.id],
      relationName: 'menu_tree',
    }),

    children: many(menus, {
      relationName: 'menu_tree',
    }),
  }),
)

export const roleRelations = relations(roles, ({ many }) => ({
  menus: many(roleMenus),
  users: many(userRoles),
}))

export const roleMenuRelations = relations(roleMenus, ({ one }) => ({
  role: one(roles, {
    fields: [roleMenus.roleId],
    references: [roles.id],
  }),
  menu: one(menus, {
    fields: [roleMenus.menuId],
    references: [menus.id],
  }),
}))

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
}))

export const logsRelations = relations(logs, ({ one }) => ({
  user: one(users, {
    fields: [logs.userId],
    references: [users.id],
  }),
  geo: one(ipGeos, {
    fields: [logs.ip],
    references: [ipGeos.ip],
  }),
}))

export const ipGeosRelations = relations(ipGeos, ({ many }) => ({
  logs: many(logs),
}))

export const noticesRelations = relations(notices, ({ one, many }) => ({
  reads: many(noticeReads),
  author: one(users, {
    fields: [notices.userId],
    references: [users.id],
  }),
}))

export const noticeReadsRelations = relations(
  noticeReads,
  ({ one }) => ({
    notice: one(notices, {
      fields: [noticeReads.noticeId],
      references: [notices.id],
    }),

    user: one(users, {
      fields: [noticeReads.userId],
      references: [users.id],
    }),
  }),
)

export const departmentRelations = relations(
  departments,
  ({ one, many }) => ({
    parent: one(departments, {
      fields: [departments.parentId],
      references: [departments.id],
      relationName: 'department_tree',
    }),

    children: many(departments, {
      relationName: 'department_tree',
    }),

    leader: one(users, {
      fields: [departments.leaderId],
      references: [users.id],
    }),

    posts: many(posts),
  }),
)

export const postRelations = relations(posts, ({ one }) => ({
  department: one(departments, {
    fields: [posts.departmentId],
    references: [departments.id],
  }),
}))
