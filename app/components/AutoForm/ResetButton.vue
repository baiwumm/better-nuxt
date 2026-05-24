<script setup lang="ts">
import { PERMISSIONS } from '@/enums'

defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  reset: []
}>()

const { i18nPermissions } = useMessage()

const raw = computed(() => PERMISSIONS.raw(PERMISSIONS.RESET))
</script>

<template>
  <UButton
    :icon="raw.icon"
    color="neutral"
    variant="soft"
    :label="i18nPermissions(raw.label)"
    :disabled="loading"
    @click="emit('reset')"
  />
</template>
