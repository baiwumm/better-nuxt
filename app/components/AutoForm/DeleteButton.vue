<script setup lang="ts">
defineProps<{
  disabled: boolean
  loading: boolean
}>()

const emit = defineEmits<{
  delete: []
}>()

const { i18nCommon } = useMessage()
</script>

<template>
  <UButton
    :label="i18nCommon('delete')"
    color="error"
    variant="soft"
    size="xs"
    icon="lucide:trash-2"
    :disabled
    :loading
    @click="emit('delete')"
  />
</template>
