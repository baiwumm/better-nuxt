<script setup lang="ts">
import { BAN_DURATIONS } from '@/enums'

const props = defineProps<{
  formKey: number
  refresh: VoidFunction
}>()

const { $authClient } = useNuxtApp()
const { successToast, errorToast } = useAppToast()

const { i18nUser, i18nCommon } = useMessage()
const { banUserFormSchema } = useSchema()
const loading = ref(false)

const userId = defineModel<string | null>('userId', { required: true })

const open = computed({
  get: () => !!userId.value,
  set: (value) => {
    if (!value) {
      userId.value = null
    }
  },
})

async function onSubmit(data: BanUserFormSchema) {
  const params = {
    userId: userId.value,
    banReason: data.banReason,
    banExpiresIn: data.banExpiresIn ? BAN_DURATIONS.raw(data.banExpiresIn).seconds : undefined,
  }
  loading.value = true
  const { error } = await $authClient.admin.banUser(params).finally(() => {
    loading.value = false
  })
  if (error) {
    errorToast(error.message)
  }
  else {
    successToast()
    userId.value = null
    props.refresh()
  }
}

const items = computed(() => BAN_DURATIONS.items.map(({ value, label }) => ({ label: i18nUser(`banExpiresOpts.${label}`), value })))
</script>

<template>
  <AutoFormModal
    :key="formKey"
    v-model:open="open"
    :title="i18nUser('banUser')"
    :schema="banUserFormSchema"
    @submit="onSubmit"
  >
    <template #banExpiresIn="{ state: stateValue }">
      <USelect
        v-model="stateValue.banExpiresIn"
        :placeholder="i18nCommon('select')"
        value-key="value"
        :items="items"
        :ui="{
          trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
        }"
        class="w-full"
      />
    </template>
    <template #footer="{ disabled, submit, close }">
      <AutoFormModalFooter
        :disabled="disabled"
        :loading="loading"
        @submit="submit"
        @close="close"
      />
    </template>
  </AutoFormModal>
</template>
