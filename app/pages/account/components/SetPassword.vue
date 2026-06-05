<script setup lang="ts">
const { i18nAccount } = useMessage()

const { mutate: requestPasswordReset, isPending } = useRequestPasswordReset()

const { email } = useCurrentUser()

function onSubmit() {
  if (!email.value) {
    return
  }
  requestPasswordReset({ email: email.value, redirectTo: '/auth/reset-password' })
}
</script>

<template>
  <UPageCard
    :title="i18nAccount('securitySettings.changePassword.setPassword.title')"
    :description="i18nAccount('securitySettings.changePassword.setPassword.description')"
    orientation="horizontal"
    :ui="{
      container: 'grid-cols-[1fr_auto]!',
    }"
  >
    <UButton
      :label="i18nAccount('securitySettings.changePassword.setPassword.submit')"
      icon="lucide:mail"
      :disabled="!email"
      :loading="isPending"
      @click="onSubmit"
    />
  </UPageCard>
</template>
