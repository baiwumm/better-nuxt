<script setup lang="ts">
import type { FormSubmitEvent, SelectMenuItem } from '@nuxt/ui'
import { cloneDeep } from 'es-toolkit'
import z from 'zod'

const props = defineProps<{
  data: Internalization | null
  internalizationTree: InternalizationTree[]
  loading: boolean
  parentId: string | null
}>()

const emit = defineEmits<{
  (e: 'submit', v: InsertInternalization): void
}>()

const modelValue = defineModel<boolean>({ required: true })

const formSchema = z.object({
  parentId: z.string().nullable().optional(),
  name: z.string($t('common.placeholder')).min(1, $t('common.required')),
  zh: z.string().optional(),
  en: z.string().optional(),
  sort: z.number().default(0),
})
type FormSchema = z.output<typeof formSchema>

// 初始表单状态
const INITIAL_STATE = Object.freeze<FormSchema>({
  parentId: undefined,
  name: '',
  zh: undefined,
  en: undefined,
  sort: 0,
})

/** 表单 */
const state = reactive<FormSchema>(cloneDeep(INITIAL_STATE))

/** 重置函数 */
function resetState(newData?: Partial<FormSchema> | null) {
  const target = newData ?? INITIAL_STATE
  Object.keys(state).forEach(key => delete state[key as keyof FormSchema])
  Object.assign(state, cloneDeep(target))
}

/** 回填数据 */
watch(
  () => props.data,
  (val) => {
    if (val) {
      resetState({
        ...val,
        parentId: val.parentId ?? undefined,
        zh: val.zh ?? undefined,
        en: val.en ?? undefined,
      })
    }
    else {
      resetState()
    }
  },
  { immediate: true },
)
watch(
  () => props.parentId,
  (val) => {
    if (val) {
      resetState({ parentId: val, sort: 0 })
    }
  },
)

watch(modelValue, (val) => {
  if (!val) {
    resetState()
  }
})

/** 提交 */
async function onSubmit(event: FormSubmitEvent<FormSchema>) {
  const values = event.data
  emit('submit', {
    ...values,
    parentId: values.parentId ?? undefined,
    zh: values.zh ?? null,
    en: values.en ?? null,
  })
}

function flattenInternalizationTree(tree: InternalizationTree[], level = 0, result: SelectMenuItem[] = []) {
  tree.forEach((node) => {
    const prefix = '　'.repeat(level) + (level > 0 ? '└ ' : '')
    result.push({
      id: node.id,
      label: prefix + node.name,
      icon: 'lucide:case-sensitive',
    })

    if (node.children && node.children.length) {
      flattenInternalizationTree(node.children, level + 1, result)
    }
  })
  return result
}
const selectMenuItems = computed(() => flattenInternalizationTree(props.internalizationTree))
</script>

<template>
  <UModal
    v-model:open="modelValue"
    :title="$t(`pages.systemSettings.internalization.${data?.id ? 'edit' : 'add'}`)"
    :dismissible="false"
    :ui="{ footer: 'justify-end' }"
  >
    <template #body>
      <UForm id="menu-form" :schema="formSchema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField name="parentId" :label="$t('common.parent')">
          <USelectMenu
            v-model="state.parentId"
            value-key="id"
            :items="selectMenuItems"
            :placeholder="$t('common.select')"
            icon="lucide:case-sensitive"
            clear
            :disabled="!!parentId"
            class="w-full"
            :ui="{
              trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
            }"
          />
        </UFormField>
        <UFormField name="name" :label="$t('pages.systemSettings.internalization.name')" required>
          <UInput
            v-model="state.name"
            :maxlength="200"
            :aria-describedby="$t('common.placeholder')"
            :placeholder="$t('common.placeholder')"
            class="w-full"
          >
            <template #trailing>
              <div
                class="text-xs text-muted tabular-nums"
                aria-live="polite"
                role="status"
              >
                {{ state.name?.length ?? 0 }}/200
              </div>
            </template>
          </UInput>
        </UFormField>
        <UFormField name="zh" :label="$t('pages.systemSettings.internalization.zh')">
          <UTextarea
            v-model="state.zh"
            :maxlength="500"
            :aria-describedby="$t('common.placeholder')"
            :placeholder="$t('common.placeholder')"
            class="w-full"
          >
            <template #trailing>
              <div
                class="text-xs text-muted tabular-nums"
                aria-live="polite"
                role="status"
              >
                {{ state.zh?.length ?? 0 }}/500
              </div>
            </template>
          </UTextarea>
        </UFormField>
        <UFormField name="en" :label="$t('pages.systemSettings.internalization.en')">
          <UTextarea
            v-model="state.en"
            :maxlength="500"
            :aria-describedby="$t('common.placeholder')"
            :placeholder="$t('common.placeholder')"
            class="w-full"
          >
            <template #trailing>
              <div
                class="text-xs text-muted tabular-nums"
                aria-live="polite"
                role="status"
              >
                {{ state.en?.length ?? 0 }}/500
              </div>
            </template>
          </UTextarea>
        </UFormField>
        <UFormField name="sort" :label="$t('common.sort')">
          <UInputNumber v-model="state.sort" :min="0" :max="999" class="w-full" />
        </UFormField>
      </UForm>
    </template>
    <template #footer="{ close }">
      <UButton :label="$t('common.cancel')" color="neutral" variant="outline" :disabled="loading" @click="close" />
      <UButton type="submit" :label="$t(`common.${loading ? 'inSave' : 'save'}`)" color="neutral" form="menu-form" :loading icon="lucide:save" />
    </template>
  </UModal>
</template>
