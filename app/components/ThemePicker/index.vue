<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <UPopover v-model:open="open" arrow :ui="{ content: 'w-80 p-4 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-5rem)]' }">
    <template #default>
      <UButton
        icon="i-lucide-swatch-book"
        color="neutral"
        :variant="open ? 'soft' : 'ghost'"
        square
        aria-label="Theme Picker"
        :ui="{ leadingIcon: 'text-primary' }"
      />
    </template>
    <template #content>
      <div class="flex flex-col gap-4">
        <LazyThemePickerPrimaryColor />
        <LazyThemePickerColorMode />
        <LazyThemePickerLocales />
        <LazyThemePickerRadius />
        <LazyThemePickerRouteTransition />
      </div>
    </template>
  </UPopover>
</template>
