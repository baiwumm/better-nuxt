<script setup lang="ts">
interface Props {
  text: string
  loading?: boolean
}

defineProps<Props>()
</script>

<template>
  <UButton
    type="submit"
    icon="ri:check-fill"
    :loading="loading"
    class="w-full justify-center"
  >
    {{ text }}
  </UButton>
</template>
