import type { TableColumn } from '@nuxt/ui'
import { AutoFormAddChildButton, AutoFormDeleteButton, AutoFormEditButton, UBadge } from '#components'

export function useI18nColumns(options: {
  saveLoading: Ref<boolean>
  deleteId: Ref<string | null>
  onAddChild: (row: I18nTree) => void
  onEdit: (row: I18nTree) => void
  onDelete: (id: string) => void
}) {
  const { getHeader, createSortColumn, createCreatedAtColumn, createTreeColumn } = useTableColumns()

  const { saveLoading, deleteId, onAddChild, onEdit, onDelete } = options

  const { i18nCommon, i18nLocales } = useMessage()

  const columns = computed<TableColumn<I18nTree>[]>(() => [
    createTreeColumn('name', i18nLocales('name')),
    ...['zh', 'en'].map<TableColumn<I18nTree>>(key => ({
      accessorKey: key,
      header: i18nLocales(key),
      cell: ({ row }) => {
        const val = row.getValue(key)
        return val ? h(UBadge, { variant: 'soft', color: 'neutral' }, () => val) : '-'
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
            h(AutoFormAddChildButton, {
              disabled: saveLoading.value,
              onAddChild: () => onAddChild(row.original),
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

  return {
    columns,
  }
}
