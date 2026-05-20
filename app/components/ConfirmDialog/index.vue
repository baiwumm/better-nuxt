<script lang="ts" setup>
export interface ConfirmDialogProps {
  title: string
  description: string
  confirmLabel: string
  loadingLabel: string
  onConfirm?: () => Promise<boolean> | boolean
}

const props = defineProps<ConfirmDialogProps>()

const emits = defineEmits<{
  close: [value: boolean]
}>()

const { i18nCommon } = useMessage()

const isLoading = ref(false)

async function handleConfirm() {
  if (props.onConfirm) {
    isLoading.value = true
    try {
      const shouldClose = await props.onConfirm()
      if (shouldClose) {
        emits('close', true)
      }
    }
    catch (error) {
      console.error('Confirm action failed:', error)
    }
    finally {
      isLoading.value = false
    }
  }
  else {
    emits('close', true)
  }
}
</script>

<template>
  <UModal
    :title
    :description
    :dismissible="false"
    :ui="{ footer: 'justify-end' }"
  >
    <template #footer>
      <UButton :label="i18nCommon('cancel')" color="neutral" :disabled="isLoading" variant="outline" @click="emits('close', false)" />
      <UButton
        :label="isLoading ? loadingLabel : confirmLabel"
        color="error"
        :loading="isLoading"
        :disabled="isLoading"
        @click="handleConfirm"
      />
    </template>
  </UModal>
</template>
