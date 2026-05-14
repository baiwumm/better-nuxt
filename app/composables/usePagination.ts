import type { PaginationState } from '@tanstack/vue-table'

export function usePagination(
  defaultSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
) {
  const initialPagination: PaginationState = {
    pageIndex: 0,
    pageSize: defaultSize,
  }

  return {
    initialPagination,
    pageSizeOptions,
  }
}
