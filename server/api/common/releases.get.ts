/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-11 16:02:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-08-21 17:50:01
 * @Description: 发版记录
 */
export default defineEventHandler(async () => {
  try {
    const config = useRuntimeConfig()

    const releases = await $fetch(
      'https://api.github.com/repos/baiwumm/better-nuxt/releases',
      {
        headers: {
          Authorization: `Bearer ${config.githubToken}`,
        },
      },
    )

    return responseSuccess(releases)
  }
  catch (err) {
    return responseError(err)
  }
})
