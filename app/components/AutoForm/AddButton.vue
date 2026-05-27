<script setup lang="ts">
import { PERMISSIONS } from '@/enums'

const emit = defineEmits<{
  add: []
}>()

const route = useRoute()

const { i18nPermissions } = useMessage()
const { hasPermission } = usePermissions()

const raw = PERMISSIONS.raw(PERMISSIONS.ADD)
</script>

<template>
  <UButton
    v-if="hasPermission(route.path, raw.bits)"
    :icon="raw.icon"
    color="neutral"
    variant="outline"
    :label="i18nPermissions(raw.label)"
    @click="emit('add')"
  />
</template>
