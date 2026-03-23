<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <UFormField :label="$t('auth.email.label')" name="email" required>
    <UInput v-model="model" :placeholder="$t('auth.email.placeholder')" class="w-full" />
  </UFormField>
</template>
