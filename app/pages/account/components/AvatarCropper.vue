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
const inputRef = useTemplateRef('inputRef')

const open = ref(false)
const source = ref('')

function selectFile() {
  inputRef.value?.click()
}

function onChange(event: Event) {
  const input = event.target as HTMLInputElement
  const selectedFile = input.files?.[0]

  if (!selectedFile) {
    return
  }

  const validTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
  ]

  if (!validTypes.includes(selectedFile.type)) {
    return errorToast('Please upload JPG, PNG, GIF or WEBP image.')
  }

  if (selectedFile.size > props.maxSize * 1024 * 1024) {
    return errorToast(`Image size cannot exceed ${props.maxSize}MB.`)
  }

  if (source.value) {
    URL.revokeObjectURL(source.value)
  }

  source.value = URL.createObjectURL(selectedFile)

  open.value = true

  input.value = ''
}

async function confirmCrop() {
  const cropper = cropperRef.value

  if (!cropper) {
    return
  }

  const result = cropper.getResult()

  if (!result?.canvas) {
    return
  }

  const blob = await new Promise<Blob | null>((resolve) => {
    result.canvas?.toBlob(resolve, 'image/webp', 0.9)
  })

  if (!blob) {
    return
  }

  file.value = new File(
    [blob],
    `${user.value?.id}.webp`,
    {
      type: 'image/webp',
    },
  )

  open.value = false

  if (inputRef.value) {
    inputRef.value.value = ''
  }
}

onUnmounted(() => {
  if (source.value) {
    URL.revokeObjectURL(source.value)
  }
})
</script>

<template>
  <div>
    <input ref="inputRef" type="file" class="hidden" accept=".jpg,.jpeg,.png,.gif,.webp" @change="onChange">
    <slot name="trigger" :select-file="selectFile">
      <UButton icon="lucide:upload" :label="i18nAccount('accountSettings.userProfile.uploadAvatar')" @click="selectFile" />
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
          :src="source"
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
