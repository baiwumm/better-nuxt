<script setup lang="ts">
import type z from 'zod'
import { pick } from 'es-toolkit'

const props = defineProps<{
  data: Internalization | null
  internalizationTree: InternalizationTree[]
  loading: boolean
  parentId: string | null
}>()

const emit = defineEmits<{
  (e: 'submit', v: InsertInternalization): void
}>()

const { i18nInternalization, i18nCommon } = useMessage()
const { internalizationFormSchema } = useSchema()
const { flattenTree } = useTreeTool()

const modelValue = defineModel<boolean>({ required: true })

type FormSchema = z.infer<typeof internalizationFormSchema>

// 初始表单状态
const INITIAL_STATE = Object.freeze<FormSchema>({
  parentId: null,
  name: '',
  zh: null,
  en: null,
  sort: 0,
})
const FORM_FIELDS = Object.keys(INITIAL_STATE) as (keyof FormSchema)[]

const initialState = computed<FormSchema>(() => ({
  ...INITIAL_STATE,
  ...(props.data
    ? pick(props.data, FORM_FIELDS)
    : {}),
  parentId: props.data?.parentId ?? props.parentId ?? null,
}))

function onSubmit(data: FormSchema) {
  emit('submit', data)
}
const selectMenuItems = computed(() => flattenTree(props.internalizationTree, 'name'))
</script>

<template>
  <AutoFormModal
    :key="data?.id ?? `create-${parentId}`"
    v-model:open="modelValue"
    :title="parentId ? i18nCommon('addChild') : i18nInternalization(data?.id ? 'edit' : 'add')"
    :schema="internalizationFormSchema"
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
