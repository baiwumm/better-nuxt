<script setup lang="ts">
const ready = useState('app-ready', () => false)

onNuxtReady(() => {
  ready.value = true
})
</script>

<template>
  <div v-if="!ready" class="fixed inset-0 flex w-screen h-screen justify-center items-center flex-col z-999 overflow-hidden bg-default">
    <LoadingContent />
  </div>
</template>
