/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-12 09:32:09
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-12 09:38:51
 * @Description: 公共接口
 */
export function useCommonApi() {
  const { get } = useRequest()

  /**
   * @description: 获取 Github Releases
   */
  const getReleasesList = () => get<any[]>('/common/releases')

  return {
    getReleasesList,
  }
}
