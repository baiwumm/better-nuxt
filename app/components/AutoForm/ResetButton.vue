<script setup lang="ts">
defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  reset: []
}>()

const { i18nCommon } = useMessage()
</script>

<template>
  <UButton
    icon="lucide:rotate-ccw"
    color="neutral"
    variant="soft"
    :label="i18nCommon('reset')"
    :disabled="loading"
    @click="emit('reset')"
  />
</template>
