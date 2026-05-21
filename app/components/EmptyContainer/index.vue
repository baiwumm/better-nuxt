<script setup lang="ts">
const { i18nCommon } = useMessage()
const attrs = useAttrs()
</script>

<template>
  <UEmpty
    icon="lucide:inbox"
    :title="i18nCommon('noData')"
    v-bind="attrs"
  />
</template>
