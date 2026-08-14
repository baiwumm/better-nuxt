# 公告已读标记拆分独立 POST（GET 不再写库）

- **日期**：2026-08-13
- **类型**：重构 / HTTP 语义修正
- **影响范围**：`server/api/administrative/notices/[id].get.ts`、`server/api/administrative/notices/[id]/read.post.ts`（新增）、`server/middleware/auth.ts`、`app/composables/api/useAdministrativeApi.ts`、`app/pages/notices-center/index.vue`

## 背景与目标

代码审查（`docs/optimizations/2026-08-13-code-review.md` 中危）发现：公告详情 **GET 接口写库**（打开详情即插入已读记录）——违反 HTTP 语义（GET 应无副作用），且已读标记混在只读查询里。审查建议拆为独立 POST。

**联动问题**：生产环境 `server/middleware/auth.ts` 对非 GET 操作要求管理员邮箱白名单，而通知中心是**普通登录用户**的功能——直接新增 POST 会被 403 拦截，必须同步扩展中间件（"需登录但不要求管理员身份的写操作"规则）。

## 方案

1. **后端**：新建 `POST /api/administrative/notices/:id/read`（session 校验 + 幂等 `onConflictDoNothing` 插入）；`[id].get.ts` 移除写库块与不再使用的 `session`/`noticeReads`
2. **中间件**：新增模块级正则 `loginOnlyWritePaths = /^\/api\/administrative\/notices\/[^/]+\/read$/`，在 session 校验后、管理员校验前放行（登录即可，不要求管理员）
3. **前端**：`useAdministrativeApi` 新增 `markNoticeRead(id)`；`notices-center/index.vue` 的 `watch(noticeId)` 打开详情时调用（本地 `isRead`/`unreadCount` 逻辑不变，POST 失败静默）

## 改动内容

- `server/api/administrative/notices/[id]/read.post.ts`：新增（幂等插入已读）
- `server/api/administrative/notices/[id].get.ts`：移除写库块、`session` 获取、`noticeReads` import；保留详情查询与 `isRead: true`
- `server/middleware/auth.ts`：新增 `loginOnlyWritePaths` 正则与放行分支
- `app/composables/api/useAdministrativeApi.ts`：新增 `markNoticeRead`
- `app/pages/notices-center/index.vue`：`watch(noticeId)` 改为 async 并调用 `markNoticeRead`（try/catch 静默）

## 验证

- `npx eslint`（5 个文件）：通过（含 e18e 风格修正：正则提到模块作用域 + `.test()`）
- `curl` 未登录 `POST /api/administrative/notices/test-id/read` → `code: 401`（未登录）——证明中间件将路径放行到"登录即可"层，未被管理员白名单 403 拦截
- `pnpm dev`：Vite HMR 更新 notices-center、Nitro 重建成功（858ms），无编译错误

## 行为变化

- GET 详情不再写库（无副作用）；已读由前端打开详情时显式 POST 持久化
- 普通登录用户可标记已读（中间件新规则），不受管理员白名单限制
- 前端本地已读态（`isRead`、`unreadCount`）展示逻辑不变

## 遗留与后续

- `loginOnlyWritePaths` 目前仅覆盖通知已读；后续如有点赞/收藏等登录用户写操作可复用该规则
- 下一中危项：排序列缺索引（logs/notices 等增长表，需生成迁移）、鉴权失败 HTTP 状态仍为 200、rateLimit 未显式配置
