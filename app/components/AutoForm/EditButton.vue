<script setup lang="ts">
import { PERMISSIONS } from '@/enums'

defineProps<{
  disabled: boolean
}>()

const emit = defineEmits<{
  edit: []
}>()

const { i18nPermissions } = useMessage()

const raw = computed(() => PERMISSIONS.raw(PERMISSIONS.EDIT))
</script>

<template>
  <UButton
    :label="i18nPermissions(raw.label)"
    color="neutral"
    variant="outline"
    size="xs"
    :icon="raw.icon"
    :disabled
    @click="emit('edit')"
  />
</template>
