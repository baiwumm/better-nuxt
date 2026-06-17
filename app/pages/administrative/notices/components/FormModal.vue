<script setup lang="ts">
import type { EditorToolbarItem } from '@nuxt/ui'
import { pick } from 'es-toolkit'

const props = defineProps<{
  data: Notice | null
  loading: boolean
  formKey: number
}>()

const emit = defineEmits<{
  (e: 'submit', v: InsertNotice): void
}>()

const { i18nNotices, i18nCommon } = useMessage()
const { noticeFormSchema } = useSchema()

const modelValue = defineModel<boolean>({ required: true })

// 初始表单状态
const INITIAL_STATE = Object.freeze<NoticeFormSchema>({
  title: '',
  summary: '',
  type: NOTICE_TYPE.NOTICE,
  pinned: false,
  published: true,
  content: '',
})
const FORM_FIELDS = Object.keys(INITIAL_STATE) as (keyof NoticeFormSchema)[]

const initialState = computed<NoticeFormSchema>(() => ({
  ...INITIAL_STATE,
  ...(props.data
    ? pick(props.data, FORM_FIELDS)
    : {}),
}))

/** 提交 */
function onSubmit(data: NoticeFormSchema) {
  emit('submit', data)
}

const autoFormKey = computed(() => props.data?.id ? `edit-${props.data.id}` : props.formKey)

const typeItems = computed(() => NOTICE_TYPE.items.map(({ value, label, raw }) => ({ label: i18nNotices(label), value, icon: raw.icon })))

const items: EditorToolbarItem[][] = [
  // History controls
  [{
    kind: 'undo',
    icon: 'i-lucide-undo',
    tooltip: { text: 'Undo' },
  }, {
    kind: 'redo',
    icon: 'i-lucide-redo',
    tooltip: { text: 'Redo' },
  }],
  // Block types
  [{
    icon: 'i-lucide-heading',
    tooltip: { text: 'Headings' },
    content: {
      align: 'start',
    },
    items: [{
      kind: 'heading',
      level: 1,
      icon: 'i-lucide-heading-1',
      label: 'Heading 1',
    }, {
      kind: 'heading',
      level: 2,
      icon: 'i-lucide-heading-2',
      label: 'Heading 2',
    }, {
      kind: 'heading',
      level: 3,
      icon: 'i-lucide-heading-3',
      label: 'Heading 3',
    }, {
      kind: 'heading',
      level: 4,
      icon: 'i-lucide-heading-4',
      label: 'Heading 4',
    }],
  }, {
    icon: 'i-lucide-list',
    tooltip: { text: 'Lists' },
    content: {
      align: 'start',
    },
    items: [{
      kind: 'bulletList',
      icon: 'i-lucide-list',
      label: 'Bullet List',
    }, {
      kind: 'orderedList',
      icon: 'i-lucide-list-ordered',
      label: 'Ordered List',
    }],
  }, {
    kind: 'blockquote',
    icon: 'i-lucide-text-quote',
    tooltip: { text: 'Blockquote' },
  }, {
    kind: 'codeBlock',
    icon: 'i-lucide-square-code',
    tooltip: { text: 'Code Block' },
  }, {
    kind: 'horizontalRule',
    icon: 'i-lucide-separator-horizontal',
    tooltip: { text: 'Horizontal Rule' },
  }],
  // Text formatting
  [{
    kind: 'mark',
    mark: 'bold',
    icon: 'i-lucide-bold',
    tooltip: { text: 'Bold' },
  }, {
    kind: 'mark',
    mark: 'italic',
    icon: 'i-lucide-italic',
    tooltip: { text: 'Italic' },
  }, {
    kind: 'mark',
    mark: 'underline',
    icon: 'i-lucide-underline',
    tooltip: { text: 'Underline' },
  }, {
    kind: 'mark',
    mark: 'strike',
    icon: 'i-lucide-strikethrough',
    tooltip: { text: 'Strikethrough' },
  }, {
    kind: 'mark',
    mark: 'code',
    icon: 'i-lucide-code',
    tooltip: { text: 'Code' },
  }],
  // Link
  [{
    kind: 'link',
    icon: 'i-lucide-link',
    tooltip: { text: 'Link' },
  }],
  // Text alignment
  [{
    icon: 'i-lucide-align-justify',
    tooltip: { text: 'Text Align' },
    content: {
      align: 'end',
    },
    items: [{
      kind: 'textAlign',
      align: 'left',
      icon: 'i-lucide-align-left',
      label: 'Align Left',
    }, {
      kind: 'textAlign',
      align: 'center',
      icon: 'i-lucide-align-center',
      label: 'Align Center',
    }, {
      kind: 'textAlign',
      align: 'right',
      icon: 'i-lucide-align-right',
      label: 'Align Right',
    }, {
      kind: 'textAlign',
      align: 'justify',
      icon: 'i-lucide-align-justify',
      label: 'Align Justify',
    }],
  }],
]
</script>

<template>
  <AutoFormModal
    :key="autoFormKey"
    v-model:open="modelValue"
    :title="i18nNotices(data?.id ? 'edit' : 'add')"
    :schema="noticeFormSchema"
    :initial-state="initialState"
    :modal-props="{
      fullscreen: true,
    }"
    @submit="onSubmit"
  >
    <template #type="{ state: stateValue }">
      <USelectMenu
        v-model="stateValue.type"
        :placeholder="i18nCommon('select')"
        value-key="value"
        :items="typeItems"
        :ui="{
          trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
        }"
        class="w-full"
      />
    </template>
    <template #content="{ state: stateValue }">
      <UEditor
        v-slot="{ editor }"
        v-model="stateValue.content"
        content-type="markdown"
        :placeholder="`${i18nCommon('placeholder')}...`"
        :ui="{
          root: 'border border-default rounded-md',
          content: 'border-default w-full border-solid border-t min-h-50 py-4',
        }"
      >
        <UEditorToolbar
          :editor="editor"
          :items="items"
          layout="fixed"
          :ui="{
            base: 'p-2',
          }"
        />
      </UEditor>
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
