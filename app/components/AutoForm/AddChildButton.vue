<script setup lang="ts">
defineProps<{
  disabled: boolean
}>()

const emit = defineEmits<{
  addChild: []
}>()

const { i18nCommon } = useMessage()
</script>

<template>
  <UButton
    :label="i18nCommon('addChild')"
    color="neutral"
    variant="outline"
    size="xs"
    icon="lucide:plus"
    :disabled
    @click="emit('addChild')"
  />
</template>
