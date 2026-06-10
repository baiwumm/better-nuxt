import type { TableColumn } from '@nuxt/ui'
import { AutoFormDeleteButton, AutoFormEditButton, UBadge } from '#components'

export function usePostsColumns(options: {
  saveLoading: Ref<boolean>
  deleteId: Ref<string | null>
  onEdit: (row: Post) => void
  onDelete: (id: string) => void
}) {
  const { saveLoading, deleteId, onEdit, onDelete } = options
  const { i18nCommon, i18nPosts } = useMessage()
  const { createCreatedAtColumn, getHeader, createSortColumn } = useTableColumns()
  const { getUserDisplayName } = useCurrentUser()

  const columns = computed<TableColumn<Post>[]>(() => [
    {
      accessorKey: 'name',
      header: i18nPosts('name'),
      cell: ({ row }) => h(UBadge, { }, () => row.getValue('name')),
    },
    {
      accessorKey: 'code',
      header: i18nPosts('code'),
      cell: ({ row }) => h(UBadge, { variant: 'soft', color: 'neutral' }, () => row.getValue('code')),
    },
    {
      accessorKey: 'department',
      header: i18nPosts('department'),
      cell: ({ row }) => {
        const d = row.original.department
        if (!d) {
          return '-'
        }
        return h(UBadge, {
          variant: 'soft',
          color: 'info',
          avatar: d?.leader
            ? {
                src: d.leader.image || undefined,
                alt: getUserDisplayName(d.leader)?.slice(0, 2).toUpperCase(),
                loading: 'lazy',
              }
            : undefined,
        }, () => d.name)
      },
    },
    {
      accessorKey: 'description',
      header: i18nPosts('description'),
      cell: ({ row }) => row.getValue('description') ?? '-',
    },
    {
      accessorKey: 'enabled',
      header: i18nCommon('enabled'),
      cell: ({ row }) => {
        const val = row.getValue('enabled')
        return h(UBadge, { variant: 'soft', color: val ? 'success' : 'error' }, () => val ? i18nCommon('yes') : i18nCommon('no'))
      },
    },
    createSortColumn(),
    createCreatedAtColumn(),
    {
      accessorKey: 'action',
      header: ({ column }) => getHeader(column, i18nCommon('action'), 'right'),
      cell: ({ row }) => {
        return h(
          'div',
          {
            class: 'flex justify-center items-center gap-2',
          },
          [
            h(AutoFormEditButton, {
              disabled: saveLoading.value,
              onEdit: () => onEdit(row.original),
            }),
            h(AutoFormDeleteButton, {
              disabled: deleteId.value !== null && row.original.id !== deleteId.value,
              loading: deleteId.value !== null && row.original.id === deleteId.value,
              onDelete: () => onDelete(row.original.id),
            }),
          ],
        )
      },
    },
  ])

  return { columns }
}
