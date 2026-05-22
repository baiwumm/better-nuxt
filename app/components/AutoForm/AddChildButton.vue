<script setup lang="ts">
import { PERMISSIONS } from '@/enums'

defineProps<{
  disabled: boolean
}>()

const emit = defineEmits<{
  addChild: []
}>()

const { i18nCommon } = useMessage()

const raw = computed(() => PERMISSIONS.raw(PERMISSIONS.ADD_CHILD))
</script>

<template>
  <UButton
    :label="i18nCommon(raw.label)"
    color="neutral"
    variant="outline"
    size="xs"
    :icon="raw.icon"
    :disabled
    @click="emit('addChild')"
  />
</template>
