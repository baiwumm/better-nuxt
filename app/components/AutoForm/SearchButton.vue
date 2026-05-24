<script setup lang="ts">
import { PERMISSIONS } from '@/enums'

defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  refresh: []
}>()

const { i18nPermissions } = useMessage()

const raw = computed(() => PERMISSIONS.raw(PERMISSIONS.SEARCH))
</script>

<template>
  <UButton
    :icon="raw.icon"
    :loading
    :label="i18nPermissions(raw.label)"
    @click="emit('refresh')"
  />
</template>
