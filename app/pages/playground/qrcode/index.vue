<script setup lang="ts">
import type { SVGVariant } from 'nuxt-qrcode'

const siteConfig = useSiteConfig()

const value = ref(siteConfig.url)
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
</script>

<template>
  <div class="space-y-4">
    <UPageHero
      title="Nuxt QRCode"
      :description="$t('pages.playground.qrcode.description')"
      :links="[
        {
          label: $t('common.docs'),
          color: 'neutral',
          variant: 'outline',
          icon: 'lucide:file-text',
          trailingIcon: 'lucide:external-link',
          to: 'https://qrcode.s94.dev',
          target: '_blank',
        },
        {
          label: 'Github',
          icon: 'simple-icons:github',
          to: 'https://github.com/sandros94/nuxt-qrcode',
          target: '_blank',
          trailingIcon: 'i-lucide-arrow-right',
        },
      ]"
      :ui="{ container: 'py-4!' }"
    >
      <template #headline>
        <UIcon name="lucide:qr-code" class="size-12" />
      </template>
    </UPageHero>
    <div class="flex sm:items-center gap-2 flex-col sm:flex-row">
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
    </UCard>
    <UCard title="useQrcode Composable" class="w-full" :ui="{ body: 'flex justify-center' }">
      <div class="w-80">
        <img class="w-full h-full" :src="qr" alt="QR Code">
      </div>
    </UCard>
  </div>
</template>
