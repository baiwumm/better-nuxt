<script setup lang="ts">
interface Props {
  leftText: string
  rightText: string
  to: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex justify-center items-center text-xs">
    <ULink as="button">
      {{ leftText }}
    </ULink>
    <ULink as="button" :to class="font-bold">
      {{ rightText }}
    </ULink>
  </div>
</template>
