import type { BadgeProps, TableColumn } from '@nuxt/ui'
import { compact, uniq } from 'es-toolkit/array'
import { AutoFormDeleteButton, UBadge, UserView } from '#components'

export function useLogsColumns(options: {
  deleteId: Ref<string | null>
  onDelete: (id: string) => void
}) {
  const { getHeader, createCreatedAtColumn, createExpandColumn, createCheckboxColumn } = useTableColumns()

  const { deleteId, onDelete } = options

  const { i18nCommon, i18nLogs } = useMessage()

  const columns = computed<TableColumn<Log>[]>(() => [
    createExpandColumn(),
    createCheckboxColumn(),
    {
      accessorKey: 'user',
      header: i18nLogs('user'),
      cell: ({ row }) => {
        const u = row.original.user
        return h(UserView, {
          user: u,
          ui: {
            wrapper: 'text-left',
          },
        })
      },
    },
    {
      accessorKey: 'method',
      header: i18nLogs('method'),
      cell: ({ row }) => {
        const val = row.original.method
        const colorMap: Record<Methods, BadgeProps['color']> = {
          [METHODS.GET]: 'success',
          [METHODS.POST]: 'warning',
          [METHODS.PUT]: 'info',
          [METHODS.DELETE]: 'error',
        }
        return h(UBadge, { variant: 'soft', color: colorMap[val] }, () => val)
      },
    },
    ...['ip', 'os', 'browser', 'device'].map<TableColumn<Log>>(key => ({
      accessorKey: key,
      header: i18nLogs(key),
      cell: ({ row }) => h(UBadge, { variant: 'soft', color: 'neutral' }, () => row.getValue(key)),
    })),
    {
      accessorKey: 'geo',
      header: i18nLogs('geo'),
      cell: ({ row }) => {
        const geo = row.original.geo
        if (!geo) {
          return '-'
        }
        const result = compact(uniq([geo.country, geo.province, geo.city]))
        return result.join('·')
      },
    },
    createCreatedAtColumn(),
    {
      accessorKey: 'action',
      header: ({ column }) => getHeader(column, i18nCommon('action'), 'right'),
      cell: ({ row }) => {
        return h(AutoFormDeleteButton, {
          disabled: deleteId.value !== null && row.original.id !== deleteId.value,
          loading: deleteId.value !== null && row.original.id === deleteId.value,
          onDelete: () => onDelete(row.original.id),
        })
      },
    },
  ])

  return {
    columns,
  }
}
