<script setup lang="ts">
import { pick } from 'es-toolkit'

const props = defineProps<{
  data: I18n | null
  i18nTree: I18nTree[]
  loading: boolean
  parentId: string | null
  formKey: number
}>()

const emit = defineEmits<{
  (e: 'submit', v: I18nFormSchema): void
}>()

const { i18nLocales, i18nCommon, i18nPermissions } = useMessage()
const { i18nFormSchema } = useSchema()
const { flattenTree } = useTreeTool()

const modelValue = defineModel<boolean>({ required: true })

// 初始表单状态
const INITIAL_STATE = Object.freeze<I18nFormSchema>({
  parentId: null,
  name: '',
  zh: null,
  en: null,
  sort: 0,
})
const FORM_FIELDS = Object.keys(INITIAL_STATE) as (keyof I18nFormSchema)[]

const initialState = computed<I18nFormSchema>(() => ({
  ...INITIAL_STATE,
  ...(props.data
    ? pick(props.data, FORM_FIELDS)
    : {}),
  parentId: props.data?.parentId ?? props.parentId ?? null,
}))

function onSubmit(data: I18nFormSchema) {
  emit('submit', data)
}
const selectMenuItems = computed(() => flattenTree(props.i18nTree, 'name'))

const autoFormKey = computed(() => props.data?.id ? `edit-${props.data.id}` : props.parentId ?? props.formKey)
</script>

<template>
  <AutoFormModal
    :key="autoFormKey"
    v-model:open="modelValue"
    :title="parentId ? i18nPermissions('addChild') : i18nLocales(data?.id ? 'edit' : 'add')"
    :schema="i18nFormSchema"
    :initial-state="initialState"
    @submit="onSubmit"
  >
    <template #parentId="{ field, state: stateValue }">
      <USelectMenu
        v-model="stateValue[field]"
        value-key="id"
        :items="selectMenuItems"
        :placeholder="i18nCommon('select')"
        icon="lucide:case-sensitive"
        clear
        :disabled="!!parentId"
        class="w-full"
        :ui="{
          trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
        }"
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
