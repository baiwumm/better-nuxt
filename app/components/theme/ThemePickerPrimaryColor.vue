<script setup lang="ts">
import { sample, without } from 'es-toolkit/array'

const appStore = useAppStore()

const { primaryColor, blackAsPrimary } = storeToRefs(appStore)
const { setPrimaryColor, setBlackAsPrimary } = appStore

const colors = computed(getPrimaryColors)

// 选择主题回调
function handleColorChange(color: string) {
  setPrimaryColor(color)
  setBlackAsPrimary(false)
}

// 随机主题
function handleShuffleColor() {
  setPrimaryColor(sample(without(colors.value, primaryColor.value)))
  setBlackAsPrimary(false)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-1">
      <div class="font-bold text-muted text-xs">
        {{ $t('components.themePicker.primaryColor') }}
      </div>
      <UButton icon="lucide:shuffle" size="sm" variant="ghost" color="neutral" class="rounded-full" :ui="{ leadingIcon: 'size-3' }" @click="handleShuffleColor" />
    </div>
    <div class="grid grid-cols-3 gap-1.5">
      <UButton color="neutral" size="sm" :variant="blackAsPrimary ? 'subtle' : 'outline'" class="capitalize ring-default rounded-sm text-xs" label="black" @click="setBlackAsPrimary(true)">
        <template #leading>
          <span class="inline-block size-2 rounded-full bg-black dark:bg-white" />
        </template>
      </UButton>
      <UButton v-for="color in colors" :key="color" color="neutral" size="sm" :variant="!blackAsPrimary && primaryColor === color ? 'subtle' : 'outline'" class="capitalize ring-default rounded-sm text-xs" :label="color" @click="handleColorChange(color)">
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
