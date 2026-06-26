<script lang="ts" setup>
import { shuffle as _shuffle, maxBy, sample, without } from 'es-toolkit/array'
import { randomInt, range } from 'es-toolkit/math'

// 初始数据
const base = range(50)
const data = ref<number[]>([...base])
const isEmpty = computed(() => !data.value.length)

const [parent, enableAnimations] = useAutoAnimate({ duration: 600 })
const animationEnabled = ref(true)

const maxNum = computed(() => (maxBy(data.value, x => x) ?? 0) + 1)

// ========== 操作函数 ==========

// 打乱（直接用 es-toolkit shuffle）
function shuffle() {
  data.value = _shuffle(data.value)
}

// 添加一个（用 max + 1）
function addItem() {
  data.value = [...data.value, maxNum.value]
}

// 删除一个（随机删）
function removeItem() {
  if (!data.value.length)
    return
  data.value = without(data.value, sample(data.value))
}

// 插入一个（随机位置）
function insertItem() {
  const copy = [...data.value]
  copy.splice(randomInt(0, data.value.length), 0, maxNum.value)
  data.value = copy
}

// 重置
function reset() {
  data.value = [...base]
}
// ========== 动画开关 ==========
function toggleAnimation() {
  animationEnabled.value = !animationEnabled.value
  enableAnimations(animationEnabled.value)
}
</script>

<template>
  <div class="space-y-4">
    <UPageHero
      title="AutoAnimate"
      :description="$t('pages.playground.auto-animate.description')"
      :links="[
        {
          label: $t('common.docs'),
          color: 'neutral',
          variant: 'outline',
          icon: 'lucide:file-text',
          trailingIcon: 'lucide:external-link',
          to: 'https://auto-animate.formkit.com',
          target: '_blank',
        },
        {
          label: 'Github',
          icon: 'simple-icons:github',
          to: 'https://github.com/formkit/auto-animate',
          target: '_blank',
          trailingIcon: 'i-lucide-arrow-right',
        },
      ]"
      :ui="{ container: 'py-4!' }"
    >
      <template #headline>
        <UIcon name="lucide:sparkles" class="size-12" />
      </template>
    </UPageHero>
    <div class="flex flex-wrap justify-center gap-2">
      <UButton icon="lucide:shuffle" label="Shuffle" variant="outline" @click="shuffle" />
      <UButton icon="lucide:plus" label="Add" variant="outline" @click="addItem" />
      <UButton icon="lucide:arrow-down-to-dot" label="Insert" variant="outline" @click="insertItem" />
      <UButton icon="lucide:minus" label="Remove" :disabled="isEmpty" variant="outline" @click="removeItem" />
      <UButton icon="lucide:refresh-ccw" label="Reset" variant="outline" @click="reset" />

      <UButton
        :color="animationEnabled ? 'primary' : 'neutral'"
        variant="soft"
        icon="lucide:wand-2"
        :label="animationEnabled ? 'Animation ON' : 'Animation OFF'"
        @click="toggleAnimation"
      />
    </div>
    <div ref="parent" class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] w-full">
      <div v-for="v in data" :key="v" class="bg-elevated aspect-square text-2xl font-bold flex items-center justify-center rounded-md">
        {{ v + 1 }}
      </div>
    </div>
  </div>
</template>
