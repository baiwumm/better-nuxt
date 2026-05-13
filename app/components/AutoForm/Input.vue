<script setup lang="ts">
defineProps<{
  maxlength?: number
}>()

const modelValue = defineModel({ default: '' })

const { i18nCommon } = useMessage()
</script>

<template>
  <div class="flex flex-col gap-1">
    <UInput
      v-model="modelValue"
      :maxlength="maxlength"
      :placeholder="i18nCommon('placeholder')"
      :ui="{ trailing: 'pe-1' }"
    >
      <template v-if="modelValue?.length" #trailing>
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          icon="i-lucide-circle-x"
          aria-label="Clear input"
          @click="modelValue = ''"
        />
      </template>
    </UInput>
    <div
      v-if="maxlength"
      class="text-xs text-muted tabular-nums text-right"
      aria-live="polite"
      role="status"
    >
      {{ modelValue?.length ?? 0 }}/{{ maxlength }}
    </div>
  </div>
</template>
