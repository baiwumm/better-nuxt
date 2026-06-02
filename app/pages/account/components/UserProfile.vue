<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import z from 'zod'

const { $authClient } = useNuxtApp()
const { i18nAccount, i18nCommon, i18nPermissions } = useMessage()
const { user, userName } = useCurrentUser()
const { errorToast, successToast } = useAppToast()
const upload = useUpload('/api/account/avatar')

// 头像大小
const FILE_SIZE = 1

const fileRef = useTemplateRef('fileRef')
const avatarFile = ref<File | null>(null) // 选择的头像文件
const loading = ref(false)

const schema = z.object({
  name: z.string().nonempty({ error: i18nCommon('required') }),
  image: z.string().nullable(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '',
  image: null,
})

// 上传文件
function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement

  if (!input.files?.length) {
    return
  }

  const file = input.files[0]

  if (!file) {
    return
  }

  // 验证文件
  const isValidType = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)
  const isValidSize = file.size <= FILE_SIZE * 1024 * 1024 // 1MB

  if (!isValidType) {
    return errorToast(i18nAccount('accountSettings.userProfile.validAvatarType'))
  }

  if (!isValidSize) {
    return errorToast($t('pages.account.accountSettings.userProfile.validAvatarSize', { size: FILE_SIZE }))
  }

  // 保存选中的文件
  avatarFile.value = file

  // 仅用于本地预览
  if (state.image) {
    URL.revokeObjectURL(state.image)
  }
  state.image = URL.createObjectURL(file)
}

function onFileClick() {
  fileRef.value?.click()
}

// 恢复头像
function resetAvatar() {
  if (avatarFile.value) {
    // 清空选中的文件
    avatarFile.value = null

    // 恢复到原始头像
    if (state.image && state.image.startsWith('blob:')) {
      URL.revokeObjectURL(state.image)
    }
    state.image = user.value?.image ?? null

    // 清空文件输入框
    if (fileRef.value) {
      fileRef.value.value = ''
    }
  }
}

// 监听 user 变化，更新 state
watch(user, (newUser) => {
  if (newUser) {
    state.name = newUser.name ?? ''
    state.image = newUser.image ?? null
    avatarFile.value = null
  }
}, { immediate: true })

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    let imageUrl = state.image

    // 1. 如果有新选择的头像文件，先上传
    if (avatarFile.value) {
      const uploadResult = await upload(avatarFile.value)
      if (uploadResult) {
        imageUrl = uploadResult.url
      }
      else {
        return errorToast(i18nCommon('updateFailed'))
      }
    }

    // 2. 提交用户资料更新
    const { error } = await $authClient.updateUser({
      name: event.data.name,
      image: imageUrl,
    })
    if (error) {
      return errorToast(error.message)
    }
    successToast(i18nCommon('updateSuccess'))
    avatarFile.value = null
    await refreshNuxtData()
  }
  catch (err) {
    errorToast(err instanceof Error ? err.message : i18nCommon('updateFailed'))
  }
  finally {
    loading.value = false
  }
}

// 组件卸载时清理临时URL
onUnmounted(() => {
  if (state.image && state.image.startsWith('blob:')) {
    URL.revokeObjectURL(state.image)
  }
})
</script>

<template>
  <UForm
    id="UserProfile"
    :schema
    :state
    @submit="onSubmit"
  >
    <UPageCard
      :title="i18nAccount('accountSettings.userProfile.title')"
      :description="i18nAccount('accountSettings.userProfile.description')"
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <UButton
        form="UserProfile"
        :label="i18nCommon('saveChanges')"
        type="submit"
        icon="lucide:save"
        :loading
        :disabled="!user || (state.name === user?.name && state.image === user?.image)"
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
        <UInput
          v-model="state.name"
          :placeholder="i18nCommon('placeholder')"
          autocomplete="off"
        />
      </UFormField>
      <USeparator />
      <UFormField
        :label="i18nAccount('accountSettings.userProfile.image')"
        :description="$t('pages.account.accountSettings.userProfile.imageDescription', { size: FILE_SIZE })"
        class="flex max-sm:flex-col justify-between sm:items-center gap-4"
      >
        <div class="flex flex-wrap items-center gap-3">
          <UAvatar
            :src="state.image ?? undefined"
            :alt="userName"
            size="lg"
          />
          <UButton
            v-if="avatarFile"
            :label="i18nPermissions('delete')"
            color="error"
            variant="outline"
            icon="lucide:trash-2"
            @click="resetAvatar"
          />
          <UButton
            v-else
            :label="i18nAccount('accountSettings.userProfile.uploadAvatar')"
            color="neutral"
            icon="lucide:upload"
            @click="onFileClick"
          />
          <input
            ref="fileRef"
            type="file"
            class="hidden"
            accept=".jpg, .jpeg, .png, .gif,.webp"
            @change="onFileChange"
          >
        </div>
      </UFormField>
    </UPageCard>
  </UForm>
</template>
