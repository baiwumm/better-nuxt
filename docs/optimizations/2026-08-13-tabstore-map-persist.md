# 修复 tabStore Map 持久化崩溃

- **日期**：2026-08-13
- **类型**：Bug 修复
- **影响范围**：`app/stores/useTabStore.ts`

## 背景与目标

代码审查（`docs/optimizations/2026-08-13-code-review.md` 高危 8）发现：`useTabStore` 的 `tagMap` 是 `ref<Map<string, MenuTree>>`，但 `persist: true` 使用 `pinia-plugin-persistedstate` 默认 JSON serializer——`JSON.stringify(new Map())` 结果为 `{}`（Map 无自有可枚举属性）。刷新后恢复的 `tagMap` 是普通对象而非 Map，后续 `tagMap.value.set/has/delete/keys/forEach`（`addTag`、`closeTag`、`getNextPath` 等多处调用）会抛 `set is not a function`，多标签页功能在二次访问时崩溃。

## 方案

为 tab-store 配置自定义 `serializer`：

- **serialize**：`Array.from(state.tagMap)` 将 Map 转 `[key, value]` 数组后再 `JSON.stringify`（数组可被 JSON 完整序列化）
- **deserialize**：`new Map(parsed.tagMap)` 恢复为 Map；兼容旧数据——若恢复的 `tagMap` 非数组（如默认序列化遗留的 `{}`），重置为空 Map，避免 `new Map({})` 抛"not iterable"错误

不改变对外 store 接口（`tags`、`addTag`、`closeTag` 等签名不变）。

## 改动内容

- `app/stores/useTabStore.ts`：`persist: true` → `persist: { serializer: { serialize, deserialize } }`

## 验证

- `npx eslint app/stores/useTabStore.ts`：通过，无错误
- `node` 逻辑验证：Map ↔ 数组往返无损（`serialized: {"tagMap":[["/",{...}]]}` → 恢复后 `has('/')` = true、值完整）；旧数据（`{}`）分支输出 `reset`（重置为空 Map，不崩溃）
- `pnpm dev` HMR：`hmr update /stores/useTabStore.ts`，无编译错误

## 行为变化

- 刷新页面后多标签页数据正确恢复（Map 结构保留），不再崩溃
- 已存在旧格式 localStorage 数据的用户：标签自动重置为空（首次刷新丢失已存标签，之后正常持久化）

## 遗留与后续

- 下一优先项：高危 6（`TrafficSource.vue` SSR 阻塞 2 秒）、高危 9（分页参数无上限）
- `useAppStore` 的持久化（仅客户端注册 persist 插件）存在 SSR/客户端主题状态不一致（中危，FOUC），后续迭代处理
