# 优化操作日志列表全表 count（TTL 缓存）

- **日期**：2026-08-13
- **类型**：性能优化
- **影响范围**：`server/api/settings/logs/index.get.ts`

## 背景与目标

代码审查（`docs/optimizations/2026-08-13-code-review.md` 高危 12）发现：列表接口每页都执行一次全表 `count(*)`（与分页查询并行），`logs` 这类持续增长的大表在翻页时每次请求都付出全表扫描代价；深页 OFFSET 也随行数增加退化。

经用户确认（ask）：**保留 OFFSET 分页**（管理后台深页场景少，pageSize 已有上限），本次只优化全表 count。

## 方案

- 新增 `getLogsCount(where)` helper：
  - **无筛选条件**（`where` 为空）：全表 count 走 5 秒 TTL 内存缓存（`totalCountCache` Map）——翻页期间日志总量短期不变，缓存命中避免重复全表扫描
  - **带筛选**（userId/method）：实时查询（缓存 key 不含筛选条件，避免误用）
- 接口 `Promise.all` 的 count 分支改为调用 helper，返回 `number`，保持响应结构（`{ list, total }`）不变

## 改动内容

- `server/api/settings/logs/index.get.ts`：
  - 新增 `totalCountCache`（TTL 5s）与 `getLogsCount(where)`
  - `Promise.all` 中 count 分支替换为 `getLogsCount(where)`
  - 修复 lint：`import type { SQL }` 顶层 type-only import、type 成员逗号分隔

## 验证

- `npx eslint server/api/settings/logs/index.get.ts`：通过，无错误
- `pnpm dev`：Nitro 重建成功（`Nuxt Nitro server built in 841ms`），无编译错误
- 行为核对（manual）：缓存仅在 `!where` 时读写；带筛选时每次实时 count；TTL 5 秒内翻页命中缓存

## 行为变化

- 无筛选时 5 秒内的全表 count 命中缓存（总数可能滞后最多 5 秒——管理翻页场景可接受）
- 带筛选的 count 行为不变；接口响应结构不变

## 遗留与后续

- 缓存为 Nitro 实例级（serverless 多实例各自缓存，命中率低但无害）；如需跨实例可接 Redis/KV（`secondaryStorage` 同方案）
- users/notices 等其他大表 count 未做缓存（本次目标为 logs）；keyset 分页仍为可选的长远优化
- 下一优先项：中危——公告详情 GET 写库（已读标记改独立 POST）、排序列缺索引（需迁移）
