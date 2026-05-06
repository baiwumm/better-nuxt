import { relations, sql } from 'drizzle-orm'
import { boolean, foreignKey, index, integer, jsonb, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
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

export const logsRelations = relations(logs, ({ one }) => ({
  user: one(user, {
    fields: [logs.userId],
    references: [user.id],
  }),
}))
