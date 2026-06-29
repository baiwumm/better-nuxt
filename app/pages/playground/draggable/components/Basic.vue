<script lang="ts" setup>
import { range } from 'es-toolkit/math'
import { vDraggable } from 'vue-draggable-plus'

const list = ref<number[]>(range(20))
</script>

<template>
  <ClientOnly>
    <UCard title="基本使用">
      <ul
        v-draggable="[
          list,
          {
            animation: 300,
            ghostClass: 'ghost',
          },
        ]"
        class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] w-full"
      >
        <li v-for="v in list" :key="v" class="bg-elevated aspect-square text-2xl font-bold flex items-center justify-center rounded-md cursor-move">
          {{ v + 1 }}
        </li>
      </ul>
    </UCard>
  </ClientOnly>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background: var(--ui-color-neutral-50);
}
</style>
