import type { BadgeProps, TableColumn } from '@nuxt/ui'
import { AutoFormDeleteButton, UBadge, UUser } from '#components'
import { METHODS } from '@/enums'

export function useLogColumns(options: {
  deleteId: Ref<string | null>
  onDelete: (id: string) => void
}) {
  const { getHeader, createCreatedAtColumn, createExpandColumn, createCheckboxColumn } = useTableColumns()

  const { deleteId, onDelete } = options

  const { i18nCommon, i18nLog } = useMessage()

  const columns = computed<TableColumn<Log>[]>(() => [
    createExpandColumn(),
    createCheckboxColumn(),
    {
      accessorKey: 'user',
      header: i18nLog('user'),
      cell: ({ row }) => {
        const u = row.original.user
        const userName = u?.displayUsername || u?.username || u?.name || u?.email
        return h(UUser, {
          name: userName,
          description: userName === u.email ? undefined : u.email,
          avatar: {
            src: u.image || undefined,
            alt: userName?.slice(0, 2).toUpperCase(),
            loading: 'lazy',
          },
          ui: {
            wrapper: 'text-left',
          },
        })
      },
    },
    {
      accessorKey: 'method',
      header: i18nLog('method'),
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
      header: i18nLog(key),
      cell: ({ row }) => h(UBadge, { variant: 'soft', color: 'neutral' }, () => row.getValue(key)),
    })),
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
