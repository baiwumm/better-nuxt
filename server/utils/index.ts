import { RESPONSE_CODE } from '@/enums'

/**
 * @description: 请求成功
 */
export function responseSuccess(
  data: unknown,
  msg = RESPONSE_CODE.label(RESPONSE_CODE.SUCCESS),
  code: typeof RESPONSE_CODE.valueType = RESPONSE_CODE.SUCCESS,
): IResponse {
  return { data, msg, code, timestamp: Date.now() }
}

/**
 * @description: 请求失败
 */
export function responseError(data: unknown, msg = RESPONSE_CODE.label(RESPONSE_CODE.SERVER_ERROR)): IResponse {
  return { data, msg, code: RESPONSE_CODE.SERVER_ERROR, timestamp: Date.now() }
}

/**
 * @description: 统一处理 catch 错误
 */
export function catchError(err: unknown): IResponse {
  let message = '未知错误'

  if (err instanceof Error) {
    message = err.message
  }
  else if (typeof err === 'string') {
    message = err
  }
  return responseError(null, message)
}

type TreeNode<T> = T & { children?: TreeNode<T>[] }
export function convertFlatDataToTree<T extends { id: any, parentId?: any }>(flatData: T[], rootId?: any): TreeNode<T>[] {
  const map: Record<any, TreeNode<T>> = {}
  const roots: TreeNode<T>[] = []

  // 将所有节点添加到 map 中，以 id 作为 key
  flatData.forEach((node) => {
    map[node.id] = { ...node } as TreeNode<T> // 明确类型转换为 TreeNode<T>
  })

  // 遍历所有节点，构建树形结构
  flatData.forEach((node) => {
    const parentNode = map[node.parentId ?? rootId]
    if (parentNode) {
      let children = parentNode.children
      if (!children) {
        children = []
        Object.assign(parentNode, { children }) // 添加 children 属性
      }
      children.push(map[node.id] as TreeNode<T>)
    }
    else {
      // 如果找不到父节点，将当前节点作为根节点
      roots.push(map[node.id] as TreeNode<T>)
    }
  })

  // 移除空的 children 属性
  const cleanUpEmptyChildren = (nodes: TreeNode<T>[]): TreeNode<T>[] =>
    nodes.map(node => ({
      ...node,
      children: node.children && node.children.length > 0 ? cleanUpEmptyChildren(node.children) : undefined,
    }))

  return cleanUpEmptyChildren(roots)
}
