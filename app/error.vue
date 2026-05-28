<script setup lang="ts">
import type { NuxtError } from '#app'
import Error403 from '~/components/error/Error403.vue'
import Error404 from '~/components/error/Error404.vue'
import Error500 from '~/components/error/Error500.vue'

defineProps<{
  error: NuxtError
}>()

await useInitLocales()
</script>

<template>
  <Error403 v-if="error.status === 403" />

  <Error404 v-else-if="error.status === 404" />

  <Error500 v-else />
</template>
