<script setup lang="ts">
defineProps<{
  disabled?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: []
  close: []
}>()

const { i18nCommon } = useMessage()
</script>

<template>
  <div class="flex justify-end gap-2">
    <UButton :label="i18nCommon('cancel')" color="neutral" variant="outline" :disabled="loading" @click="emit('close')" />
    <UButton :disabled="disabled" :label="i18nCommon(loading ? 'inSave' : 'save')" color="neutral" form="menu-form" :loading icon="lucide:save" @click="emit('submit')" />
  </div>
</template>
