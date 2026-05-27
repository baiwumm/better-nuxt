<script setup lang="ts">
import { PERMISSIONS } from '@/enums'

defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  reset: []
}>()

const route = useRoute()

const { i18nPermissions } = useMessage()
const { hasPermission } = usePermissions()

const raw = PERMISSIONS.raw(PERMISSIONS.RESET)
</script>

<template>
  <UButton
    v-if="hasPermission(route.path, raw.bits)"
    :icon="raw.icon"
    color="neutral"
    variant="soft"
    :label="i18nPermissions(raw.label)"
    :disabled="loading"
    @click="emit('reset')"
  />
</template>
