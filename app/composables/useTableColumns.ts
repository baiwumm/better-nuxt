/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-13 14:32:44
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-13 17:08:07
 * @Description: 公共表格列项
 */
import type { TableColumn } from '@nuxt/ui'
import type { Column } from '@tanstack/vue-table'
import { UBadge, UButton, UCheckbox } from '#components'

export function useTableColumns() {
  const { i18nCommon } = useMessage()
  const dayjs = useDayjs()

  // 头部 - 列固定
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

  // 列展开
  function createExpandColumn<T>(): TableColumn<T> {
    return {
      id: 'expand',
      cell: ({ row }) =>
        h(UButton, {
          'color': 'neutral',
          'variant': 'ghost',
          'icon': 'lucide:chevron-right',
          'square': true,
          'aria-label': 'Expand',
          'ui': {
            leadingIcon: [
              'transition-transform',
              row.getIsExpanded() ? 'duration-200 rotate-90' : '',
            ],
          },
          'onClick': () => row.toggleExpanded(),
        }),
    }
  }

  // 多选
  function createCheckboxColumn<T>(): TableColumn<T> {
    return {
      id: 'batchSelect',
      header: ({ table }) =>
        h(UCheckbox, {
          'modelValue': table.getIsSomePageRowsSelected()
            ? 'indeterminate'
            : table.getIsAllPageRowsSelected(),
          'onUpdate:modelValue': (value: unknown) =>
            table.toggleAllPageRowsSelected(!!value),
          'aria-label': 'Select all',
        }),
      cell: ({ row }) =>
        h(UCheckbox, {
          'modelValue': row.getIsSelected(),
          'onUpdate:modelValue': (value: unknown) => row.toggleSelected(!!value),
          'aria-label': 'Select row',
        }),
    }
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
    createExpandColumn,
    createCheckboxColumn,
  }
}
