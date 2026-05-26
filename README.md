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
import { userRole } from './app/db/schema'

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  // 说明：用户与角色的关系，在重新生成授权模式时不得进行覆盖。
+  roles: many(userRole),
}))
```