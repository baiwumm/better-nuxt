<script setup lang="ts">
defineProps<{
  refresh: VoidFunction
  loading: boolean
}>()

const { i18nCommon } = useMessage()
</script>

<template>
  <UButton
    icon="lucide:search"
    :loading
    :label="i18nCommon('search')"
    @click="refresh"
  />
</template>
