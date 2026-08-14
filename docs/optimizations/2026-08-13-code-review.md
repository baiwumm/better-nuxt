# 代码审查总结（对照最佳实践 skill）

- **日期**：2026-08-13
- **类型**：代码审查（Best Practices 对照）
- **影响范围**：全项目（认证层 / Nuxt 前端层 / 数据库层 / 通用质量）

## 审查方法

1. 内置 `review`：审查 pending diff（`server/utils/auth.ts` 未提交改动 + 新增 AGENTS.md/docs）
2. 3 个并行子代理，分别加载项目级 skill 作为审查标准：
   - `.reasonix/skills/better-auth-best-practices/SKILL.md`（Better-Auth 官方）
   - `.reasonix/skills/nuxt/SKILL.md`（antfu，Nuxt 4）
   - `.reasonix/skills/supabase-postgres-best-practices/SKILL.md`（Supabase 官方，Postgres 通用）

## 亮点（符合项）

- **安全配置**：`BETTER_AUTH_SECRET` 32 字符合规；cookie 缓存用最安全的 JWE 策略；CSRF/Origin 校验未禁用；IP 头按 Vercel 代理正确配置；魔法链接 token 存 hash；邮箱验证闭环完整；OAuth 密钥仅 env 注入
- **数据层**：全部查询参数化（无 SQL 注入）；外键列有索引；关联表复合主键 + cascade；批量插入/短事务/`onConflictDoNothing` 用法正确；列表接口带分页且 count 并行；树形数据一次查询避免 N+1；PG ENUM 用枚举；迁移体系完整
- **前端**：列表数据走 `useAsyncData` + 显式缓存 key；分页用 `manualPagination` + `dedupe: 'defer'`；composable 均 SSR 安全（`useState` 承载、DOM 操作进 `onMounted`）；重组件正确 `ClientOnly`/懒加载；目录结构符合 Nuxt 4

## 高危问题（12 项，建议优先修复）

| # | 问题 | 位置 | 修复建议 |
|---|---|---|---|
| 1 | sentinel 滥用防护插件被注释（撞库拦截/泄露密码/一次性邮箱/可疑 IP/注册限流全部失效） | `server/utils/auth.ts:134-229` | ✅ 已确认有意禁用并收尾，见 `2026-08-13-sentinel-disabled.md` |
| 2 | 所有 GET 接口无鉴权，未登录可读用户/角色/菜单/日志/部门等管理数据 | `server/middleware/auth.ts:24-26` | 中间件改"默认拒绝、白名单放行"，管理 GET 校验 session + 权限 |
| 3 | 用户列表泄露 OAuth 凭据 + 密码哈希（`with: { accounts: true }` 整行返回） | `server/api/settings/users/index.get.ts:36-44` | `columns` 裁剪敏感列，返回脱敏 |
| 4 | Turnstile 人机验证服务端失效（captcha 插件被注释，前端仍发 header）→ 可脚本化暴力登录/批量注册 | `server/utils/auth.ts:230-233` | 启用 captcha 插件，或移除前端 header（需确认） |
| 5 | 操作日志明文落库（含改密请求体）+ 日志接口未鉴权 → 密码明文→未鉴权可读漏洞链 | `server/middleware/logs.ts:39-43,71-91` | 日志字段黑名单脱敏；日志接口走鉴权 |
| 6 | TrafficSource SSR 阻塞 2 秒（模拟延迟，无 SSR 价值） | `app/pages/components/TrafficSource.vue:48-57` | 改 `{ server: false, lazy: true }` 或移除 setTimeout |
| 7 | 401 跳转到不存在的 `/login`（真实路由 `/auth/sign-in`） | `app/plugins/request.ts:60` | 改为 `/auth/sign-in` |
| 8 | tabStore 的 `Map` 被 JSON 持久化破坏，刷新后多标签页崩溃 | `app/stores/useTabStore.ts:16,166` | 自定义 serializer（存数组/恢复 `new Map()`） |
| 9 | 分页参数无上限（`pageSize=999999999` 拉全表；`page=0` offset 为负） | `shared/utils/schemas.ts` | `page.min(1)`、`pageSize.max(100)` |
| 10 | 公告列表/详情过度加载关联（判断已读却拉全部已读记录+用户信息） | `server/api/administrative/notices/index.get.ts:46-55` | 分页后按 `noticeId in (...)` 单独查已读集合 |
| 11 | 生产环境 SQL 日志全开（`logger: true` 泄露绑定参数）+ 连接池未配置 | `app/db/drizzle.ts:5-11` | 生产 `logger: false`；`max` 调 1~2 或改 neon-http 驱动 |
| 12 | 全量 OFFSET 分页深页退化 + 每页全表 `count(*)` | 各列表接口 | 大表改 keyset 分页；count 缓存 |

## 中危问题

### 认证层
- rateLimit 未显式配置（默认 100 次/10s 宽松，多实例不共享）→ 显式配置并接共享存储
- 错误处理回传 `err.message`（`server/utils/index.ts`）→ 生产返回通用文案，详情记日志
- 鉴权失败返回 HTTP 200 仅 body 带 code → `setResponseStatus(event, 401/403)`
- `.env` 密钥值用单引号包裹（dotenv 会保留单引号）→ 去除并轮换 secret
- 生产 `BETTER_AUTH_URL=localhost`、与 `NUXT_SITE_URL` 不一致 → 生产显式 https 域名
- dev 环境写接口全放开 + 生产仅邮箱白名单，与自建 RBAC 两套体系并存未落服务端 → 接口级 RBAC
- `databaseHooks` 默认角色插入无错误处理/角色校验

### Nuxt 前端层
- 菜单权限首次导航被跳过（UI 级鉴权可绕过）→ 菜单 SSR 化 + `callOnce` 后校验
- `useSessionMenu` setup 顶层裸 await（SSR/水合双重请求）→ `useAsyncData` + `server: false`
- `useInitLocales` 顶层 await 阻塞所有 SSR 首屏 → 改 lazy
- 首页图表库（unovis）进首屏且 SSR 渲染空图表 → `ClientOnly`/Lazy
- 两处独立 `useAsyncData` 串行瀑布（users/departments 页）→ `Promise.all`
- appStore 持久化仅在客户端注册，SSR/客户端主题状态不一致（FOUC）
- 多处硬编码中文（TodoList/WeekHeatmap/TrafficSource/hub overview 等）未走 i18n
- `useSchema` 混合 `t()` 静态字符串与 `$i18n:` key，切换语言不更新

### 数据库层
- 排序列普遍缺索引（logs/notices/roles 等）→ 补 `created_at`/组合索引
- 前导通配符 `ilike('%kw%')` 全表扫描 → pg_trgm GIN 或前缀匹配
- 日志中间件 fire-and-forget 在 serverless 可能丢失 + 无 try/catch → 同事务同步或捕获异常
- 6 处冗余索引（写放大）→ 删除与 PK 前缀重复的索引
- GET 请求写库（`notices/[id].get.ts` 插已读）→ 独立 POST 接口
- `timestamp` 无时区 → 统一 `timestamptz`
- UUIDv4 随机主键碎片化 → UUIDv7 或分区
- `with` 嵌套返回过量列（roles/users 列表）→ `columns` 裁剪
- `i18n.name` 无唯一约束 → `(parent_id, name)` 唯一约束

## 低危问题

- 存在性预检多余 round-trip（permissions/roles 接口）
- `schema.ts` 与 `auth-schema.ts` 循环依赖 → 拆公共列定义 `app/db/common.ts`
- `logs` 表无保留策略，无限增长 → 分区/定时清理
- i18n locales 全量无缓存 → ETag/内存缓存
- `menus.get.ts` 二次全量查询菜单 → 复用首次 join 结果
- `nitro.rollupConfig.plugins: [vue()]` 非常规（邮件模板渲染）→ 评估替代
- 生产注册 4 个分析脚本（隐私/负担）→ 按需保留
- CSP `img-src` 允许任意 `https:` → 收紧白名单
- `useCookie('better-auth.session-token')` 与默认 cookie 名（下划线）可能不一致 → 核实
- playground 样式全局注入 → 按页加载
- `usePagination` 空壳 composable → 并入常量
- `useAccountInfo` 未设 `server: false` → 无收益 SSR 调用
- 邮件发件人 `no-reply@baiwumm.com` 硬编码 → 放 env
- 生产 `useSecureCookies` 依赖自动推断 → 显式按 NODE_ENV 设置

## 已处理

- **sentinel 禁用收尾**（2026-08-13）：移除客户端 `sentinelClient` 与服务端 `sentinel`/`captcha` 死 import，产出 `docs/optimizations/2026-08-13-sentinel-disabled.md`，eslint 通过。

## 修复优先级路线（按 AGENTS.md 一次一个目标，每轮产出优化文档）

1. **安全漏洞链**（高危 2/3/4/5）：GET 鉴权 + 凭据泄露 + captcha 假安全 + 日志脱敏——先做，覆盖面最大
2. **前端确定性 bug**（高危 6/7/8）：TrafficSource 阻塞、401 跳转、tabStore Map 持久化——改动小、风险低
3. **数据库层**（高危 9/11/10 + 中危索引）：pageSize 上限、连接池/SQL 日志、公告关联、排序索引
4. **架构债**（低危循环依赖、服务端 RBAC）——随迁移窗口规划

## 遗留

- captcha 插件被注释但前端仍发 `x-captcha-response`（假安全），启用或移除需用户确认
- `.env` 含真实密钥，确认从未误提交 git 历史并定期轮换
- sentinel 若未来重新启用：恢复注释区 + 重新添加客户端 `sentinelClient`
