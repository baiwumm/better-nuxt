<script setup lang="ts">
import SetPassword from './SetPassword.vue'

const { i18nAccount } = useMessage()

const { changePasswordFormSchema } = useSchema()

const { data: accounts, pending } = useListAccounts()

const { errorToast } = useAppToast()

const resetKey = ref(0)

const { mutate: changePassword, isPending } = useChangePassword({
  onSuccess: () => resetKey.value++,
})

const hasCredentialAccount = computed(() => accounts.value?.some(
  account => account.providerId === 'credential',
))

/**
 * @description: 表单提交
 */
async function onSubmit({ currentPassword, newPassword, confirmPassword }: ChangePasswordFormSchema) {
  if (newPassword !== confirmPassword) {
    return errorToast({ title: $t('auth.passwordsDoNotMatch') })
  }
  await changePassword({
    currentPassword,
    newPassword,
    revokeOtherSessions: true,
  })
}
</script>

<template>
  <div class="space-y-4">
    <UPageCard
      :title="i18nAccount('securitySettings.changePassword.title')"
      :description="i18nAccount('securitySettings.changePassword.description')"
      variant="naked"
    />
    <UCard v-if="pending">
      <div class="grid gap-2">
        <USkeleton class="h-4 w-60" />
        <USkeleton class="h-4 w-50" />
      </div>
    </UCard>
    <SetPassword v-if="!pending && !hasCredentialAccount" />
    <UCard v-if="!pending && hasCredentialAccount">
      <AutoForm
        :key="resetKey"
        :schema="changePasswordFormSchema"
        :config="{
          submit: {
            props: {
              label: i18nAccount('securitySettings.changePassword.submit'),
              icon: 'ri:check-fill',
              loading: isPending,
              class: 'w-full justify-center',
            },
          },
        }"
        @submit="onSubmit"
      />
    </UCard>
  </div>
</template>
