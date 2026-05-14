<script setup lang="ts">
defineProps<{
  placeholder?: string
  maxlength?: number
  icon?: string
}>()

const modelValue = defineModel({ default: '' })

const { i18nCommon } = useMessage()
</script>

<template>
  <UFieldGroup>
    <UInput
      v-model="modelValue"
      :maxlength="maxlength"
      :icon
      :placeholder="placeholder ?? i18nCommon('placeholder')"
      :ui="{
        root: 'flex-1',
        base: 'pe-6',
        trailing: 'pe-0',
      }"
    >
      <template v-if="modelValue?.length" #trailing>
        <UButton
          v-if="modelValue?.length"
          color="neutral"
          variant="link"
          size="sm"
          icon="i-lucide-circle-x"
          aria-label="Clear input"
          @click="modelValue = ''"
        />
      </template>
    </UInput>
    <UBadge v-if="maxlength" color="neutral" variant="soft" size="lg">
      <div
        class="text-xs text-muted tabular-nums text-right"
        aria-live="polite"
        role="status"
      >
        {{ modelValue?.length ?? 0 }}/{{ maxlength }}
      </div>
    </UBadge>
  </UFieldGroup>
</template>
