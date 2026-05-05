<script setup lang="ts">
import type { SVGVariant } from 'nuxt-qrcode'

const config = useRuntimeConfig()

const value = ref(config.public.appDomain)
const variant = ref<SVGVariant>('default')

const variants = ref<string[]>([
  'default',
  'circle',
  'pixelated',
  'rounded',
  'dots',
])

const qr = useQrcode(value, {
  toBase64: true,
  variant,
})

const md = computed(() => `
\`\`\`vue
<template>
  <Qrcode 
    value="${value.value}" 
    variant="${variant.value}"
  />
<\/template>
\`\`\`
`)

const md1 = computed(() => `
\`\`\`vue
<script setup lang="ts">
const qr = useQrcode("${value.value}", {
  toBase64: true,
  variant="${variant.value}"
/>
<\/script>
<template>
<img class="w-full h-full" :src="qr" alt="QR Code">
<\/template>
\`\`\`
`)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex sm:items-center gap-2 flex-col sm:flex-row">
      <UButton to="https://qrcode.s94.dev/" target="_blank" icon="i-lucide-qr-code">
        Nuxt QRCode
      </UButton>
      <UFieldGroup>
        <UButton
          color="neutral"
          variant="subtle"
          label="value"
        />
        <UInput v-model="value" />
      </UFieldGroup>
      <UFieldGroup>
        <UButton
          color="neutral"
          variant="subtle"
          label="variant"
        />
        <USelect v-model="variant" :items="variants" />
      </UFieldGroup>
    </div>
    <UCard title="Qrcode Component" class="w-full" :ui="{ body: 'flex justify-center' }">
      <div class="w-80">
        <Qrcode :value :variant="variant" />
      </div>
      <template #footer>
        <MDC :value="md" />
      </template>
    </UCard>
    <UCard title="useQrcode Composable" class="w-full" :ui="{ body: 'flex justify-center' }">
      <div class="w-80">
        <img class="w-full h-full" :src="qr" alt="QR Code">
      </div>
      <template #footer>
        <MDC :value="md1" />
      </template>
    </UCard>
  </div>
</template>
