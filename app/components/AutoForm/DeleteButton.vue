<script setup lang="ts">
defineProps<{
  disabled: boolean
  loading: boolean
}>()

const emit = defineEmits<{
  delete: []
}>()

const route = useRoute()

const { i18nPermissions } = useMessage()
const { hasPermission } = usePermissions()

const raw = PERMISSIONS.raw(PERMISSIONS.DELETE)
</script>

<template>
  <UButton
    v-if="hasPermission(route.path, raw.bits)"
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
