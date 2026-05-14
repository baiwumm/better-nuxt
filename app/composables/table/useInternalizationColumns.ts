import type { TableColumn } from '@nuxt/ui'
import { UBadge, UButton } from '#components'

export function useInternalizationColumns(options: {
  saveLoading: Ref<boolean>
  deleteId: Ref<string | null>
  onAddChild: (row: InternalizationTree) => void
  onEdit: (row: InternalizationTree) => void
  onDelete: (row: InternalizationTree) => void
}) {
  const { getHeader, createSortColumn, createCreatedAtColumn, createTreeColumn } = useTableColumns()

  const { saveLoading, deleteId, onAddChild, onEdit, onDelete } = options

  const { i18nCommon, i18nInternalization } = useMessage()

  const columns = computed<TableColumn<InternalizationTree>[]>(() => [
    createTreeColumn('name', i18nInternalization('name')),
    ...['zh', 'en'].map<TableColumn<InternalizationTree>>(key => ({
      accessorKey: key,
      header: i18nInternalization(key),
      cell: ({ row }) => {
        const val = row.getValue(key)
        return val ? h(UBadge, { variant: 'soft', color: 'neutral' }, () => row.getValue(key)) : '-'
      },
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
              label: i18nCommon('addChild'),
              color: 'neutral',
              variant: 'outline',
              size: 'xs',
              icon: 'lucide:plus',
              disabled: saveLoading.value,
              onClick: () => onAddChild(row.original),
            }),
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
