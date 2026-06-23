<script setup lang="ts">
import { randomInt } from 'es-toolkit/math'

interface HeatmapCell {
  day: number
  hour: number
  value: number
}

const loading = ref(false)
const dataSource = ref<HeatmapCell[]>([])

const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

const hours = ['12时', '19时', '15时', '0时', '8时', '4时', '1时']

const colorMap = [
  'bg-primary/20',
  'bg-primary/40',
  'bg-primary/60',
  'bg-primary/80',
]

function getValue(day: number, hour: number) {
  return dataSource.value.find(
    item => item.day === day && item.hour === hour,
  )?.value ?? 0
}

function getLevel(value: number) {
  if (value === 0)
    return colorMap[0]
  if (value < 25)
    return colorMap[1]
  if (value < 50)
    return colorMap[2]
  return colorMap[3]
}

function generateData() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    dataSource.value = Array.from({ length: 49 }, (_, i) => ({
      day: i % 7,
      hour: Math.floor(i / 7),
      value: randomInt(1, 100),
    }))
  }, 1200)
}

onMounted(() => {
  generateData()
})
</script>

<template>
  <UCard title="一周活跃时段" :ui="{ body: 'relative' }">
    <ContainerLoading v-if="loading" />
    <div class="flex gap-4">
      <!-- 左侧时间 -->
      <div class="grid gap-2 pt-1">
        <div
          v-for="hour in hours"
          :key="hour"
          class="h-8 text-sm text-muted flex items-center"
        >
          {{ hour }}
        </div>
      </div>

      <!-- 热力图 -->
      <div class="flex flex-col gap-2">
        <!-- 方块 -->
        <div class="grid grid-cols-7 gap-2">
          <template
            v-for="hourIndex in hours.length"
            :key="hourIndex"
          >
            <UTooltip
              v-for="dayIndex in days.length"
              :key="`${hourIndex}-${dayIndex}`"
              arrow
              :text="`${days[dayIndex - 1]} ${hours[hourIndex - 1]}\n活跃度：${getValue(dayIndex - 1, hourIndex - 1)}`"
            >
              <div
                class="size-8 rounded-md transition-all duration-200 hover:scale-110 cursor-pointer"
                :class="
                  getLevel(
                    getValue(dayIndex - 1, hourIndex - 1),
                  )
                "
              />
            </UTooltip>
          </template>
        </div>

        <!-- 星期 -->
        <div class="grid grid-cols-7 gap-2">
          <div
            v-for="day in days"
            :key="day"
            class="text-center text-sm text-muted"
          >
            {{ day }}
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
