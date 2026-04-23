<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  data?: Partial<System.UpdateMenu> | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'submit', v: System.UpdateMenu): void
}>()

const modelValue = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
})

const isEdit = computed(() => !!props.data?.id)

/** 表单 */
const form = reactive<System.InsertMenu>({
  label: '',
  icon: '',
  to: '/',
  badge: null,
  parentId: null,
  sort: 0,
  enabled: true,
  defaultOpen: false,
  target: '_self',
})

/** 回填数据 */
watch(
  () => props.data,
  (val) => {
    if (val) {
      Object.assign(form, val)
    }
    else {
      reset()
    }
  },
  { immediate: true },
)

/** 重置 */
function reset() {
  form.label = ''
  form.icon = ''
  form.to = '/'
  form.badge = null
  form.parentId = null
  form.sort = 0
  form.enabled = true
  form.defaultOpen = false
  form.target = '_self'
}

/** 关闭 */
function close() {
  modelValue.value = false
}

/** 提交 */
function onSubmit() {
  emit('submit', { ...form })
  close()
}
</script>

<template>
  <UModal v-model:open="modelValue">
    <template #content>
      <UCard class="w-130">
        <!-- header -->
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold">
              {{ isEdit ? '编辑菜单' : '新增菜单' }}
            </h3>

            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              @click="close"
            />
          </div>
        </template>

        <!-- form -->
        <UForm :state="form" class="space-y-4" @submit="onSubmit">
          <UFormField label="名称（label）" required>
            <UInput v-model="form.label" placeholder="pages.title" />
          </UFormField>

          <UFormField label="图标（icon）" required>
            <UInput v-model="form.icon" placeholder="lucide:monitor" />
          </UFormField>

          <UFormField label="路由（to）" required>
            <UInput v-model="form.to" placeholder="/" />
          </UFormField>

          <UFormField label="Badge">
            <UInput v-model="form.badge" placeholder="New" />
          </UFormField>

          <div class="grid grid-cols-2 gap-3">
            <UFormField label="父级ID">
              <UInput v-model.number="form.parentId" type="number" />
            </UFormField>

            <UFormField label="排序">
              <UInput v-model.number="form.sort" type="number" />
            </UFormField>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <UFormField label="启用">
              <USwitch v-model="form.enabled" />
            </UFormField>

            <UFormField label="默认展开">
              <USwitch v-model="form.defaultOpen" />
            </UFormField>
          </div>

          <UFormField label="打开方式">
            <USelect
              v-model="form.target"
              :items="[
                { label: '当前窗口', value: '_self' },
                { label: '新窗口', value: '_blank' },
              ]"
            />
          </UFormField>

          <!-- footer -->
          <div class="flex justify-end gap-2 pt-2">
            <UButton color="neutral" variant="soft" @click="close">
              取消
            </UButton>

            <UButton type="submit" color="primary">
              {{ isEdit ? '更新' : '创建' }}
            </UButton>
          </div>
        </UForm>
      </UCard>
    </template>
  </UModal>
</template>
