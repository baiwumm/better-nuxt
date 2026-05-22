import { relations, sql } from 'drizzle-orm'
import { boolean, foreignKey, index, integer, jsonb, pgEnum, pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod'
import { user } from '../../auth-schema'

export * from '../../auth-schema'

export const targetEnum = pgEnum('target_enum', [
  '_self',
  '_blank',
])

export const methodEnum = pgEnum('method', ['GET', 'POST', 'PUT', 'DELETE'])

/**
 * @description: 菜单管理
 */
export const menu = pgTable('menu', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  // i18n key: pages.title
  label: text('label').notNull(),
  // icon: lucide:monitor
  icon: text('icon').notNull(),
  // route path: /
  to: text('to'),
  // badge: New
  badge: text('badge'),
  // 树形结构关键字段
  parentId: text('parent_id'),
  // 排序
  sort: integer('sort').default(0).notNull(),
  // 是否缓存
  keepAlive: boolean('keep_alive').default(false).notNull(),
  // 是否启用
  enabled: boolean('enabled').default(true).notNull(),
  // 是否默认打开
  defaultOpen: boolean('default_open').default(false).notNull(),
  // 是否新窗口打开
  target: targetEnum('target').default('_self').notNull(),
  // 按钮权限位
  permissions: integer('permissions').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}, t => ([
  index('menu_parent_idx').on(t.parentId),
  index('menu_sort_idx').on(t.parentId, t.sort),
  // --- 显式定义外键约束（推荐，确保数据库层面的一致性） ---
  foreignKey({
    columns: [t.parentId],
    foreignColumns: [t.id],
    name: 'menu_parent_fk', // 约束名称
  }).onDelete('restrict'),
]))
export const insertMenuSchema = createInsertSchema(menu).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const updateMenuSchema = createUpdateSchema(menu).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

/**
 * @description: 角色管理
 */
export const role = pgTable('role', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  name: text('name').notNull().unique(),
  code: text('code').notNull().unique(),
  description: text('description'),
  // 状态
  status: boolean('status').default(true).notNull(),
  // 排序
  sort: integer('sort').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}, t => ([
  index('role_sort_idx').on(t.sort),
]))
export const insertRoleSchema = createInsertSchema(role).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const updateRoleSchema = createUpdateSchema(role).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

/**
 * @description: 角色关联菜单
 */
export const roleMenu = pgTable('role_menu', {
  roleId: text('role_id').notNull().references(() => role.id, { onDelete: 'cascade' }),
  menuId: text('menu_id').notNull().references(() => menu.id, { onDelete: 'cascade' }),
  permissions: integer('permissions').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, t => [
  primaryKey({
    columns: [t.roleId, t.menuId],
  }),
  index('role_menu_role_idx').on(t.roleId),
  index('role_menu_menu_idx').on(t.menuId),
])
export const insertRoleMenuSchema = createInsertSchema(roleMenu).omit({
  createdAt: true,
})

/**
 * @description: 用户关联角色
 */
export const userRole = pgTable('user_role', {
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  roleId: text('role_id').notNull().references(() => role.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, t => [
  primaryKey({
    columns: [t.userId, t.roleId],
  }),
  index('user_role_user_idx').on(t.userId),
  index('user_role_role_idx').on(t.roleId),
])

export const insertUserRoleSchema = createInsertSchema(userRole).omit({
  createdAt: true,
})

/**
 * @description: 国际化
 */
export const internalization = pgTable('internalization', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  // 中文
  zh: text('zh'),
  // 英文
  en: text('en'),
  // 树形结构关键字段
  parentId: text('parent_id'),
  // 排序
  sort: integer('sort').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}, t => ([
  index('internalization_parent_idx').on(t.parentId),
  index('internalization_sort_idx').on(t.parentId, t.sort),
  // --- 显式定义外键约束（推荐，确保数据库层面的一致性） ---
  foreignKey({
    columns: [t.parentId],
    foreignColumns: [t.id],
    name: 'internalization_parent_fk', // 约束名称
  }).onDelete('restrict'),
]))
export const insertInternalizationSchema = createInsertSchema(internalization).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const updateInternalizationSchema = createUpdateSchema(internalization).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

/**
 * @description: 操作日志
 */
export const logs = pgTable('logs', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),

  ip: text('ip').notNull(),
  action: text('action').notNull(),

  method: methodEnum('method').notNull(),

  params: jsonb('params'),
  device: text('device').notNull(),
  os: text('os').notNull(),
  browser: text('browser').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const roleRelations = relations(role, ({ many }) => ({
  menus: many(roleMenu),
  users: many(userRole),
}))

export const roleMenuRelations = relations(roleMenu, ({ one }) => ({
  role: one(role, {
    fields: [roleMenu.roleId],
    references: [role.id],
  }),
  menu: one(menu, {
    fields: [roleMenu.menuId],
    references: [menu.id],
  }),
}))

export const userRoleRelations = relations(userRole, ({ one }) => ({
  user: one(user, {
    fields: [userRole.userId],
    references: [user.id],
  }),
  role: one(role, {
    fields: [userRole.roleId],
    references: [role.id],
  }),
}))

export const logsRelations = relations(logs, ({ one }) => ({
  user: one(user, {
    fields: [logs.userId],
    references: [user.id],
  }),
}))
