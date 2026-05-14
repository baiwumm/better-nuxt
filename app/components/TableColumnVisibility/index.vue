<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { camelCase } from 'es-toolkit'
import { keys } from 'es-toolkit/compat'

const props = defineProps<{
  table: Table<any>
}>()

const pathReg = /^\//

const route = useRoute()
const { locale, messages } = useI18n()
const commonKeys = keys(messages.value[locale.value].common)
const { i18nCommon } = useMessage()

const columnTitle = computed(() =>
  route.path
    .replace(pathReg, '')
    .split('/')
    .map(camelCase)
    .join('.'),
)

const items = computed(() =>
  props.table.getAllColumns()
    .filter(column => column.getCanHide())
    .map(column => ({
      label: commonKeys.includes(column.id) ? i18nCommon(column.id) : $t(`pages.${columnTitle.value}.${column.id}`),
      type: 'checkbox' as const,
      checked: column.getIsVisible(),
      onUpdateChecked(checked: boolean) {
        props.table.getColumn(column.id)?.toggleVisibility(!!checked)
      },
      onSelect(e: Event) {
        e.preventDefault()
      },
    })),
)
</script>

<template>
  <UDropdownMenu :items="items" :content="{ align: 'end' }">
    <UButton
      :label="i18nCommon('columnVisibility')"
      color="neutral"
      variant="outline"
      trailing-icon="lucide:settings-2"
    />
  </UDropdownMenu>
</template>
