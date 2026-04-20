<script setup lang="ts">
import { getColor, getPrimaryColors } from '@/utils/constants'

const appStore = useAppStore()

const { primaryColor, blackAsPrimary } = storeToRefs(appStore)
const { setPrimaryColor, setBlackAsPrimary } = appStore

// 选择主题回调
function handleColorChange(color: string) {
  setPrimaryColor(color)
  setBlackAsPrimary(false)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="font-bold text-muted text-xs">
      {{ $t('components.themePicker.primaryColor') }}
    </div>
    <div class="grid grid-cols-3 gap-1.5">
      <UButton color="neutral" size="sm" :variant="blackAsPrimary ? 'subtle' : 'outline'" class="capitalize ring-default rounded-sm text-xs" label="black" @click="setBlackAsPrimary(true)">
        <template #leading>
          <span class="inline-block size-2 rounded-full bg-black dark:bg-white" />
        </template>
      </UButton>
      <UButton v-for="color in getPrimaryColors()" :key="color" color="neutral" size="sm" :variant="!blackAsPrimary && primaryColor === color ? 'subtle' : 'outline'" class="capitalize ring-default rounded-sm text-xs" :label="color" @click="handleColorChange(color)">
        <template #leading>
          <span
            class="inline-block size-2 rounded-full"
            :style="{
              backgroundColor: getColor(color, 500),
            }"
          />
        </template>
      </UButton>
    </div>
  </div>
</template>
