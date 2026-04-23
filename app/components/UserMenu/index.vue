<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import pkg from '~~/package.json'
import { COLOR_MODES, I18N_LOCALES } from '@/enums'
import { getColor, getPrimaryColors } from '@/utils/constants'

defineProps<{
  collapsed?: boolean
}>()

const toast = useToast()
const { locale, setLocale } = useI18n()
const loading = ref(false)

const colorMode = useColorMode()
const appConfig = useAppConfig()
// 获取登录用户信息
const { userName, email, avatar, isPending } = useCurrentUser()

const router = useRouter()
const appStore = useAppStore()
const { $authClient } = useNuxtApp()

const { primaryColor, blackAsPrimary, radius } = storeToRefs(appStore)
const { setPrimaryColor, setBlackAsPrimary, setRadius } = appStore

const items = computed(() => ([
  [{
    type: 'label',
    label: userName.value,
    avatar: {
      src: avatar.value,
      alt: userName.value,
      loading: 'lazy',
    },
  }],
  [{
    label: $t('components.themePicker.primaryColor'),
    icon: 'lucide:palette',
    chip: appConfig.ui.colors.primary,
    children: [
      {
        label: 'Black',
        chip: 'black',
        slot: 'primary' as const,
        checked: blackAsPrimary.value,
        type: 'checkbox',
        onSelect: (e: Event) => {
          e.preventDefault()
          setBlackAsPrimary(true)
        },
      },
      ...getPrimaryColors().map(color => ({
        label: color,
        chip: color,
        slot: 'primary' as const,
        checked: !blackAsPrimary.value && primaryColor.value === color,
        type: 'checkbox',
        onSelect: (e: Event) => {
          e.preventDefault()
          setPrimaryColor(color)
          setBlackAsPrimary(false)
        },
      })),
    ],
  }, {
    label: $t('components.themePicker.colorMode'),
    icon: 'lucide:sun-moon',
    children: COLOR_MODES.items.map(({ value, label, raw }) => ({
      label,
      icon: raw.icon,
      type: 'checkbox',
      checked: colorMode.preference === value,
      onSelect(e: Event) {
        e.preventDefault()
        colorMode.preference = value
      },
    })),
  }, {
    label: $t('components.themePicker.locales'),
    icon: 'lucide:globe',
    children: I18N_LOCALES.items.map(({ value, label, raw }) => ({
      label,
      icon: raw.icon,
      slot: 'locales' as const,
      type: 'checkbox',
      checked: locale.value === value,
      onSelect(e: Event) {
        e.preventDefault()
        setLocale(value)
      },
    })),
  }, {
    label: $t('components.themePicker.radius'),
    icon: 'lucide:radius',
    children: [0, 0.125, 0.25, 0.375, 0.5].map(r => ({
      label: String(r),
      type: 'checkbox',
      checked: radius.value === r,
      onSelect(e: Event) {
        e.preventDefault()
        setRadius(r)
      },
    })),
  }],
  [
    {
      label: $t('layout.github'),
      icon: 'simple-icons:github',
      to: pkg.git.url,
      target: '_blank',
    },
    {
      label: $t('layout.blog'),
      icon: 'i-lucide-house',
      to: 'https://baiwumm.com',
      target: '_blank',
    },
  ],
  [
    {
      label: $t('auth.logout.title'),
      icon: 'i-lucide-log-out',
      color: 'error',
      onSelect: async () => {
        loading.value = true
        toast.add({
          'title': $t('auth.waitLogout'),
          'icon': 'lucide:log-out',
          'onUpdate:open': (open: boolean) => {
            if (open && loading.value) {
              return false
            }
          },
        })
        await $authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push('/auth/sign-in')
            },
          },
        }).finally(() => {
          loading.value = false
        })
      },
    },
  ],
]) satisfies DropdownMenuItem[])
</script>

<template>
  <div v-if="isPending" class="flex justify-center w-full">
    <Spinner />
  </div>
  <UDropdownMenu
    v-else
    :items="items"
    arrow
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :ui="{
        trailingIcon: 'text-dimmed',
      }"
      :trailing-icon="collapsed ? undefined : 'i-lucide-chevrons-up-down'"
    >
      <UUser
        :name="collapsed ? undefined : userName"
        :description="collapsed ? undefined : email"
        :avatar="{
          src: avatar,
          alt: userName,
          loading: 'lazy',
        }"
        :chip="{
          color: 'success',
          position: 'bottom-right',
        }"
        :ui="{ wrapper: 'text-left' }"
      />
    </UButton>
    <template #primary-leading="{ item }">
      <div class="inline-flex items-center justify-center shrink-0 size-5">
        <span
          :class="cn('inline-block size-2 rounded-full', item.chip === 'black' ? 'bg-black dark:bg-white' : '')"
          :style="{
            backgroundColor: item.chip === 'black' ? undefined : getColor(item.chip, 500),
          }"
        />
      </div>
    </template>

    <template #locales-leading="{ item }">
      <span>{{ item.icon }}</span>
    </template>
  </UDropdownMenu>
</template>
