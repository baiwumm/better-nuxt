<script setup lang="ts">
import { PERMISSIONS } from '@/enums'

defineProps<{
  disabled: boolean
  loading: boolean
}>()

const emit = defineEmits<{
  delete: []
}>()

const { i18nCommon } = useMessage()

const raw = computed(() => PERMISSIONS.raw(PERMISSIONS.DELETE))
</script>

<template>
  <UButton
    :label="i18nCommon(raw.label)"
    color="error"
    variant="soft"
    size="xs"
    :icon="raw.icon"
    :disabled
    :loading
    @click="emit('delete')"
  />
</template>
