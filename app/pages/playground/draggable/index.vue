<script lang="ts" setup>
import Basic from './components/Basic.vue'
import TableDrag from './components/TableDrag.vue'
import TwoList from './components/TwoList.vue'
</script>

<template>
  <div class="space-y-4">
    <UPageHero
      title="Vue Draggable Plus"
      :description="$t('pages.playground.draggable.description')"
      :links="[
        {
          label: $t('common.docs'),
          color: 'neutral',
          variant: 'outline',
          icon: 'lucide:file-text',
          trailingIcon: 'lucide:external-link',
          to: 'https://vue-draggable-plus.pages.dev',
          target: '_blank',
        },
        {
          label: 'Github',
          icon: 'simple-icons:github',
          to: 'https://github.com/Alfred-Skyblue/vue-draggable-plus',
          target: '_blank',
          trailingIcon: 'i-lucide-arrow-right',
        },
      ]"
      :ui="{ container: 'py-4!' }"
    >
      <template #headline>
        <UIcon name="lucide:grip-vertical" class="size-12" />
      </template>
    </UPageHero>
    <Basic />
    <TwoList />
    <ClientOnly>
      <TableDrag />
    </ClientOnly>
  </div>
</template>
