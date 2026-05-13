/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-13 14:32:44
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-13 15:41:37
 * @Description: 公共表格列项
 */
import type { TableColumn } from '@nuxt/ui'
import type { Column } from '@tanstack/vue-table'
import { UBadge, UButton } from '#components'

export function useTableColumns() {
  const { i18nCommon } = useMessage()
  const dayjs = useDayjs()

  // 列固定
  function getHeader<T>(column: Column<T>, label: string, position: 'left' | 'right') {
    const isPinned = column.getIsPinned()
    return h(UButton, {
      color: 'neutral',
      variant: 'ghost',
      label,
      icon: isPinned ? 'lucide:pin-off' : 'lucide:pin',
      class: '-mx-2.5',
      onClick() {
        column.pin(isPinned === position ? false : position)
      },
      ui: {
        label: 'font-semibold',
      },
    })
  }

  // 排序列项
  function createSortColumn<T>(): TableColumn<T> {
    return {
      accessorKey: 'sort',
      header: i18nCommon('sort'),
      cell: ({ row }) =>
        h(
          UBadge,
          {
            variant: 'soft',
            color: 'neutral',
          },
          () => row.getValue('sort'),
        ),
    }
  }

  // 创建时间列项
  function createCreatedAtColumn<T>(): TableColumn<T> {
    return {
      accessorKey: 'createdAt',
      header: i18nCommon('createdAt'),
      cell: ({ row }) => dayjs(row.getValue('createdAt')).format('YYYY-MM-DD HH:mm:ss'),
    }
  }

  return {
    getHeader,
    createSortColumn,
    createCreatedAtColumn,
  }
}
