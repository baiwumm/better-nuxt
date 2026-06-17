<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'

const props = withDefaults(
  defineProps<{
    maxSize?: number
    aspectRatio?: number
  }>(),
  {
    maxSize: 1,
    aspectRatio: 1,
  },
)

const file = defineModel<File | null>('file')
const { i18nAccount, i18nCommon } = useMessage()
const { errorToast } = useAppToast()
const { user } = useCurrentUser()

const cropperRef = useTemplateRef('cropperRef')

const { open: selectFile, reset, onChange } = useFileDialog({
  accept: 'image/*',
  multiple: false,
})

const open = ref(false)
const source = shallowRef<File | null>(null)
const objectUrl = useObjectUrl(source) // 自动生成和管理 URL
const isCropping = ref(false)

function validateImage(file: File): boolean {
  if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
    errorToast({ title: i18nAccount('accountSettings.userProfile.validAvatarType') })
    return false
  }

  if (file.size > props.maxSize * 1024 * 1024) {
    errorToast({ title: $t('pages.account.accountSettings.userProfile.validAvatarType', { size: props.maxSize }) })
    return false
  }

  return true
}

onChange(async (files) => {
  const selectedFile = files?.[0]

  if (!selectedFile) {
    return
  }

  if (!validateImage(selectedFile))
    return

  // 直接存储原始文件，不用手动管理 URL
  source.value = selectedFile
  open.value = true

  reset()
})

async function confirmCrop() {
  if (isCropping.value)
    return
  const cropper = cropperRef.value

  if (!cropper) {
    return
  }

  isCropping.value = true

  try {
    const result = cropper.getResult()
    if (!result?.canvas)
      return

    const blob = await new Promise<Blob | null>((resolve) => {
      result.canvas?.toBlob(resolve, 'image/webp', 0.9)
    })

    if (!blob)
      return

    file.value = new File(
      [blob],
      `${user.value?.id}.webp`,
      { type: 'image/webp' },
    )

    open.value = false
    source.value = null
  }
  finally {
    isCropping.value = false
  }
}

watch(open, (isOpen) => {
  if (!isOpen) {
    source.value = null
  }
})
</script>

<template>
  <div>
    <slot name="trigger" :select-file="selectFile">
      <UButton icon="lucide:upload" :label="i18nAccount('accountSettings.userProfile.uploadAvatar')" @click="() => selectFile()" />
    </slot>
    <UModal
      v-model:open="open"
      :title="i18nAccount('accountSettings.userProfile.cropAvatar')"
      :description="i18nAccount('accountSettings.userProfile.cropAvatarDescription')"
      :ui="{
        content: 'max-w-xl',
        footer: 'justify-end',
      }"
    >
      <template #body>
        <Cropper
          ref="cropperRef"
          :src="objectUrl"
          class="h-100"
          image-restriction="stencil"
          :stencil-props="{
            aspectRatio,
          }"
        />
      </template>

      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton color="neutral" variant="outline" :label="i18nCommon('cancel')" @click="open = false" />
          <UButton icon="lucide:check" :label="i18nCommon('confirm')" @click="confirmCrop" />
        </div>
      </template>
    </UModal>
  </div>
</template>
