# 修复数据库连接池配置与生产 SQL 日志泄漏

- **日期**：2026-08-13
- **类型**：安全加固 / 性能优化
- **影响范围**：`app/db/drizzle.ts`

## 背景与目标

代码审查（`docs/optimizations/2026-08-13-code-review.md` 高危 11）发现：

1. `logger: true` 无条件开启——**生产环境会打印所有 SQL 与绑定参数**（含登录密码 hash、OAuth accessToken/refreshToken/idToken 等），既有信息泄漏又拖慢请求（dev 日志中已观察到真实 OAuth token 明文输出）
2. `new Pool({ connectionString })` 未指定 `max`——@neondatabase/serverless 默认 10 条 WebSocket 连接，Vercel serverless 每实例各建池，并发下连接数膨胀

## 方案

按环境区分（`process.env.NODE_ENV !== 'production'` 判定开发）：

- **本地开发**：保持现状（`logger: true` 便于调试、`max: 10` 支撑并发）
- **生产**：`logger: false`（不再输出 SQL 绑定参数）、`max: 1`（serverless 每实例单请求，Neon 官方推荐值）

不更换驱动（`drizzle-orm/neon-http` 无连接驱动为更大改动，列入后续选项）。

## 改动内容

- `app/db/drizzle.ts`：
  - 新增 `const isDev = process.env.NODE_ENV !== 'production'`
  - `Pool` 加 `max: isDev ? 10 : 1`
  - `drizzle` 的 `logger: isDev`

## 验证

- `npx eslint app/db/drizzle.ts`：通过，无错误
- `pnpm dev`：Nitro 重建成功；`curl /api/settings/i18n/locales` 触发查询后 dev 日志正常输出 `Query: select ... from "i18n"`——确认开发分支（logger on）行为不变；生产分支由同一三元判断控制

## 行为变化

- 生产环境：SQL 及绑定参数不再写入日志；连接池上限 1
- 本地开发：无变化

## 遗留与后续

- 更优方案：改用 `drizzle-orm/neon-http`（HTTP 无连接驱动）彻底免连接池管理——影响面较大（驱动、类型、迁移命令兼容），需用户确认后另行迭代
- 下一优先项：高危 12（全量 OFFSET 分页深页退化）、中危（排序列缺索引）
