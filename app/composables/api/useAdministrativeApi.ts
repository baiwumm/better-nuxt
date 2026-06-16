/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-09 09:53:33
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-16 10:19:49
 * @Description: 智能行政模块
 */
export function useAdministrativeApi() {
  const { get, post, put, del } = useRequest()

  /**
   * @description: 查询部门
   */
  const getDepartmentList = (params?: DepartmentQueryParams) =>
    get<DepartmentTree[]>('/administrative/departments', params)

  /**
   * @description: 新增部门
   */
  const insertDepartment = (body: InsertDepartment) =>
    post<Department>('/administrative/departments', body)

  /**
   * @description: 更新部门
   */
  const updateDepartment = ({ id, ...body }: Partial<InsertDepartment> & { id: string }) =>
    put<Department>(`/administrative/departments/${id}`, body)

  /**
   * @description: 删除部门
   */
  const delDepartment = (id: string) =>
    del<Department>(`/administrative/departments/${id}`)

  /**
   * @description: 查询岗位
   */
  const getPostList = (params?: PostQueryParams) =>
    get<PaginatingQueryList<Post>>('/administrative/posts', params)

  /**
   * @description: 新增岗位
   */
  const insertPost = (body: InsertPost) =>
    post<Post>('/administrative/posts', body)

  /**
   * @description: 更新岗位
   */
  const updatePost = ({ id, ...body }: Partial<InsertPost> & { id: string }) =>
    put<Post>(`/administrative/posts/${id}`, body)

  /**
   * @description: 删除岗位
   */
  const delPost = (id: string) =>
    del<Post>(`/administrative/posts/${id}`)

  /**
   * @description: 查询消息公告
   */
  const getNoticeList = (params?: PostQueryParams) =>
    get<PaginatingQueryList<Notice>>('/administrative/notices', params)

  /**
   * @description: 新增消息公告
   */
  const insertNotice = (body: InsertNotice) =>
    post<Post>('/administrative/notices', body)

  /**
   * @description: 更新消息公告
   */
  const updateNotice = ({ id, ...body }: Partial<InsertNotice> & { id: string }) =>
    put<Notice>(`/administrative/notices/${id}`, body)

  /**
   * @description: 删除消息公告
   */
  const delNotice = (id: string) =>
    del<Notice>(`/administrative/notices/${id}`)

  /**
   * @description: 消息公告 - 作者列表（去重）
   */
  const getNoticesUserList = () =>
    get<User[]>('/administrative/notices/users')

  /**
   * @description: 获取公告详情
   */
  const getNoticeDetail = (id: string) =>
    get<Notice>(`/administrative/notices/${id}`)

  return {
    getDepartmentList,
    insertDepartment,
    updateDepartment,
    delDepartment,
    getPostList,
    insertPost,
    updatePost,
    delPost,
    getNoticeList,
    insertNotice,
    updateNotice,
    delNotice,
    getNoticesUserList,
    getNoticeDetail,
  }
}
