<script setup lang="ts">
import { randomInt } from 'es-toolkit/math'
</script>

<template>
  <div class="flex flex-col size-full">
    <!-- 标题 -->
    <div class="border-b border-default p-4 sm:px-6 shrink-0">
      <USkeleton class="h-7 w-3/4" />
    </div>

    <!-- 作者 -->
    <div
      class="flex justify-between items-center gap-4 p-4 sm:px-6 border-b border-default shrink-0"
    >
      <div class="flex items-center gap-3">
        <USkeleton class="size-10 rounded-full" />

        <div class="space-y-2">
          <USkeleton class="h-4 w-20" />
          <USkeleton class="h-3 w-36" />
        </div>
      </div>

      <USkeleton class="h-3 w-16" />
    </div>

    <!-- 内容 -->
    <div class="flex-1 p-4 sm:p-6 overflow-hidden">
      <div class="space-y-4">
        <USkeleton
          v-for="index in 12"
          :key="index"
          class="h-4"
          :style="{ width: `${randomInt(60, 100)}%` }"
        />
      </div>
    </div>
  </div>
</template>
