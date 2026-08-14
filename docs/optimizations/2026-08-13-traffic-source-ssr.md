# 修复 TrafficSource SSR 阻塞 2 秒

- **日期**：2026-08-13
- **类型**：性能优化
- **影响范围**：`app/pages/components/TrafficSource.vue`

## 背景与目标

代码审查（`docs/optimizations/2026-08-13-code-review.md` 高危 6）发现：首页 dashboard 的 `TrafficSource.vue` 在 `useAsyncData` handler 内 `await new Promise(r => setTimeout(r, 2000))` 且未设 `server: false`——**每次 SSR 请求首页都硬性延迟 2 秒才返回 HTML**。且数据是 `randomInt` 随机模拟数据（每次请求都不同），完全没有 SSR 复用价值。

## 方案

- `useAsyncData` 改为 `{ server: false, lazy: true }`：SSR 阶段不执行 handler，纯客户端生成随机数据
- 移除 `setTimeout(2000)` 模拟延迟
- `refresh`（刷新按钮）行为不变；`pending`/`ContainerLoading` 逻辑不变（lazy 模式初始 pending=true，数据立即生成后消失）

不涉及其他图表组件（`SalesPerformance` 等无此 2 秒阻塞，其"SSR 渲染空图表"属中危问题，另行迭代）。

## 改动内容

- `app/pages/components/TrafficSource.vue`：
  - handler 移除 `await new Promise(resolve => setTimeout(resolve, 2000))`
  - 选项加 `server: false, lazy: true`

## 验证

- `npx eslint app/pages/components/TrafficSource.vue`：通过，无错误
- `pnpm dev` HMR：`hmr update /pages/components/TrafficSource.vue`，无编译错误
- 预期效果：首页 SSR 响应不再被该组件拖慢 2 秒；客户端图表数据正常生成（随机数据，与之前一致）

## 行为变化

- 首页 SSR 首屏延迟减少约 2 秒（该组件的部分）
- 图表数据仍是客户端随机生成（与修复前最终展示一致；修复前 SSR 虽生成但每次刷新都变，无实际差异）

## 遗留与后续

- 首页其他图表组件（`SalesPerformance`、unovis 图表库）仍进首屏且 SSR 渲染空图表（中危），建议整体 `<ClientOnly>`/懒加载——后续迭代
- 下一优先项：高危 9（分页参数无上限）
