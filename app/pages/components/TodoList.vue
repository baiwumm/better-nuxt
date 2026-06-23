<script lang="ts" setup>
import NumberFlow from '@number-flow/vue'

interface TodoItem {
  username: string
  date: string
  complate: boolean
}

/**
   * 待办事项列表
   * 记录每日工作任务及完成状态
   */
const list = reactive<TodoItem[]>([
  {
    username: '查看今天工作内容',
    date: '上午 09:30',
    complate: true,
  },
  {
    username: '回复邮件',
    date: '上午 10:30',
    complate: true,
  },
  {
    username: '工作汇报整理',
    date: '上午 11:00',
    complate: true,
  },
  {
    username: '产品需求会议',
    date: '下午 02:00',
    complate: false,
  },
  {
    username: '整理会议内容',
    date: '下午 03:30',
    complate: false,
  },
  {
    username: '明天工作计划',
    date: '下午 06:30',
    complate: false,
  },
])

const unComplateCount = computed(() => {
  return list.filter(item => !item.complate).length
})
</script>

<template>
  <UCard title="代办事项" :ui="{ body: 'p-0!' }">
    <template #description>
      <div>
        待处理：<NumberFlow :value="unComplateCount" class="text-error" />
      </div>
    </template>
    <UPageList divide>
      <UPageCard v-for="(v, index) in list" :key="index" variant="ghost" :ui="{ body: 'w-full' }">
        <template #body>
          <div class="flex items-center justify-between w-full">
            <UUser :name="v.username" :description="v.date" />
            <UCheckbox v-model="v.complate" />
          </div>
        </template>
      </UPageCard>
    </UPageList>
  </UCard>
</template>
