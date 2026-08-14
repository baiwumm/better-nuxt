# 修复公告列表/详情过度加载关联

- **日期**：2026-08-13
- **类型**：性能优化 / 安全加固
- **影响范围**：`server/api/administrative/notices/index.get.ts`、`server/api/administrative/notices/[id].get.ts`

## 背景与目标

代码审查（`docs/optimizations/2026-08-13-code-review.md` 高危 10）发现：

1. **列表接口**（`index.get.ts`）：`with: { reads: { with: { user: true } } }` —— 为展示"已读头像列"（管理端表格 `useNoticesColumns.ts:52`）与判断 `isRead`，把每条公告的**全部已读记录及其用户完整信息**（含 email）一次性拉回。已读人数增长后响应体与 SQL 结果集乘积式膨胀。
2. **详情接口**（`[id].get.ts`）：同样加载全部已读记录 + 用户信息，但详情页打开即标记已读、`isRead` 恒为 true，**根本不需要 reads 数据**。

## 方案

- **列表**：`reads` 关联保留（管理端表格需要已读头像列），但 `user` 裁剪为头像列所需的 4 个字段 `displayUsername/username/name/image`——不再泄露 email、ban 状态等
- **详情**：移除 `reads` 关联，只保留 `author`（`UserView` 组件用 `email` 展示作者邮箱，属现有功能保留）
- 前端字段核对：`UserAvatar` 只用 `image` + 显示名（`displayUsername||username||name`）；管理端详情页与 notices-center 均不消费 `reads`；`isRead` 判断逻辑不变（列表仍基于内存中 reads 数据，详情恒 true）

## 改动内容

- `server/api/administrative/notices/index.get.ts`：`reads.user` 用 `columns` 裁剪为 4 个展示字段
- `server/api/administrative/notices/[id].get.ts`：移除 `reads` 关联（保留 `author`），注释说明原因

## 验证

- `npx eslint`（两个文件）：通过，无错误
- `pnpm dev`：Nitro 重建成功（`Nuxt Nitro server built in 966ms / 817ms`），无编译错误

## 行为变化

- 列表响应中已读用户的 `email`/`banned`/`lastActiveAt` 等字段不再返回（头像/显示名不受影响）
- 详情响应不再包含 `reads` 数组（前端无消费方）

## 遗留与后续

- 详情接口"GET 请求写库"（已读标记，中危 M5）本次未处理——建议独立 POST 接口，另行迭代
- 列表的 `author` 仍返回全字段（含 email，作者为公告发布人，`UserView` 明确展示），如需要可后续裁剪
- 下一优先项：高危 11（连接池配置缺失 + 生产环境 SQL 日志 `logger: true` 泄露绑定参数）
