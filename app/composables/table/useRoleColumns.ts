import type { TableColumn } from '@nuxt/ui'
import { AutoFormDeleteButton, AutoFormEditButton, UBadge, UButton } from '#components'
import { PERMISSIONS } from '@/enums'

export function useRoleColumns(options: {
  saveLoading: Ref<boolean>
  deleteId: Ref<string | null>
  onAuthorization: (row: Role) => void
  onEdit: (row: Role) => void
  onDelete: (id: string) => void
}) {
  const { saveLoading, deleteId, onEdit, onDelete, onAuthorization } = options
  const { i18nCommon, i18nRole, i18nPermissions } = useMessage()
  const { createCreatedAtColumn, getHeader, createSortColumn, createExpandColumn } = useTableColumns()

  const columns = computed<TableColumn<Role>[]>(() => [
    createExpandColumn(),
    {
      accessorKey: 'name',
      header: i18nRole('name'),
      cell: ({ row }) => h(UBadge, { variant: 'soft', color: 'info', icon: 'lucide:shield-user' }, () => row.getValue('name')),
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
            h(UButton, {
              label: i18nPermissions(PERMISSIONS.label(PERMISSIONS.ROLE_AUTH)),
              icon: PERMISSIONS.raw(PERMISSIONS.ROLE_AUTH).icon,
              size: 'xs',
              variant: 'outline',
              color: 'neutral',
              onClick: () => onAuthorization(row.original),
            }),
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
