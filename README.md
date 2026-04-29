# 1. 修改 schema
vim schema.ts

# 2. 生成迁移
npx drizzle-kit generate

# 3. 执行迁移
npx drizzle-kit migrate

# 4. 直接推送，不生成迁移文件
npx drizzle-kit push