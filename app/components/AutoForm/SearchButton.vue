<script setup lang="ts">
defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  refresh: []
}>()

const route = useRoute()

const { i18nPermissions } = useMessage()
const { hasPermission } = usePermissions()

const raw = PERMISSIONS.raw(PERMISSIONS.SEARCH)
</script>

<template>
  <UButton
    v-if="hasPermission(route.path, raw.bits)"
    :icon="raw.icon"
    :loading
    :label="i18nPermissions(raw.label)"
    @click="emit('refresh')"
  />
</template>
