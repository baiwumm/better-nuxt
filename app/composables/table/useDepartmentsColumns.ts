import type { TableColumn } from '@nuxt/ui'
import { AutoFormDeleteButton, AutoFormEditButton, UBadge, UUser } from '#components'

export function useDepartmentsColumns(options: {
  saveLoading: Ref<boolean>
  deleteId: Ref<string | null>
  onEdit: (row: DepartmentTree) => void
  onDelete: (id: string) => void
}) {
  const { saveLoading, deleteId, onEdit, onDelete } = options
  const { i18nCommon, i18nDepartments } = useMessage()
  const { createCreatedAtColumn, getHeader, createSortColumn, createTreeColumn } = useTableColumns()
  const { getUserDisplayName } = useCurrentUser()

  const columns = computed<TableColumn<DepartmentTree>[]>(() => [
    createTreeColumn('name', i18nDepartments('name')),
    {
      accessorKey: 'code',
      header: i18nDepartments('code'),
      cell: ({ row }) => h(UBadge, { variant: 'soft', color: 'neutral' }, () => row.getValue('code')),
    },
    {
      accessorKey: 'leader',
      header: i18nDepartments('leader'),
      cell: ({ row }) => {
        const u = row.original.leader
        if (!u) {
          return '-'
        }
        const userName = getUserDisplayName(u)
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
      accessorKey: 'description',
      header: i18nDepartments('description'),
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
