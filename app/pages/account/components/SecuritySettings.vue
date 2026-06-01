<script setup lang="ts">
const { i18nAccount } = useMessage()
</script>

<template>
  <UButton>{{ i18nAccount('securitySettings.title') }}</UButton>
</template>
