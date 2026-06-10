/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-09 09:53:33
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-09 09:57:27
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

  return {
    getDepartmentList,
    insertDepartment,
    updateDepartment,
    delDepartment,
  }
}
