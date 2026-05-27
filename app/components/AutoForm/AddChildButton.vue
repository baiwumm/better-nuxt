<script setup lang="ts">
import { PERMISSIONS } from '@/enums'

defineProps<{
  disabled: boolean
}>()

const emit = defineEmits<{
  addChild: []
}>()

const route = useRoute()

const { i18nPermissions } = useMessage()
const { hasPermission } = usePermissions()

const raw = PERMISSIONS.raw(PERMISSIONS.ADD_CHILD)
</script>

<template>
  <UButton
    v-if="hasPermission(route.path, raw.bits)"
    :label="i18nPermissions(raw.label)"
    color="neutral"
    variant="outline"
    size="xs"
    :icon="raw.icon"
    :disabled
    @click="emit('addChild')"
  />
</template>
