# 错误响应不再泄露内部错误详情

- **日期**：2026-08-13
- **类型**：安全加固
- **影响范围**：`server/utils/index.ts`

## 背景与目标

代码审查（`docs/optimizations/2026-08-13-code-review.md` 中危）指出错误处理可能回传内部错误信息。核实发现：

- 服务端 `catchError`（`server/utils/index.ts:22`）仅定义、未被调用（handler 均走 `responseError(err)`）
- 实际泄露点：`responseError(err)` 将 Error 对象直接放入 `data`——`Error` 序列化为 `{}`，但 **`ZodError` 会序列化出 `issues` 数组**（含字段名校验细节），且错误详情可能间接暴露表结构/堆栈线索

## 方案

`responseError` 对 `Error` 实例统一置空 `data`（保留通用 `msg`）。所有 handler 的 `catch (err) => responseError(err)` 调用点自动受益，无需逐处修改。普通非 Error 数据（业务错误 payload）不受影响。

前端 `app/utils/index.ts` 有独立的 `catchError`（用于 toast 展示 FetchError 信息），不受服务端改动影响。

## 改动内容

- `server/utils/index.ts`：`responseError` 增加 `const safeData = data instanceof Error ? null : data`

## 验证

- `npx eslint server/utils/index.ts`：通过
- 代码核实（manual）：服务端 `catchError` 无调用方；全部 handler catch 路径经 `responseError` 统一收敛；前端 `catchError` 独立于服务端实现

## 行为变化

- 服务端错误响应的 `data`：Error/ZodError → `null`（原为 `{}` 或 `issues` 数组）
- `msg` 保持通用文案"服务器错误"（不变）

## 遗留与后续

- 前端无法从服务端错误获取具体校验信息（依赖前端自身的 zod 校验，已在表单层实现）
- 如需生产环境记录错误详情，可后续接入日志/监控（`err.message` 仅落服务端日志）
- 下一项：前导通配符 `ilike('%kw%')` 全表扫描
