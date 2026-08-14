# users 关键字搜索加 pg_trgm GIN 索引

- **日期**：2026-08-13
- **类型**：性能优化（数据库索引）
- **影响范围**：`auth-schema.ts`、`app/db/migrations/0014_peaceful_wilson_fisk.sql`（新增）

## 背景与目标

代码审查（`docs/optimizations/2026-08-13-code-review.md` 中危）发现：`users` 等接口的关键字搜索 `ilike('%' + kw + '%')` 前导通配符无法走普通 B-tree 索引，用户表随业务增长后每次搜索都是全表扫描。

方案权衡：
- **前缀匹配**（`ilike(kw + '%')`）：改变搜索行为（不再匹配中间/尾部），不符合"不影响功能"
- **pg_trgm GIN 索引**：保留任意位置模糊匹配语义，仅需扩展 + 索引 ✅

其他使用 `ilike('%kw%')` 的接口（roles/departments/posts/menus/i18n）均为小表（几十~几百行），全表扫描成本可忽略，本次只处理增长表 `users`。

## 改动内容

- `auth-schema.ts`：users 表加 `users_name_trgm_idx`、`users_email_trgm_idx`（`using('gin', col.op('gin_trgm_ops'))`）
- `app/db/migrations/0014_peaceful_wilson_fisk.sql`：drizzle-kit generate 生成（2 条 CREATE INDEX）

## 执行与验证

- `npx drizzle-kit generate`：生成 0014 ✓；`npx eslint auth-schema.ts` 通过 ✓
- drizzle-kit migrate 不可用（沿用 0013 的处理方式）：WS Pool 手动执行——
  1. `CREATE EXTENSION IF NOT EXISTS pg_trgm`（Supabase 允许）
  2. 2 条 CREATE INDEX 逐条 applied
  3. `drizzle.__drizzle_migrations` 补写记录（sha256，id=2；0013 记录 id=1 完好）
- dev server 正常（sign-in 200）

## 行为变化

- 无（`ilike('%kw%')` 搜索行为完全不变，仅索引层加速）

## 遗留与后续

- 其余小表的 `ilike('%kw%')` 未加索引（数据量小，无收益）
- 下一项：`useSessionMenu`/`useAccountInfo` setup 顶层裸 await
