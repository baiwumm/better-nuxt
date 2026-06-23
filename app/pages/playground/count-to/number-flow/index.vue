<script lang="ts" setup>
import NumberFlow from '@number-flow/vue'
import { sample } from 'es-toolkit/array'
import { randomInt } from 'es-toolkit/math'
import Activity from './components/Activity.vue'
import Countdown from './components/Countdown.vue'
import InputNumber from './components/InputNumber.vue'
import Slide from './components/Slide.vue'
import { FORMATS, LOCALES } from './utils'

const value = ref(0)
const locale = ref(sample(LOCALES))
const format = ref(sample(FORMATS))

function handleShuffle() {
  value.value = randomInt(-100000, 100000)
  locale.value = sample(LOCALES)
  format.value = sample(FORMATS)
}

const { pause, resume, isActive } = useIntervalFn(() => {
  handleShuffle()
}, 2000)

onActivated(() => {
  if (!isActive.value)
    resume()
})
onDeactivated(() => {
  if (isActive.value)
    pause()
})
</script>

<template>
  <div class="space-y-4">
    <UPageHero
      :description="$t('pages.playground.count-to.number-flow.description')"
      :links="[
        {
          label: 'Shuffle',
          icon: 'lucide:refresh-ccw',
          color: 'neutral',
          variant: 'outline',
          onClick: handleShuffle,
        },
        {
          label: 'NumberFlow',
          icon: 'simple-icons:github',
          to: 'https://github.com/barvian/number-flow',
          target: '_blank',
          trailingIcon: 'i-lucide-arrow-right',
        },
      ]"
      :ui="{ container: '!py-0' }"
    >
      <template #title>
        <NumberFlow :value :format :locales="locale" class="text-5xl font-bold" />
      </template>
    </UPageHero>
    <UPageSection :ui="{ container: '!py-6' }">
      <UContainer>
        <UPageGrid :ui="{ base: 'lg:grid-cols-4 gap-4' }">
          <InputNumber :locale />
          <Activity :locale />
          <Slide :locale />
          <Countdown />
        </UPageGrid>
      </UContainer>
    </UPageSection>
  </div>
</template>
