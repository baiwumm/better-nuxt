<script setup lang="ts">
interface Props {
  text?: string
}

const props = defineProps<Props>()

const text = computed(() => {
  return props.text ?? 'Loading...'
})
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <Spinner />
    <div class="text-xs text-muted">
      {{ text }}
    </div>
  </div>
</template>
