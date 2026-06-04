<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import z from 'zod'

const { i18nAccount, i18nCommon } = useMessage()
const { user } = useCurrentUser()
const { t } = useI18n()
const { mutate: changeEmail, isPending } = useChangeEmail()

const schema = z.object({
  newEmail: z.email(t('auth.email.error')).nonempty({ error: i18nCommon('required') }),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  newEmail: '',
})

// 监听 user 变化，更新 state
watch(user, (newUser) => {
  if (newUser) {
    state.newEmail = newUser.email ?? ''
  }
}, { immediate: true })

async function onSubmit(event: FormSubmitEvent<Schema>) {
  changeEmail({
    newEmail: event.data.newEmail,
    callbackURL: '/',
  })
}
</script>

<template>
  <UForm
    id="ChangeEmail"
    :schema
    :state
    @submit="onSubmit"
  >
    <UPageCard
      :title="i18nAccount('accountSettings.changeEmail.title')"
      :description="i18nAccount('accountSettings.changeEmail.description')"
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <UButton
        form="ChangeEmail"
        :label="i18nAccount('accountSettings.changeEmail.submit')"
        type="submit"
        icon="lucide:mail"
        :loading="isPending"
        :disabled="!user || state.newEmail === user?.email"
        class="w-fit lg:ms-auto"
      />
    </UPageCard>
    <UPageCard variant="soft">
      <UFormField
        name="newEmail"
        :label="i18nAccount('accountSettings.changeEmail.email')"
        :description="i18nAccount('accountSettings.changeEmail.emailDescription')"
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput
          v-model="state.newEmail"
          :placeholder="i18nCommon('placeholder')"
          autocomplete="off"
        />
      </UFormField>
    </UPageCard>
  </UForm>
</template>
