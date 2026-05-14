<script setup lang="ts">
defineProps<{
  disabled: boolean
}>()

const emit = defineEmits<{
  edit: []
}>()

const { i18nCommon } = useMessage()
</script>

<template>
  <UButton
    :label="i18nCommon('edit')"
    color="neutral"
    variant="outline"
    size="xs"
    icon="lucide:pencil-line"
    :disabled
    @click="emit('edit')"
  />
</template>
