# timestamptz 转换 + logs 90 天保留策略

- **日期**：2026-08-13
- **类型**：数据库规范 / 数据治理
- **影响范围**：`app/db/schema.ts`、`auth-schema.ts`、`app/db/migrations/0016_cuddly_archangel.sql`（新增）、`server/tasks/clean-logs.ts`（新增）、`nuxt.config.ts`

## 一、timestamp → timestamptz（已完成）

### 背景
所有时间列使用 `timestamp`（无时区），跨时区部署/查询时时间语义可能偏移。

### 改动
- `app/db/schema.ts`：公共 `createdAt`/`updatedAt` + `ip_geos.createdAt`、`notices.publishedAt`、`noticeReads.readAt` 共 5 处改 `withTimezone: true`
- `auth-schema.ts`：users/sessions/accounts/verifications 共 17 处
- 迁移 `0016_cuddly_archangel.sql`：55 条 `ALTER COLUMN ... SET DATA TYPE timestamp with time zone`（+ `SET DEFAULT now()`），无其他变更

### 验证
- 55 条 ALTER 全部执行成功；迁移记录补写（id=4，drizzle.__drizzle_migrations 共 4 条）
- dev server 正常（Drizzle 前后端 Date 映射一致，运行时行为不变）

## 二、logs 90 天保留策略（已完成，保留期经用户确认）

### 背景
logs 表无限增长，无清理机制。

### 方案
- `server/tasks/clean-logs.ts`：Nitro `defineTask`，删除 `created_at < now()-90天` 的日志
- `nuxt.config.ts`：`nitro.experimental.tasks: true` + `nitro.scheduledTasks: { '0 3 * * 1': ['clean-logs'] }` 每周一凌晨 3 点执行
- 配置坑记录：Nitro 的定时任务配置键是 **`scheduledTasks`**（cron 表达式 → 任务名数组），非 `cron` 数组；tasks 需 `experimental.tasks: true` 才扫描 `server/tasks/` 目录

### 验证
- `/_nitro/tasks` 返回 `tasks: { clean-logs }` + `scheduledTasks: [{ cron: '0 3 * * *', tasks: ['clean-logs'] }]`
- 手动触发 `POST /_nitro/tasks/clean-logs`：**已清理 239 条 90 天前日志**

## 行为变化

- 时间列：`timestamp` → `timestamptz`（历史数据按连接会话时区重新解释，若写入/查询同会话时区无偏移；运行时 Date 处理不变）
- 日志：超过 90 天的操作日志被自动删除（原永久保留）

## 生产部署配置（已完成）

- **`server/routes/cron/clean-logs.ts`**：公开触发端点 `/cron/clean-logs`
  - **生产**：Vercel 自动注入 `x-vercel-cron` 头（平台保证、外部无法伪造）→ 直接通过
  - **本地手动测试**：携带 `X-Cron-Secret` 头（需配置 `CRON_SECRET` 环境变量）
  - 无以上任一 → 403
- **`vercel.json`**：`crons` 配置**每周一凌晨 3 点**（`0 3 * * 1`）调用 `/cron/clean-logs`（Vercel Cron 不支持自定义 header，故采用平台内置头方案）
- **部署无需额外环境变量**（`CRON_SECRET` 仅为本地手动测试可选）
- Vercel Cron 限制：Hobby 计划每日 cron 执行次数有限（约 2 次/日），Pro 无此限制
- 本地/预览环境：Vercel cron 不会触发（仅生产部署后生效）；本地可用 `POST /_nitro/tasks/clean-logs` 手动触发
