<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { fakerZH_CN as faker } from '@faker-js/faker'
import { useDraggable } from 'vue-draggable-plus'

interface User {
  id: number
  name: string
  position: string
  email: string
  role: string
}

// 生成 10 个用户数据
function generateUsers(count: number = 10): User[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: faker.person.fullName(),
    position: faker.person.jobTitle(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['Admin', 'Member', 'Owner', 'Guest']),
  }))
}

const data = ref<User[]>(generateUsers(10))

const columns: TableColumn<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
]

useDraggable('.my-table-tbody', data)
</script>

<template>
  <UCard title="表格拖拽">
    <UTable
      :data="data"
      :columns="columns"
      class="flex-1"
      :ui="{
        tbody: 'my-table-tbody [&>tr]:cursor-move',
      }"
    >
      <template #name-cell="{ row }">
        <div class="flex items-center gap-3">
          <UAvatar
            :src="`https://i.pravatar.cc/120?img=${row.original.id}`"
            size="lg"
            loading="lazy"
            :alt="`${row.original.name} avatar`"
          />
          <div>
            <p class="font-medium text-highlighted">
              {{ row.original.name }}
            </p>
            <p>
              {{ row.original.position }}
            </p>
          </div>
        </div>
      </template>
    </UTable>
  </UCard>
</template>
