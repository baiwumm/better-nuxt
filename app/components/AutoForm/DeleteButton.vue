<script setup lang="ts">
import { PERMISSIONS } from '@/enums'

defineProps<{
  disabled: boolean
  loading: boolean
}>()

const emit = defineEmits<{
  delete: []
}>()

const { i18nPermissions } = useMessage()

const raw = computed(() => PERMISSIONS.raw(PERMISSIONS.DELETE))
</script>

<template>
  <UButton
    :label="i18nPermissions(raw.label)"
    color="error"
    variant="soft"
    size="xs"
    :icon="raw.icon"
    :disabled
    :loading
    @click="emit('delete')"
  />
</template>
