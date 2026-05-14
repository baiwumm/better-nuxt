<script setup lang="ts">
defineProps<{
  maxlength?: number
}>()

const modelValue = defineModel({ default: '' })

const { i18nCommon } = useMessage()
</script>

<template>
  <div class="flex flex-col gap-1">
    <UTextarea
      v-model="modelValue"
      :maxlength="maxlength"
      :placeholder="i18nCommon('placeholder')"
      :ui="{ trailing: 'ps-1' }"
    >
      <template v-if="modelValue?.length || maxlength" #trailing>
        <div class="flex flex-col items-center">
          <UButton
            v-if="modelValue?.length"
            color="neutral"
            variant="link"
            size="sm"
            icon="i-lucide-circle-x"
            aria-label="Clear input"
            @click="modelValue = ''"
          />
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
    </UTextarea>
  </div>
</template>
