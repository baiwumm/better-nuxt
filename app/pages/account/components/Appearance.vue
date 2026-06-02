<script setup lang="ts">
import { COLOR_MODES } from '@/enums'

const colorMode = useColorMode()
</script>

<template>
  <URadioGroup
    v-model="colorMode.preference as typeof COLOR_MODES.valueType"
    :legend="$t('components.themePicker.colorMode')"
    orientation="horizontal"
    variant="card"
    :items="COLOR_MODES.items"
    indicator="end"
    :ui="{
      item: 'relative has-data-[state=checked]:bg-primary/15',
      legend: 'text-base font-semibold text-highlighted mb-4',
      fieldset: 'grid grid-cols-3 gap-3',
      container: 'absolute top-3.5 right-3.5',
      wrapper: 'me-0',
      label: 'flex gap-2 items-center',
      description: 'mt-2',
    }"
  >
    <template #label="{ item }">
      <UIcon :name="item.raw.icon" class="size-4" />
      <span>{{ item.label }}</span>
    </template>
    <template #description="{ item }">
      <component :is="item.raw.component" />
    </template>
  </URadioGroup>
</template>
