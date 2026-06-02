/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-01 15:52:32
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-02 10:48:06
 * @Description: 上传头像
 */
import { blob } from 'hub:blob'
import { RESPONSE_CODE } from '@/enums'

export default eventHandler(async (event) => {
  try {
    // 获取用户会话信息
    const session = await auth.api.getSession({
      headers: event.headers,
    })

    const userId = session?.user?.id

    if (!userId) {
      return responseSuccess(null, '未登录', RESPONSE_CODE.UNAUTHORIZED)
    }

    // 1. 删除旧头像：列出所有匹配该用户的头像
    if (userId) {
      const { blobs } = await blob.list({
        prefix: `avatars/${userId}-`, // 关键：用 userId- 作为前缀匹配
      })

      // 批量删除
      if (blobs.length) {
        await Promise.all(
          blobs.map(item => blob.del(item.pathname)),
        )
      }
    }

    return blob.handleUpload(event, {
      formKey: 'files',
      multiple: false,
      ensure: {
        maxSize: '1MB',
        types: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      },
      put: {
        addRandomSuffix: true,
        prefix: 'avatars',
      },
    })
  }
  catch (err) {
    return responseError(err)
  }
})
