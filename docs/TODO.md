# 待修复清单

> **维护规则**：完成一项即从本清单删除该行；详细修复记录见 `docs/optimizations/` 对应迭代文档。
> **最后更新**：2026-08-14（完成 B4、C4）

## B 类 · 前端质量

- [ ] **B1 硬编码中文未走 i18n**（TodoList / WeekHeatmap / TrafficSource / hub overview 等 5+ 组件）
- [ ] **B2 appStore 持久化 FOUC**（主题/圆角 SSR 与客户端不一致，首屏闪烁）
- [ ] **B3 useSchema 混合翻译**（静态 `t()` 与 `$i18n:` key 混用，切换语言不更新）

## C 类 · 安全/配置

- [ ] **C1 dev 环境写接口全放开**（生产仅邮箱白名单，RBAC 未落服务端——架构级，需决策）
- [ ] **C2 rateLimit 未显式配置**（BetterAuth 默认宽松，多实例共享需 Redis——需基础设施）
- [ ] **C3 `.env` 密钥单引号**（dotenv 解析隐患——需本地手动修改）
- [ ] **C5 CSP `img-src` 过宽**（收紧白名单）

## D 类 · 架构债

- [ ] **D1 schema/auth-schema 循环依赖**（拆公共列 `app/db/common.ts`）
- [ ] **D2 生产 4 个分析脚本**（GA / Clarity / CF / 统计——隐私与负担权衡）
- [ ] **D3 playground 样式全局注入**（按页加载）

---

## 历史（已全部完成，见下）

### ✅ 已完成并部署（28 项，2026-08-13 ~ 2026-08-14）

- **高危 12 项**：GET 鉴权收紧 / 凭据脱敏 / captcha 启用 / 日志脱敏 / TrafficSource SSR 阻塞 / 401 跳转 / tabStore Map 持久化 / 分页上限 / 公告过度加载 / 连接池+SQL 日志 / OFFSET count 缓存 / sentinel 收尾
- **中危 10 项**：已读拆 POST / 排序索引 / HTTP 状态码 / SSR cookie 转发 / 菜单权限首次导航 / 裸 await / 错误响应脱敏 / pg_trgm / 首页图表懒加载 / initLocales 评估回退
- **低危 6 项**：冗余索引 / 串行瀑布 / menus.get 评估 / timestamptz / logs 90 天保留 + Vercel Cron / 环境核查

已提交 6 个 commit（`1da967b` ~ `9b822fc`）、推送并**生产验证通过**（未登录接口 401、cron 403/200、登录页正常）。

### ⚠️ 部署后待办（非代码，需你在 Vercel/本地处理）

- 生产数据库若与本地不同库，需执行迁移 0013–0016
- 验证时暴露的 GitHub/Google OAuth token 可考虑撤销重授权
- 本地 `.env` 建议清理密钥单引号（对应 C3）
