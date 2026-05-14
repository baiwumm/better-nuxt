<script setup lang="ts">
const open = defineModel<boolean>({ required: true })

const { i18nCommon } = useMessage()
</script>

<template>
  <UButton
    icon="lucide:plus"
    color="neutral"
    variant="outline"
    :label="i18nCommon('add')"
    @click="open = true"
  />
</template>
