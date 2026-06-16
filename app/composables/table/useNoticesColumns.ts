import type { TableColumn } from '@nuxt/ui'
import { AutoFormDeleteButton, AutoFormEditButton, UAvatar, UAvatarGroup, UBadge, UButton, UUser } from '#components'
import { NOTICE_TYPE } from '@/enums'

export function useNoticesColumns(options: {
  saveLoading: Ref<boolean>
  deleteId: Ref<string | null>
  onEdit: (row: Notice) => void
  onDelete: (id: string) => void
}) {
  const { saveLoading, deleteId, onEdit, onDelete } = options
  const { i18nCommon, i18nNotices } = useMessage()
  const { createCreatedAtColumn, getHeader, createExpandColumn } = useTableColumns()
  const { getUserDisplayName } = useCurrentUser()
  const dayjs = useDayjs()
  const router = useRouter()

  const columns = computed<TableColumn<Notice>[]>(() => [
    createExpandColumn(),
    {
      accessorKey: 'author',
      header: i18nNotices('author'),
      cell: ({ row }) => {
        const u = row.original.author
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
            root: 'flex justify-center items-center',
            wrapper: 'text-left',
          },
        })
      },
    },
    {
      accessorKey: 'title',
      header: i18nNotices('caption'),
      cell: ({ row }) => h(UButton, {
        variant: 'link',
        label: row.original.title,
        ui: {
          base: 'max-w-80',
        },
        onClick: () => {
          router.push(`/administrative/notices/${row.original.id}`)
        },
      }),
    },
    {
      accessorKey: 'reads',
      header: i18nNotices('reads'),
      cell: ({ row }) => {
        const reads = row.original.reads
        if (!reads?.length) {
          return '-'
        }
        return h(UAvatarGroup, { max: 3 }, () => reads.map((v) => {
          const user = v.user
          return h(UAvatar, { src: user?.image ?? undefined, alt: getUserDisplayName(user), loading: 'lazy' })
        }))
      },
    },
    {
      accessorKey: 'type',
      header: i18nNotices('type'),
      cell: ({ row }) => {
        const val = row.original.type
        if (!val) {
          return '-'
        }
        const raw = NOTICE_TYPE.raw(val)
        return h(UBadge, { variant: 'soft', color: raw?.color }, () => i18nNotices(`typeOpts.${raw.label}`))
      },
    },
    {
      accessorKey: 'pinned',
      header: i18nNotices('pinned'),
      cell: ({ row }) => {
        const val = row.getValue('pinned')
        return h(UBadge, { variant: 'soft', color: val ? 'success' : 'error' }, () => val ? i18nCommon('yes') : i18nCommon('no'))
      },
    },
    {
      accessorKey: 'published',
      header: i18nNotices('published'),
      cell: ({ row }) => {
        const val = row.getValue('published')
        return h(UBadge, { variant: 'soft', color: val ? 'success' : 'warning' }, () => val ? i18nNotices('published') : i18nNotices('unPublished'))
      },
    },
    {
      accessorKey: 'publishedAt',
      header: i18nNotices('publishedAt'),
      cell: ({ row }) => {
        const publishedAt = row.getValue('publishedAt')
        return publishedAt ? dayjs(row.getValue('publishedAt')).format('YYYY-MM-DD HH:mm:ss') : '-'
      },
    },
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
