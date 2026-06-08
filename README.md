# 1. 修改 schema
vim schema.ts

# 2. 生成迁移
npx drizzle-kit generate

# 3. 执行迁移
npx drizzle-kit migrate

# 4. 直接推送，不生成迁移文件
npx drizzle-kit push

# 5. 注意 auth-schema 文件覆盖
```ts
import { departments, logs, noticeReads, notices, userRoles } from './app/db/schema'

export const usersRelations = relations(users, ({ many }) => ({
  // auth
  sessions: many(sessions),
  accounts: many(accounts),

  // RBAC
  roles: many(userRoles),

  // system logs
  logs: many(logs),

  // content
  notices: many(notices),
  noticeReads: many(noticeReads),

  // org structure
  leadingDepartments: many(departments),
}))
```