<script setup lang="ts">
import { PERMISSIONS } from '@/enums'

const emit = defineEmits<{
  add: []
}>()

const { i18nPermissions } = useMessage()

const raw = computed(() => PERMISSIONS.raw(PERMISSIONS.ADD))
</script>

<template>
  <UButton
    :icon="raw.icon"
    color="neutral"
    variant="outline"
    :label="i18nPermissions(raw.label)"
    @click="emit('add')"
  />
</template>
