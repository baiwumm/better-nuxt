<script setup lang="ts">
const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] as const
const sizes = ['sm', 'md', 'lg', 'xl'] as const

const md = computed(() => `
\`\`\`vue
<template>
  <Spinner />
<\/template>
\`\`\`
`)

const md1 = computed(() => `
\`\`\`vue
<script setup lang="ts">
const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] as const
<\/script>
<template>
  <Spinner v-for="color in colors" :key="color" :color />
<\/template>
\`\`\`
`)

const md2 = computed(() => `
\`\`\`vue
<script setup lang="ts">
const sizes = ['sm', 'md', 'lg', 'xl'] as const
<\/script>
<template>
  <Spinner v-for="size in sizes" :key="size" :size />
<\/template>
\`\`\`
`)
</script>

<template>
  <div class="space-y-4">
    <UAlert
      :title="$t('pages.playground.spinner.description')"
      color="neutral"
      variant="outline"
      icon="simple-icons:heroui"
      :actions="[
        {
          label: 'Hero UI',
          trailingIcon: 'lucide:external-link',
          to: 'https://heroui.com',
          target: '_blank',
        },
        {
          label: 'Spinner',
          color: 'neutral',
          variant: 'outline',
          trailingIcon: 'lucide:external-link',
          to: 'https://heroui.com/docs/react/components/spinner',
          target: '_blank',
        },
      ]"
    />
    <UCard title="Usage" :ui="{ body: 'flex justify-center' }">
      <Spinner />
      <template #footer>
        <MDC :value="md" />
      </template>
    </UCard>
    <UCard title="Colors" :ui="{ body: 'flex justify-center gap-4 flex-wrap' }">
      <Spinner v-for="color in colors" :key="color" :color />
      <template #footer>
        <MDC :value="md1" />
      </template>
    </UCard>
    <UCard title="Sizes" :ui="{ body: 'flex justify-center items-center gap-4 flex-wrap' }">
      <Spinner v-for="size in sizes" :key="size" :size />
      <template #footer>
        <MDC :value="md2" />
      </template>
    </UCard>
  </div>
</template>
