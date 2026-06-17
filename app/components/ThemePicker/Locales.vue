<script setup lang="ts">
const { locale, setLocale } = useI18n()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="font-bold text-muted text-xs">
      {{ $t('components.themePicker.locales') }}
    </div>
    <div class="grid grid-cols-2 gap-1.5">
      <UButton v-for="{ value, label, raw } in I18N_LOCALES.items" :key="value" color="neutral" size="sm" :variant="locale === value ? 'subtle' : 'outline'" class="capitalize ring-default rounded-sm text-xs justify-center" :label="label" @click="setLocale(value)">
        <template #leading>
          <span>{{ raw.icon }}</span>
        </template>
      </UButton>
    </div>
  </div>
</template>
