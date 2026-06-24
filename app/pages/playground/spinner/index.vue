<script setup lang="ts">
const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] as const
const sizes = ['sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <div class="space-y-4">
    <UPageHero
      title="Spinner"
      :description="$t('pages.playground.spinner.description')"
      :links="[
        {
          label: 'Spinner',
          color: 'neutral',
          variant: 'outline',
          trailingIcon: 'lucide:external-link',
          to: 'https://heroui.com/docs/react/components/spinner',
          target: '_blank',
        },
        {
          label: 'Hero UI',
          icon: 'simple-icons:github',
          to: 'https://github.com/heroui-inc/heroui',
          target: '_blank',
          trailingIcon: 'i-lucide-arrow-right',
        },
      ]"
      :ui="{ container: 'py-4!' }"
    >
      <template #headline>
        <UIcon name="simple-icons:heroui" class="size-12" />
      </template>
    </UPageHero>
    <UPageGrid>
      <UCard title="Usage" :ui="{ body: 'flex justify-center' }">
        <Spinner />
      </UCard>
      <UCard title="Colors" :ui="{ body: 'flex justify-center gap-4 flex-wrap' }">
        <Spinner v-for="color in colors" :key="color" :color />
      </UCard>
      <UCard title="Sizes" :ui="{ body: 'flex justify-center items-center gap-4 flex-wrap' }">
        <Spinner v-for="size in sizes" :key="size" :size />
      </UCard>
    </UPageGrid>
  </div>
</template>
