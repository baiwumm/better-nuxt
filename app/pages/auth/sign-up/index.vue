<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import z from 'zod'
import EmailInput from '../components/EmailInput.vue'
import FooterLink from '../components/FooterLink.vue'
import LoginProvides from '../components/LoginProvides.vue'
import MagicLinkButton from '../components/MagicLinkButton.vue'
import PasswordInput from '../components/PasswordInput.vue'
import SubmitButton from '../components/SubmitButton.vue'

definePageMeta({
  layout: 'auth',
})

const toast = useToast()
const { $authClient } = useNuxtApp()

const loading = ref(false)
const formRef = useTemplateRef('formRef')

const schema = z.object({
  name: z.string().min(1, $t('auth.name.placeholder')),
  email: z.email($t('auth.email.error')),
  password: z.string($t('auth.password.label')).min(8, $t('auth.password.error')),
})

type Schema = z.output<typeof schema>

const initialState: Schema = {
  name: '',
  email: '',
  password: '',
}

const state = reactive<Schema>({ ...initialState })

/**
   * @description: 清空表单
   */
function resetForm() {
  formRef.value?.clear()
  Object.assign(state, initialState)
}

/**
 * @description: 注册提交
 * @param {*} payload
 */
async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const formData = payload.data
  loading.value = true
  const { error } = await $authClient.signUp.email({
    ...formData,
    callbackURL: '/dashboard',
  }).finally(() => {
    loading.value = false
  })
  if (error) {
    toast.add({
      title: $t('auth.signUp.error'),
      description: error.message || '',
      color: 'error',
    })
  }
  else {
    toast.add({
      title: $t('auth.signUp.verifyEmailSent'),
      description: $t('auth.signUp.verifyEmailSentDesc'),
      color: 'success',
    })
    resetForm()
  }
}
</script>

<template>
  <div>
    <ClientOnly>
      <UPageCard
        :title="$t('auth.signUp.title')"
        :description="$t('auth.signUp.description')"
        class="w-full sm:w-md"
        :ui="{
          title: 'text-xl',
          description: 'text-sm',
        }"
      >
        <UForm ref="formRef" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField :label="$t('auth.name.label')" name="name" required>
            <UInput v-model="state.name" :placeholder="$t('auth.name.placeholder')" class="w-full" />
          </UFormField>
          <EmailInput v-model="state.email" />
          <PasswordInput v-model="state.password" />
          <SubmitButton :text="$t('auth.signUp.submit')" :loading="loading" />
          <MagicLinkButton />
        </UForm>
        <USeparator label="or" />
        <LoginProvides />
        <FooterLink :left-text="$t('auth.signUp.footer')" :right-text="$t('auth.signUp.footerLink')" to="/auth/login" />
      </UPageCard>
    </ClientOnly>
  </div>
</template>
