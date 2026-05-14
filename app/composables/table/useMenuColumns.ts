import type { TableColumn } from '@nuxt/ui'
import { UBadge, UButton, UIcon, USwitch } from '#components'

export function useMenuColumns(options: {
  saveLoading: Ref<boolean>
  deleteId: Ref<string | null>
  onEdit: (row: MenuTree) => void
  onDelete: (row: MenuTree) => void
}) {
  const { getHeader, createSortColumn, createCreatedAtColumn, createTreeColumn } = useTableColumns()

  const { saveLoading, deleteId, onEdit, onDelete } = options

  const { i18nCommon, i18nMenu } = useMessage()

  const columns = computed<TableColumn<MenuTree>[]>(() => [
    createTreeColumn('label', i18nMenu('label'), true),
    {
      accessorKey: 'to',
      header: i18nMenu('to'),
      cell: ({ row }) => {
        const val = row.getValue('to')
        return val ? h(UBadge, { variant: 'soft', color: 'secondary' }, () => row.getValue('to')) : '-'
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
        return val ? h(UBadge, { variant: 'outline', color: 'neutral' }, () => row.getValue('badge')) : '-'
      },
    },
    ...['keepAlive', 'defaultOpen', 'enabled'].map<TableColumn<MenuTree>>(v => ({
      accessorKey: v,
      header: i18nMenu(v),
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
            h(UButton, {
              label: i18nCommon('edit'),
              color: 'neutral',
              variant: 'outline',
              size: 'xs',
              icon: 'lucide:pencil-line',
              disabled: saveLoading.value,
              onClick: () => onEdit(row.original),
            }),
            h(UButton, {
              label: i18nCommon('delete'),
              color: 'error',
              variant: 'soft',
              size: 'xs',
              icon: 'lucide:trash-2',
              disabled: deleteId.value !== null && row.original.id !== deleteId.value,
              loading: deleteId.value !== null && row.original.id === deleteId.value,
              onClick: () => onDelete(row.original),
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
