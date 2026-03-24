<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import z from 'zod'
import LoginProvides from '../components/LoginProvides.vue'
import SubmitButton from '../components/SubmitButton.vue'

definePageMeta({
  layout: 'auth',
  middleware: 'reset-password',
})

const { $authClient } = useNuxtApp()

const toast = useToast()
const token = ref('')
const loading = ref(false)
const show = ref(false)

const schema = z.object({
  newPassword: z.string($t('auth.password.label')).min(8, $t('auth.password.error')),
})

type Schema = z.output<typeof schema>

const state = reactive({
  newPassword: '',
})

/**
 * @description: 表单提交
 * @param {*} payload
 */
async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const formData = payload.data
  loading.value = true
  const { error } = await $authClient.resetPassword({
    ...formData,
    token: token.value,
  }).finally(() => {
    loading.value = false
  })
  if (error) {
    toast.add({
      title: error.message,
      color: 'error',
    })
  }
  else {
    toast.add({
      title: $t('auth.resetPassword.success'),
      color: 'success',
    })
    Object.assign(state, { newPassword: '' })
    navigateTo('/auth/sign-in')
  }
}
</script>

<template>
  <div>
    <ClientOnly>
      <UPageCard
        :title="$t('auth.resetPassword.title')"
        :description="$t('auth.resetPassword.description')"
        class="w-full sm:w-md"
        :ui="{
          title: 'text-xl',
          description: 'text-sm',
        }"
      >
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField :label="$t('auth.newPassword.label')" name="newPassword" required>
            <UInput v-model="state.newPassword" :type="show ? 'text' : 'password'" :placeholder="$t('auth.newPassword.placeholder')" class="w-full">
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="show ? 'Hide password' : 'Show password'"
                  :aria-pressed="show"
                  @click="show = !show"
                />
              </template>
            </UInput>
          </UFormField>
          <SubmitButton :text="$t('auth.resetPassword.submit')" :loading="loading" />
        </UForm>
        <USeparator label="or" />
        <LoginProvides />
      </UPageCard>
    </ClientOnly>
  </div>
</template>
