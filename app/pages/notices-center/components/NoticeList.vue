<script setup lang="ts">
import { NOTICE_TYPE } from '@/enums'

defineProps<{
  notices: Notice[]
}>()

const { locale } = useI18n()
const noticeId = defineModel<string | null>({ default: null })
const { getUserDisplayName } = useCurrentUser()
const { i18nNotices } = useMessage()

const userName = (author: User) => getUserDisplayName(author)
const email = (author: User) => author.email
const typeRaw = (type: typeof NOTICE_TYPE.valueType) => NOTICE_TYPE.raw(type)
</script>

<template>
  <div class="overflow-y-auto divide-y divide-default h-full">
    <div v-for="notice in notices" :key="notice.id">
      <div
        class="p-4 sm:px-6 text-sm cursor-pointer border-l-2 transition-colors"
        :class="cn(
          !notice.isRead ? 'text-highlighted' : 'text-toned',
          noticeId && noticeId === notice.id
            ? 'border-primary bg-primary/10'
            : 'border-bg hover:border-primary hover:bg-primary/5',
        )"
        @click="noticeId = notice.id"
      >
        <div :class="cn('flex flex-col gap-3', notice.isRead ? '' : 'font-semibold')">
          <div class="flex justify-between items-center gap-2">
            <UUser
              :name="userName(notice.author)"
              :description="userName(notice.author) === email(notice.author) ? undefined : email(notice.author)"
              :avatar="{
                src: notice.author.image ?? undefined,
                alt: userName(notice.author),
                loading: 'lazy',
              }"
              :ui="{ wrapper: 'text-left' }"
            />
            <div class="flex items-center gap-2">
              <UChip v-if="!notice.isRead" />
              <UBadge variant="soft" :color="typeRaw(notice.type).color" :label="i18nNotices(`typeOpts.${typeRaw(notice.type).label}`)" size="sm" />
              <NuxtTime
                v-if="notice.publishedAt"
                :datetime="notice.publishedAt"
                relative
                :locale
                :class="cn('text-xs text-muted shrink-0', notice.isRead ? '' : 'font-semibold')"
              />
            </div>
          </div>
          <div class="flex-1 line-clamp-2">
            {{ notice.title }}
          </div>
        </div>
        <p class="text-muted line-clamp-2 mt-2">
          {{ notice.summary ?? notice.content }}
        </p>
      </div>
    </div>
  </div>
</template>
