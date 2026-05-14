<script setup lang="ts">
const { i18nAuth } = useMessage()
</script>

<template>
  <NuxtLink to="/auth/magic-link">
    <UButton
      type="submit"
      icon="ri:mail-line"
      color="neutral"
      variant="soft"
      class="w-full justify-center"
    >
      {{ i18nAuth('magicLink.submit') }}
    </UButton>
  </NuxtLink>
</template>
