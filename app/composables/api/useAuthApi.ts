/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-19 15:00:39
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-19 15:13:09
 * @Description: 用户鉴权模块
 */
export function useAuthApi() {
  const { post } = useRequest()

  /**
   * @description: 注册
   */
  const signUp = (data: { email: string, password: string, name: string }) =>
    post('/auth/sign-up', data, {
      credentials: 'include',
    })

  /**
   * @description: 登录
   */
  const signIn = (data: { email: string, password: string }) =>
    post('/auth/sign-in', data, {
      credentials: 'include',
    })

  /**
   * @description: 登出
   */
  const signOut = () =>
    post('/auth/sign-out', undefined, {
      credentials: 'include',
    })

  return {
    signUp,
    signIn,
    signOut,
  }
}
