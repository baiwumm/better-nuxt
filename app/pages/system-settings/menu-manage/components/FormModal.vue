<script setup lang="ts">
import type { FormSubmitEvent, SelectMenuItem } from '@nuxt/ui'
import { cloneDeep } from 'es-toolkit'
import z from 'zod'
import { MENU_TARGET } from '@/enums'

const props = defineProps<{
  data: System.Menu | null
  menuTree: System.MenuTree[]
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', v: System.InsertMenu): void
}>()

const modelValue = defineModel<boolean>({ required: true })

const formSchema = z.object({
  parentId: z.string().nullable().optional(),
  label: z.string($t('common.placeholder')).min(1, $t('common.required')),
  icon: z.string($t('common.placeholder')).min(1, $t('common.required')),
  to: z.string($t('common.placeholder')).min(1, $t('common.required')).regex(/^(\/|https?:\/\/)/, $t('pages.systemSettings.menuManage.toReg')),
  badge: z.string().optional(),
  enabled: z.boolean().default(true),
  defaultOpen: z.boolean().default(false),
  target: z.enum(['_self', '_blank']).default('_self'),
  sort: z.number().default(0),
})
type FormSchema = z.output<typeof formSchema>

// 初始表单状态
const INITIAL_STATE: FormSchema = {
  parentId: undefined,
  label: '',
  icon: '',
  to: '',
  badge: undefined,
  enabled: true,
  defaultOpen: false,
  target: '_self',
  sort: 0,
}

/** 表单 */
const state = reactive<Partial<FormSchema>>(cloneDeep(INITIAL_STATE))

/** 重置函数 */
function resetState(newData?: Partial<FormSchema> | null) {
  const target = newData ?? cloneDeep(INITIAL_STATE)
  Object.assign(state, cloneDeep(target))
}

/** 回填数据 */
watch(
  () => props.data,
  (val) => {
    if (val && Object.keys(val).length > 0) {
      resetState({ ...val, parentId: val.parentId ? String(val.parentId) : undefined, badge: val.badge ?? undefined })
    }
    else {
      resetState()
    }
  },
  { immediate: true },
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
    parentId: values.parentId ? Number(values.parentId) : null,
  })
}

// 递归查找树形结构中的节点
function findNodeInTree(tree: System.MenuTree[], id: FormSchema['parentId']): System.MenuTree | null {
  for (const node of tree) {
    if (String(node.id) === id) {
      return node
    }
    if (node.children && node.children.length) {
      const found = findNodeInTree(node.children, id)
      if (found)
        return found
    }
  }
  return null
}

const parentIcon = computed(() => {
  const node = findNodeInTree(props.menuTree, state.parentId)
  return node?.icon
})

function flattenMenuTree(tree: System.MenuTree[], level = 0, result: SelectMenuItem[] = []) {
  tree.forEach((node) => {
    const prefix = '　'.repeat(level) + (level > 0 ? '└ ' : '')
    result.push({
      id: String(node.id),
      label: prefix + $t(node.label),
      icon: node.icon,
    })

    if (node.children && node.children.length) {
      flattenMenuTree(node.children, level + 1, result)
    }
  })
  return result
}
</script>

<template>
  <UModal
    v-model:open="modelValue"
    :title="$t(`pages.systemSettings.menuManage.${data?.id ? 'edit' : 'add'}`)"
    :dismissible="false"
    :ui="{ footer: 'justify-end' }"
  >
    <template #body>
      <UForm id="menu-form" :schema="formSchema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField name="parentId" :label="$t('pages.systemSettings.menuManage.parentId')">
          <USelectMenu
            v-model="state.parentId"
            value-key="id"
            :items="flattenMenuTree(menuTree)"
            :placeholder="$t('common.select')"
            :icon="parentIcon"
            clear
            class="w-full"
            :ui="{
              trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
            }"
          />
        </UFormField>
        <UFormField name="label" :label="$t('pages.systemSettings.menuManage.label')" :help="$t('pages.systemSettings.menuManage.labelHlep')" required>
          <UInput
            v-model="state.label"
            :maxlength="200"
            :aria-describedby="$t('common.placeholder')"
            :placeholder="$t('common.placeholder')"
            class="w-full"
          >
            <template #trailing>
              <div
                id="character-count"
                class="text-xs text-muted tabular-nums"
                aria-live="polite"
                role="status"
              >
                {{ state.label?.length ?? 0 }}/200
              </div>
            </template>
          </UInput>
        </UFormField>
        <UFormField name="icon" :label="$t('common.icon')" required>
          <UInput
            v-model="state.icon"
            :maxlength="50"
            :aria-describedby="$t('common.placeholder')"
            :placeholder="$t('common.placeholder')"
            class="w-full"
          >
            <template #trailing>
              <UIcon :name="state.icon" />
            </template>
          </UInput>
        </UFormField>
        <UFormField name="to" :label="$t('pages.systemSettings.menuManage.to')" required>
          <UInput
            v-model="state.to"
            :maxlength="200"
            :aria-describedby="$t('common.placeholder')"
            :placeholder="$t('common.placeholder')"
            class="w-full"
          >
            <template #trailing>
              <div
                id="character-count"
                class="text-xs text-muted tabular-nums"
                aria-live="polite"
                role="status"
              >
                {{ state.to?.length ?? 0 }}/200
              </div>
            </template>
          </UInput>
        </UFormField>
        <UFormField name="badge" :label="$t('pages.systemSettings.menuManage.badge')">
          <UInput
            v-model="state.badge"
            :maxlength="10"
            :aria-describedby="$t('common.placeholder')"
            :placeholder="$t('common.placeholder')"
            class="w-full"
          >
            <template #trailing>
              <div
                id="character-count"
                class="text-xs text-muted tabular-nums"
                aria-live="polite"
                role="status"
              >
                {{ state.badge?.length ?? 0 }}/10
              </div>
            </template>
          </UInput>
        </UFormField>

        <div class="grid grid-cols-2 gap-3">
          <UFormField name="enabled">
            <USwitch v-model="state.enabled" :label="$t('pages.systemSettings.menuManage.enabled')" />
          </UFormField>

          <UFormField name="defaultOpen">
            <USwitch v-model="state.defaultOpen" :label="$t('pages.systemSettings.menuManage.defaultOpen')" />
          </UFormField>
        </div>

        <UFormField name="target" :label="$t('pages.systemSettings.menuManage.target.title')">
          <USelect
            v-model="state.target"
            :items="MENU_TARGET.items.map(({ value, label }) => ({ label: $t(label), value }))"
            class="w-full"
          />
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
