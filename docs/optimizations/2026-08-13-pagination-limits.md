# 分页参数加上限（pageSize/page 校验）

- **日期**：2026-08-13
- **类型**：Bug 修复 / 安全加固
- **影响范围**：`shared/utils/schemas.ts`

## 背景与目标

代码审查（`docs/optimizations/2026-08-13-code-review.md` 高危 9）发现：所有分页查询 schema 的 `pageSize: z.coerce.number()` 无 `max()` 约束，`page` 无 `min()`——调用方传 `pageSize=999999999` 可一次拉取全表（users/logs 等增长表），传 `page=0` 时 offset 为负。

## 方案

按表数据量区分上限（用户确认）：
- **大表**：`UserQuerySchema`、`LogQuerySchema` → `pageSize.max(100)`
- **小表**：`RoleQuerySchema`、`PostQuerySchema` → `pageSize.max(10000)`（保留"一次拉全量"语义：用户管理页分配角色传 `pageSize: 9999`）
- **通知**：`NoticesQuerySchema` → `pageSize.max(1000)`（通知中心一次拉取 999 条）
- 全部 schema：`page.min(1)`

超限/非法值由 zod 拒绝（接口经 `catchError` 返回错误），正常请求（10/20/50/100）不受影响。

## 改动内容

- `shared/utils/schemas.ts`：5 个分页 schema（`UserQuerySchema`/`RoleQuerySchema`/`LogQuerySchema`/`PostQuerySchema`/`NoticesQuerySchema`）的 `page` 加 `.min(1)`、`pageSize` 按表加 `.max(...)`，均保留 `.default(...)`

## 验证

- `npx eslint shared/utils/schemas.ts`：通过，无错误
- `node` zod 行为验证（相同约束模式）：
  - 正常值 `{page:2, pageSize:20}` → 解析正确
  - 缺省 → `{page:1, pageSize:10}`（default 生效）
  - `pageSize=999999999` → 拒绝
  - `page=0` → 拒绝
  - 边界 `pageSize=100` → 通过

## 行为变化

- 对 users/logs 传超大 pageSize（>100）→ 请求被拒绝（原为放行拉全表）
- 角色/岗位/通知的既有大 pageSize 调用（9999/999）→ 兼容保留
- `page=0` → 请求被拒绝（原 offset 为负）

## 遗留与后续

- zod 拒绝时接口返回通用错误（500 语义），HTTP 状态仍为 200——与中危 M4（状态码语义）一并处理
- 下一优先项：高危 10（公告列表/详情过度加载关联，结果集膨胀 + 泄露用户 email）
