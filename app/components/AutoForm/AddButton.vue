<script setup lang="ts">
import { PERMISSIONS } from '@/enums'

const emit = defineEmits<{
  add: []
}>()

const { i18nCommon } = useMessage()

const raw = computed(() => PERMISSIONS.raw(PERMISSIONS.ADD))
</script>

<template>
  <UButton
    :icon="raw.icon"
    color="neutral"
    variant="outline"
    :label="i18nCommon(raw.label)"
    @click="emit('add')"
  />
</template>
