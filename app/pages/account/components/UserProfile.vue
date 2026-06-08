<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import z from 'zod'
import AvatarCropper from './AvatarCropper.vue'

const { i18nAccount, i18nCommon } = useMessage()
const { user, userName } = useCurrentUser()
const { errorToast } = useAppToast()

const upload = useUpload('/api/account/avatar')

const avatarFile = ref<File | null>(null)
const avatarPreview = ref<string>()
const loading = ref(false)
const { mutate: updateUser, isPending } = useUpdateUser({
  onSuccess: async () => {
    avatarFile.value = null
    await refreshNuxtData()
  },
})

const schema = z.object({
  name: z.string().nonempty({
    error: i18nCommon('required'),
  }),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '',
})

watch(
  user,
  (newUser) => {
    if (!newUser)
      return

    state.name = newUser.name ?? ''
    avatarFile.value = null

    // 设置初始头像
    avatarPreview.value = newUser.image ?? undefined
  },
  {
    immediate: true,
  },
)

watch(
  avatarFile,
  (file) => {
    if (avatarPreview.value?.startsWith('blob:')) {
      URL.revokeObjectURL(avatarPreview.value)
    }

    avatarPreview.value = file
      ? URL.createObjectURL(file)
      : (user.value?.image ?? undefined)
  },
  {
    immediate: true,
  },
)

const hasChanged = computed(() => {
  if (!user.value)
    return false

  return (
    state.name !== user.value.name
    || avatarFile.value !== null
  )
})

function resetAvatar() {
  avatarFile.value = null
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true
    let imageUrl = null

    if (avatarFile.value) {
      const uploadResult = await upload(avatarFile.value)

      if (!uploadResult) {
        return errorToast({ title: i18nCommon('updateFailed') })
      }

      imageUrl = uploadResult.url ?? null
    }

    await updateUser({
      name: event.data.name,
      image: imageUrl ?? undefined,
    })
  }
  catch (error) {
    errorToast({ title: catchError(error) })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <UForm id="UserProfile" :schema="schema" :state="state" @submit="onSubmit">
    <UPageCard
      :title="i18nAccount('accountSettings.userProfile.title')"
      :description="i18nAccount('accountSettings.userProfile.description')"
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <UButton
        form="UserProfile"
        type="submit"
        icon="lucide:save"
        :label="i18nCommon('saveChanges')"
        :loading="isPending"
        :disabled="!hasChanged"
        class="w-fit lg:ms-auto"
      />
    </UPageCard>

    <UPageCard variant="soft">
      <UFormField
        name="name"
        :label="i18nAccount('accountSettings.userProfile.name')"
        :description="i18nAccount('accountSettings.userProfile.nameDescription')"
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput v-model="state.name" autocomplete="off" :placeholder="i18nCommon('placeholder')" />
      </UFormField>

      <USeparator />

      <UFormField
        :label="i18nAccount('accountSettings.userProfile.image')"
        :description="
          $t(
            'pages.account.accountSettings.userProfile.imageDescription',
            { size: 1 },
          )
        "
        class="flex max-sm:flex-col justify-between sm:items-center gap-4"
      >
        <div class="flex flex-wrap items-center gap-3">
          <AvatarCropper v-model:file="avatarFile">
            <template #trigger="{ selectFile }">
              <div class="relative w-fit">
                <div class="group relative cursor-pointer" @click="selectFile">
                  <UAvatar :src="avatarPreview" :alt="userName" size="3xl" />
                  <div class=" absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition group-hover:opacity-100">
                    <UIcon name="lucide:camera" class="size-5 text-white" />
                  </div>
                </div>
                <!-- 右上角删除 X -->
                <UButton
                  v-if="avatarFile"
                  icon="lucide:x"
                  color="error"
                  variant="outline"
                  size="xs"
                  :ui="{
                    base: 'absolute -top-1 -right-1 rounded-full cursor-pointer',
                    leadingIcon: 'size-3',
                  }"
                  @click.stop="resetAvatar"
                />
              </div>
            </template>
          </AvatarCropper>
        </div>
      </UFormField>
    </UPageCard>
  </UForm>
</template>
