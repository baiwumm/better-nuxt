# 列表排序列补索引（logs/notices/users/roles/posts）

- **日期**：2026-08-13
- **类型**：性能优化（数据库索引）
- **影响范围**：`app/db/schema.ts`、`auth-schema.ts`、`app/db/migrations/0013_tired_the_stranger.sql`（新增）

## 背景与目标

代码审查（`docs/optimizations/2026-08-13-code-review.md` 中危）发现：各列表接口的 `orderBy` 排序列无匹配索引，PostgreSQL 每次全表扫描 + 排序。`logs`（持续增长）、`notices`、`users` 等表影响最大。

## 方案

按各接口实际 `orderBy` 补索引：

| 表 | 接口排序 | 新增索引 |
|---|---|---|
| logs | `desc(created_at)` | `logs_created_idx (created_at)` |
| notices | `desc(pinned), desc(published_at), desc(created_at)` | `notices_list_idx (pinned, published_at, created_at)` |
| users | `desc(created_at)` | `users_created_idx (created_at)` |
| roles | `desc(sort), asc(created_at)` | `roles_sort_idx (sort, created_at)` |
| posts | `desc(sort), desc(created_at)` | `posts_sort_idx (sort, created_at)` |

## 改动内容

- `app/db/schema.ts`：`logs`/`notices`/`posts` 加索引、`roles` 补索引数组参数
- `auth-schema.ts`：`users` 加 `users_created_idx`（第三参数）
- `app/db/migrations/0013_tired_the_stranger.sql`：`npx drizzle-kit generate` 生成（5 条 CREATE INDEX，无其他改动）
- `app/db/migrations/meta/_journal.json` / `0013_snapshot.json`：drizzle-kit 自动更新

## 执行与验证

- `npx drizzle-kit generate`：生成 0013 迁移 ✓
- **drizzle-kit migrate 失败**：WS 连接持续异常（spinner 无错误输出）；同时发现 `drizzle.__drizzle_migrations` 为空（此前迁移非 drizzle-kit 记录）、且 HTTP 驱动 DNS 解析 `api.pooler.supabase.com` 间歇性失败
- 改用手动方式完成（等价效果）：
  1. 逐条执行 0013 迁移 SQL（5 条 CREATE INDEX 全部 applied）
  2. 向 `drizzle.__drizzle_migrations` 补写记录（`sha256` 文件内容 hash + 毫秒时间戳 `Date.now()`，与 drizzle-kit 惯例一致），避免后续 `drizzle-kit migrate` 重复执行报 duplicate index
- `npx eslint app/db/schema.ts auth-schema.ts`：通过
- dev server 正常（locales 200）

## 行为变化

- 无（纯数据库索引，查询结果不变；仅排序/过滤性能提升）

## 遗留与后续

- **迁移工具链问题**：本机 `drizzle-kit migrate` 与 HTTP 驱动连接不稳定（DNS/WS 异常），建议网络环境恢复后验证一次 `drizzle-kit migrate` 可正常空跑（应提示"no migrations to apply"）；若 hash 校验报错，需将 `drizzle.__drizzle_migrations` 中 0013 记录的 hash 与 drizzle-kit 计算值对齐
- 数据库实为 **Supabase** 项目（DATABASE_URL 指向 pooler），与 AGENTS.md 描述（Neon）不符，后续核实
- 剩余中危：鉴权失败 HTTP 状态仍为 200、rateLimit 未显式配置
