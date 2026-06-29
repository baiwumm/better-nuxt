<script lang="ts" setup>
import { range } from 'es-toolkit/math'
import { vDraggable } from 'vue-draggable-plus'

const COUNT = 5

const list1 = ref<number[]>(range(COUNT))
const list2 = ref(list1.value.map(item => item + COUNT))
</script>

<template>
  <ClientOnly>
    <UCard title="双列表">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UCard>
          <ul
            v-draggable="[
              list1,
              {
                animation: 300,
                ghostClass: 'ghost',
                group: 'container',
              },
            ]"
            class="grid gap-4 grid-cols-1 w-full"
          >
            <li v-for="v in list1" :key="v" class="bg-elevated p-4 text-2xl font-bold flex items-center justify-center rounded-md cursor-move">
              {{ v + 1 }}
            </li>
          </ul>
        </UCard>
        <UCard>
          <ul
            v-draggable="[
              list2,
              {
                animation: 300,
                ghostClass: 'ghost',
                group: 'container',
              },
            ]"
            class="grid gap-4 grid-cols-1 w-full"
          >
            <li v-for="v in list2" :key="v" class="bg-elevated p-4 text-2xl font-bold flex items-center justify-center rounded-md cursor-move">
              {{ v + 1 }}
            </li>
          </ul>
        </UCard>
      </div>
    </UCard>
  </ClientOnly>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background: var(--ui-color-neutral-50);
}
</style>
