import type { TableColumn } from '@nuxt/ui'
import { upperFirst } from 'es-toolkit/string'
import { UBadge, UButton, UDropdownMenu, UUser } from '#components'

export function userUserColumns(options: {
  onEdit: (row: User) => void
  onDelete: (id: string) => void
  onBan: (row: User) => void
  onResetPassword: (id: string) => void
}) {
  const { onEdit, onDelete, onBan, onResetPassword } = options
  const { i18nUser, i18nCommon } = useMessage()
  const { createCreatedAtColumn, getHeader } = useTableColumns()
  const { getUserDisplayName } = useCurrentUser()

  const columns = computed<TableColumn<User>[]>(() => [
    {
      accessorKey: 'name',
      header: i18nUser('name'),
      cell: ({ row }) => {
        const u = row.original
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
      accessorKey: 'role',
      header: i18nUser('role'),
      cell: ({ row }) => {
        const val = row.original.role
        return val
          ? h(
              'div',
              {
                class: 'flex justify-center items-center gap-2',
              },
              val.split(',').map((v: string) => h(UBadge, { variant: 'soft', color: 'info' }, () => i18nUser(`role${upperFirst(v)}`))),
            )
          : '-'
      },
    },
    {
      accessorKey: 'emailVerified',
      header: i18nUser('emailVerified'),
      cell: ({ row }) => {
        const val = row.getValue('emailVerified')
        return h(UBadge, { variant: 'soft', color: val ? 'success' : 'error' }, () => i18nUser(`emailVerified${val ? 'Yes' : 'No'}`))
      },
    },
    {
      accessorKey: 'lastLoginMethod',
      header: i18nUser('lastLoginMethod'),
      cell: ({ row }) => {
        const val = row.getValue('lastLoginMethod')
        return val ? h(UBadge, { variant: 'soft', color: 'neutral' }, () => val) : '-'
      },
    },
    {
      accessorKey: 'banned',
      header: i18nUser('banned'),
      cell: ({ row }) => {
        const val = row.getValue('banned')
        return h(UBadge, { variant: 'soft', color: val ? 'error' : 'success' }, () => i18nCommon(val ? 'yes' : 'no'))
      },
    },
    {
      accessorKey: 'banReason',
      header: i18nUser('banReason'),
      cell: ({ row }) => row.getValue('banReason') ?? '-',
    },
    createCreatedAtColumn(),
    {
      accessorKey: 'action',
      header: ({ column }) => getHeader(column, i18nCommon('action'), 'right'),
      cell: ({ row }) => {
        const banned = row.getValue('banned')
        return h(
          UDropdownMenu,
          {
            'arrow': true,
            'items': [
              {
                label: i18nCommon('edit'),
                icon: 'lucide:pencil-line',
                onSelect() {
                  onEdit(row.original)
                },
              },
              {
                label: i18nUser(banned ? 'unbanUser' : 'banUser'),
                icon: banned ? 'lucide:user-check' : 'lucide:user-x',
                color: banned ? undefined : 'error',
                onSelect() {
                  onBan(row.original)
                },
              },
              {
                label: i18nUser('resetPassword'),
                icon: 'lucide:key-round',
                onSelect() {
                  onResetPassword(row.original.id)
                },
              },
              {
                label: i18nCommon('delete'),
                icon: 'lucide:trash-2',
                color: 'error',
                onSelect() {
                  onDelete(row.original.id)
                },
              },
            ],
            'aria-label': 'Actions dropdown',
          },
          () =>
            h(UButton, {
              'icon': 'i-lucide-ellipsis',
              'color': 'neutral',
              'variant': 'ghost',
              'aria-label': 'Actions dropdown',
            }),
        )
      },
    },
  ])

  return { columns }
}
