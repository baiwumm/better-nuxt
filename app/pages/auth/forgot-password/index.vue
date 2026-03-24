<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import z from 'zod'
import EmailInput from '../components/EmailInput.vue'
import LoginProvides from '../components/LoginProvides.vue'
import SubmitButton from '../components/SubmitButton.vue'

definePageMeta({
  layout: 'auth',
})

const { $authClient } = useNuxtApp()

const toast = useToast()

const loading = ref(false)

const schema = z.object({
  email: z.email($t('auth.email.error')),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: '',
})

/**
 * @description: 表单提交
 * @param {*} payload
 */
async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const formData = payload.data
  loading.value = true
  try {
    await $authClient.requestPasswordReset({
      ...formData,
      redirectTo: '/auth/reset-password',
    })
    toast.add({
      title: $t('auth.forgotPassword.success'),
      color: 'success',
    })
    Object.assign(state, { email: '' })
  }
  catch (err) {
    toast.add({
      title: catchError(err),
      color: 'error',
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <ClientOnly>
      <UPageCard
        :title="$t('auth.forgotPassword.title')"
        :description="$t('auth.forgotPassword.description')"
        class="w-full sm:w-md"
        :ui="{
          title: 'text-xl',
          description: 'text-sm',
        }"
      >
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <EmailInput v-model="state.email" />
          <SubmitButton :text="$t('auth.forgotPassword.submit')" :loading="loading" />
        </UForm>
        <USeparator label="or" />
        <LoginProvides />
      </UPageCard>
    </ClientOnly>
  </div>
</template>
