import type { TableColumn } from '@nuxt/ui'
import { AutoFormDeleteButton, AutoFormEditButton, UBadge } from '#components'

export function useRoleColumns(options: {
  saveLoading: Ref<boolean>
  deleteId: Ref<string | null>
  onEdit: (row: Role) => void
  onDelete: (id: string) => void
}) {
  const { saveLoading, deleteId, onEdit, onDelete } = options
  const { i18nCommon, i18nRole } = useMessage()
  const { createCreatedAtColumn, getHeader, createSortColumn } = useTableColumns()

  const columns = computed<TableColumn<Role>[]>(() => [
    {
      accessorKey: 'name',
      header: i18nRole('name'),
      cell: ({ row }) => h(UBadge, { variant: 'soft', color: 'info' }, () => row.getValue('name')),
    },
    {
      accessorKey: 'code',
      header: i18nRole('code'),
      cell: ({ row }) => h(UBadge, { variant: 'soft', color: 'neutral' }, () => row.getValue('code')),
    },
    {
      accessorKey: 'description',
      header: i18nRole('description'),
      cell: ({ row }) => row.getValue('description') ?? '-',
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
