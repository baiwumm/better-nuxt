import type { DropdownMenuItem, DropdownMenuProps, TableColumn } from '@nuxt/ui'
import { upperFirst } from 'es-toolkit/string'
import { NuxtTime, UBadge, UButton, UDropdownMenu, UTooltip, UUser } from '#components'
import { PERMISSIONS } from '@/enums'

export function userUserColumns(options: {
  onAssignRoles: (id: string) => void
  onViewSessions: (id: string) => void
  onEdit: (row: User) => void
  onDelete: (id: string) => void
  onBan: (row: User) => void
  onResetPassword: (id: string) => void
}) {
  const { onAssignRoles, onViewSessions, onEdit, onDelete, onBan, onResetPassword } = options
  const { i18nUser, i18nCommon, i18nPermissions } = useMessage()
  const { createCreatedAtColumn, getHeader } = useTableColumns()
  const { getUserDisplayName } = useCurrentUser()
  const dayjs = useDayjs()
  const { locale } = useI18n()
  const route = useRoute()

  // 当前页面权限（一次性取出，避免重复 Map lookup）
  const currentPermissions = computed(() => {
    return (
      useMenuStore().permissionsMap.get(route.path) ?? 0
    )
  })

  // 👉 安全权限判断（基于当前页权限位）
  const can = (bit: number | undefined) => {
    if (!bit)
      return true
    return (currentPermissions.value & bit) === bit
  }

  // 👉 工具函数：创建 action
  const createItem = (
    enabled: boolean | null,
    raw: ReturnType<typeof PERMISSIONS.raw>,
    item: DropdownMenuItem,
  ) => {
    const allowed = enabled && can(raw ? raw.bits : 0)
    return {
      label: raw ? i18nPermissions(raw.label) : '',
      icon: raw?.icon,
      disabled: !allowed,
      ...item,
    }
  }

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
      accessorKey: 'systemRole',
      header: i18nUser('systemRole'),
      cell: ({ row }) => {
        const val = row.original.role
        return val
          ? h(
              'div',
              {
                class: 'flex justify-center items-center gap-2',
              },
              val.split(',').map((v: string) => h(UBadge, { variant: 'soft', color: 'info' }, () => i18nUser(`systemRole${upperFirst(v)}`))),
            )
          : '-'
      },
    },
    {
      accessorKey: 'permissionsRole',
      header: i18nUser('permissionsRole'),
      cell: ({ row }) => {
        const roles = row.original.roles ?? []
        if (!roles?.length) {
          return '-'
        }
        const extra = roles.length - 1
        return h(
          'div',
          {
            class: 'flex justify-center items-center gap-1',
          },
          [
            h(UBadge, { variant: 'soft', color: 'info' }, () => roles[0]?.role.name),
            extra > 0 ? h(UBadge, { variant: 'soft', color: 'neutral' }, () => `+${extra}`) : null,
          ],
        )
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
    {
      accessorKey: 'unbanTime',
      header: i18nUser('unbanTime'),
      cell: ({ row }) => {
        const val = row.original.banExpires
        const banned = row.original.banned

        // 未封禁
        if (!banned) {
          return '-'
        }

        // 永久封禁
        if (!val) {
          return h(
            UBadge,
            { variant: 'soft', color: 'error' },
            () => i18nUser('permanentBan'),
          )
        }

        const now = dayjs()
        const expires = dayjs(val)
        const isActiveBan = expires.isAfter(now)

        const abs = expires.format('YYYY-MM-DD HH:mm')

        // 已过期（已解除封禁）
        if (!isActiveBan) {
          return h(
            UBadge,
            { variant: 'soft', color: 'success' },
            () => i18nUser('unbanned'),
          )
        }

        // 正在封禁中
        return h(
          UTooltip,
          {
            arrow: true,
            text: abs,
          },
          () =>
            h('span', { class: 'text-xs' }, [
              h(NuxtTime, {
                datetime: val,
                relative: true,
                locale: locale.value,
                class: 'text-warning font-medium',
              }),
            ]),
        )
      },
    },
    createCreatedAtColumn(),
    {
      accessorKey: 'action',
      header: ({ column }) => getHeader(column, i18nCommon('action'), 'right'),
      cell: ({ row }) => {
        const userId = row.original.id
        const banned = row.original.banned
        const items = [
          createItem(true, PERMISSIONS.raw(PERMISSIONS.ASSIGN_ROLES), {
            onSelect: () => onAssignRoles(userId),
          }),
          createItem(true, PERMISSIONS.raw(PERMISSIONS.VIEW_SESSIONS), {
            onSelect: () => onViewSessions(userId),
          }),
          createItem(true, PERMISSIONS.raw(PERMISSIONS.EDIT), {
            onSelect: () => onEdit(row.original),
          }),

          createItem(!banned, PERMISSIONS.raw(PERMISSIONS.BAN_USER), {
            color: 'error',
            onSelect: () => onBan(row.original),
          }),

          createItem(banned ?? true, PERMISSIONS.raw(PERMISSIONS.UNBAN_USER), {
            color: 'success',
            onSelect: () => onBan(row.original),
          }),

          createItem(true, PERMISSIONS.raw(PERMISSIONS.RESET_PASSWORD), {
            onSelect: () => onResetPassword(userId),
          }),

          createItem(true, PERMISSIONS.raw(PERMISSIONS.DELETE), {
            color: 'error',
            onSelect: () => onDelete(userId),
          }),
        ].filter(i => !i.disabled) as DropdownMenuProps['items']
        return h(
          UDropdownMenu,
          {
            'arrow': true,
            items,
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
