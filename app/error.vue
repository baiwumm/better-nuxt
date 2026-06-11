<script setup lang="ts">
import type { NuxtError } from '#app'
import Error403 from '~/pages/exception/403/index.vue'
import Error404 from '~/pages/exception/404/index.vue'
import Error500 from '~/pages/exception/500/index.vue'

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
