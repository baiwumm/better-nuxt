import type { TableColumn } from '@nuxt/ui'
import { AutoFormDeleteButton, AutoFormEditButton, UAvatar, UAvatarGroup, UBadge, UButton } from '#components'
import { PERMISSIONS } from '@/enums'

export function useRolesColumns(options: {
  saveLoading: Ref<boolean>
  deleteId: Ref<string | null>
  onAuthorization: (row: Role) => void
  onEdit: (row: Role) => void
  onDelete: (id: string) => void
}) {
  const { saveLoading, deleteId, onEdit, onDelete, onAuthorization } = options
  const { i18nCommon, i18nRoles, i18nPermissions } = useMessage()
  const { createCreatedAtColumn, getHeader, createSortColumn, createExpandColumn } = useTableColumns()
  const { getUserDisplayName } = useCurrentUser()

  const columns = computed<TableColumn<Role>[]>(() => [
    createExpandColumn(),
    {
      accessorKey: 'name',
      header: i18nRoles('name'),
      cell: ({ row }) => h(UBadge, { variant: 'soft', color: 'info', icon: 'lucide:shield-user' }, () => row.getValue('name')),
    },
    {
      accessorKey: 'code',
      header: i18nRoles('code'),
      cell: ({ row }) => h(UBadge, { variant: 'soft', color: 'neutral' }, () => row.getValue('code')),
    },
    {
      accessorKey: 'users',
      header: i18nRoles('users'),
      cell: ({ row }) => {
        const users = row.original.users
        if (!users?.length) {
          return '-'
        }
        return h(UAvatarGroup, { max: 3 }, () => users.map((v) => {
          const user = v.user
          return h(UAvatar, { src: user.image ?? undefined, alt: getUserDisplayName(user), loading: 'lazy' })
        }))
      },
    },
    {
      accessorKey: 'description',
      header: i18nRoles('description'),
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
