<script setup lang="ts">
const emit = defineEmits<{
  add: []
}>()

const { i18nCommon } = useMessage()
</script>

<template>
  <UButton
    icon="lucide:plus"
    color="neutral"
    variant="outline"
    :label="i18nCommon('add')"
    @click="emit('add')"
  />
</template>
