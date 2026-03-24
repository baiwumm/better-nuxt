<template>
  <NuxtLink to="/auth/magic-link">
    <UButton
      type="submit"
      icon="ri:mail-line"
      color="neutral"
      variant="soft"
      class="w-full justify-center"
    >
      {{ $t('auth.magicLink.submit') }}
    </UButton>
  </NuxtLink>
</template>
