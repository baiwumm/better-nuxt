<script setup lang="ts">
defineProps<{
  reset: VoidFunction
  loading: boolean
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
    @click="reset"
  />
</template>
