<script setup lang="ts">
import type { CheckboxGroupItem } from '@nuxt/ui'
import { map } from 'es-toolkit/compat'
import { PERMISSIONS } from '@/enums'

const props = defineProps<{
  roleList: Role[]
  refresh: VoidFunction
}>()

const { i18nPermissions, i18nCommon } = useMessage()
const { updateUserRoles, getUserRoles } = useSettingsApi()
const { successToast } = useAppToast()
const userId = defineModel<string | null>('userId', { required: true })
const saveLoading = ref(false)
const value = ref<string[]>([])

// 获取用户角色
const { data: userRoles, pending, refresh } = await useAsyncData(
  'user-roles',
  async () => {
    const res = await getUserRoles(userId.value!)
    return res.data ?? []
  },
  {
    immediate: false,
    default: () => [],
  },
)

const items = computed<CheckboxGroupItem[]>(() =>
  props.roleList.map(role => ({
    label: role.name,
    id: role.id,
  })),
)

const open = computed({
  get: () => !!userId.value,
  set: (value) => {
    if (!value) {
      userId.value = null
    }
  },
})

const isDisabled = computed(() => !value.value.length)

/**
 * 提交
 */
async function onSubmit() {
  saveLoading.value = true
  try {
    const { code } = await updateUserRoles({
      userId: userId.value || '',
      roleIds: value.value,
    })

    if (isSuccess(code)) {
      successToast({ title: i18nCommon('saveSuccess') })
      userId.value = null
      props.refresh()
    }
  }
  finally {
    saveLoading.value = false
  }
}

watch(open, (v) => {
  if (v && userId.value) {
    refresh()
  }
  if (!v) {
    value.value = []
  }
})

watch(
  () => userRoles.value,
  roles => value.value = map(roles, 'id'),
  { immediate: true },
)
</script>

<template>
  <UModal
    v-model:open="open"
    :title="i18nPermissions(PERMISSIONS.label(PERMISSIONS.ASSIGN_ROLES))"
    :ui="{ body: 'relative', footer: 'justify-end' }"
  >
    <template #body>
      <USelectMenu v-model="value" multiple value-key="id" :items="items" class="w-full" :placeholder="i18nCommon('select')" />
      <ContainerLoading v-if="pending" />
    </template>
    <template #footer="{ close }">
      <AutoFormModalFooter :loading="saveLoading" :disabled="isDisabled" @submit="onSubmit" @close="close" />
    </template>
  </UModal>
</template>
