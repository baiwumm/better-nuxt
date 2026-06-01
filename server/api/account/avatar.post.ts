/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-01 15:52:32
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-01 16:51:33
 * @Description: 上传头像
 */
import { blob } from 'hub:blob'

export default eventHandler(async (event) => {
  return blob.handleUpload(event, {
    formKey: 'files',
    multiple: false,
    ensure: {
      maxSize: '8MB',
      types: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    },
    put: {
      addRandomSuffix: true,
      prefix: 'avatars',
    },
  })
})
