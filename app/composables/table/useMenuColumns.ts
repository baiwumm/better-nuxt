import type { TableColumn } from '@nuxt/ui'
import { AutoFormDeleteButton, AutoFormEditButton, UBadge, UIcon, USwitch } from '#components'
import { PERMISSIONS } from '@/enums'

export function useMenuColumns(options: {
  saveLoading: Ref<boolean>
  deleteId: Ref<string | null>
  onEdit: (row: MenuTree) => void
  onDelete: (id: string) => void
}) {
  const { getHeader, createSortColumn, createCreatedAtColumn, createTreeColumn } = useTableColumns()

  const { saveLoading, deleteId, onEdit, onDelete } = options

  const { i18nCommon, i18nMenu, i18nPermissions } = useMessage()
  const { getPermissionValues } = usePermissions()

  const columns = computed<TableColumn<MenuTree>[]>(() => [
    createTreeColumn('label', i18nMenu('label'), true),
    {
      accessorKey: 'to',
      header: i18nMenu('to'),
      cell: ({ row }) => {
        const val = row.getValue('to')
        return val ? h(UBadge, { variant: 'soft', color: 'secondary' }, () => val) : '-'
      },
    },
    {
      accessorKey: 'icon',
      header: i18nCommon('icon'),
      cell: ({ row }) => {
        return h(UIcon, { name: row.getValue('icon'), class: 'size-5' })
      },
    },
    {
      accessorKey: 'badge',
      header: i18nMenu('badge'),
      cell: ({ row }) => {
        const val = row.getValue('badge')
        return val ? h(UBadge, { variant: 'outline', color: 'neutral' }, () => val) : '-'
      },
    },
    {
      accessorKey: 'permissions',
      header: i18nMenu('permissions'),
      cell: ({ row }) => {
        const val = row.original.permissions

        if (!val) {
          return '-'
        }

        const permissions = getPermissionValues(val)

        return h(
          'div',
          {
            class: 'flex flex-wrap items-center justify-center jus gap-1',
          },
          permissions.map((item) => {
            const raw = PERMISSIONS.raw(item)
            return h(
              UBadge,
              {
                key: item,
                variant: 'soft',
                color: 'neutral',
                icon: raw.icon,
              },
              () => i18nPermissions(PERMISSIONS.label(item)),
            )
          },
          ),
        )
      },
    },
    ...['keepAlive', 'defaultOpen', 'enabled'].map<TableColumn<MenuTree>>(v => ({
      accessorKey: v,
      header: v === 'enabled' ? i18nCommon(v) : i18nMenu(v),
      cell: ({ row }) => h(USwitch, {
        disabled: true,
        uncheckedIcon: 'lucide:x',
        checkedIcon: 'lucide:check',
        modelValue: row.getValue(v),
        ui: { root: 'justify-center' },
      }),
    })),
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
  return {
    columns,
  }
}
