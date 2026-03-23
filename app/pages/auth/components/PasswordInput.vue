<script setup lang="ts">
const model = defineModel<string>()

const show = ref(false)
</script>

<template>
  <UFormField :label="$t('auth.password.label')" name="password" required>
    <UInput v-model="model" :type="show ? 'text' : 'password'" :placeholder="$t('auth.password.placeholder')" class="w-full">
      <template #trailing>
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
          :aria-label="show ? 'Hide password' : 'Show password'"
          :aria-pressed="show"
          @click="show = !show"
        />
      </template>
    </UInput>
    <template v-if="$slots.hint" #hint>
      <slot name="hint" />
    </template>
  </UFormField>
</template>
