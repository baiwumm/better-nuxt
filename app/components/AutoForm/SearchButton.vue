<script setup lang="ts">
defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  refresh: []
}>()

const { i18nCommon } = useMessage()
</script>

<template>
  <UButton
    icon="lucide:search"
    :loading
    :label="i18nCommon('search')"
    @click="emit('refresh')"
  />
</template>
