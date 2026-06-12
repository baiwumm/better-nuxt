<script lang="ts" setup>
import { Presets, Ticker } from '@tombcato/smart-ticker/vue'
import { sample } from 'es-toolkit/array'
import { random } from 'es-toolkit/math'
import { CONTROL, DIRECTION, EASING, HERO_MODE, intlConfig, textSequence } from './utils'

const heroText = ref('Smart Diff')
const heroPrice = ref(random(-10000, 10000))
const heroMode = ref<typeof HERO_MODE.valueType>(HERO_MODE.TEXT)
const activeFormatter = ref<Intl.NumberFormat>(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }))
const activeIntlConfig = ref<{ locale: string, options: Intl.NumberFormatOptions } | null>({ locale: 'en-US', options: { style: 'currency', currency: 'USD' } })
const duration = ref(800)
const easing = ref<typeof EASING.valueType>(EASING.EASE_OUT_CUBIC)
const charWidth = ref(1)
const prefix = ref('')
const suffix = ref('')
const direction = ref<typeof DIRECTION.valueType>(DIRECTION.ANY)
const controls = ref<typeof CONTROL.valueType[]>([CONTROL.FADING_EDGE])
const autoScale = computed(() => controls.value.includes(CONTROL.AUTO_SCALE))
const fadingEdge = computed(() => controls.value.includes(CONTROL.FADING_EDGE))
const disableAnimation = computed(() => controls.value.includes(CONTROL.DISABLE_ANIMATION))

const heroValue = computed(() => heroMode.value === HERO_MODE.INIT_CURRENCY
  ? heroPrice.value
  : (heroMode.value === HERO_MODE.PRICE ? heroPrice.value.toFixed(2) : heroText.value))

const characterLists = computed(() => heroMode.value === HERO_MODE.TEXT
  ? [Presets.ALPHANUMERIC]
  : (heroMode.value === HERO_MODE.INIT_CURRENCY ? [Presets.CURRENCY] : [Presets.NUMBER]))

function randomize() {
  if (heroMode.value === HERO_MODE.INIT_CURRENCY) {
    const conf = sample(intlConfig)
    heroPrice.value = conf.val
    activeFormatter.value = new Intl.NumberFormat(conf.locale, conf.options)
    activeIntlConfig.value = { locale: conf.locale, options: conf.options }
  }
  else {
    heroPrice.value = random(-10000, 10000)
    heroText.value = sample(textSequence)
  }
}

const numberFormatProp = computed(() => {
  if (heroMode.value === HERO_MODE.INIT_CURRENCY)
    return { numberFormat: activeFormatter.value }
  return {}
})

const { pause, resume, isActive } = useIntervalFn(() => {
  randomize()
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
      :description="$t('pages.playground.count-to.smart-ticker.description')"
      :links="[
        {
          label: 'Shuffle',
          icon: 'lucide:refresh-ccw',
          color: 'neutral',
          variant: 'outline',
          onClick: randomize,
        },
        {
          label: 'Smart Tieker',
          icon: 'simple-icons:github',
          to: 'https://github.com/tombcato/smart-ticker',
          target: '_blank',
          trailingIcon: 'i-lucide-arrow-right',
        },
      ]"
      :ui="{ container: '!py-0' }"
    >
      <template #headline>
        <UFieldGroup>
          <UButton
            v-for="({ value, label }) in HERO_MODE.items"
            :key="value"
            :color="value === heroMode ? 'primary' : 'neutral'"
            :variant="value === heroMode ? 'solid' : 'outline'"
            :label
            @click="heroMode = value"
          />
        </UFieldGroup>
      </template>
      <template #title>
        <Ticker
          :value="heroValue"
          :character-lists
          :duration
          :easing
          :char-width
          :prefix
          :suffix
          :direction
          :auto-scale
          :fading-edge
          :disable-animation
          v-bind="numberFormatProp"
        />
      </template>
    </UPageHero>
    <UPageSection :ui="{ container: '!py-6' }">
      <UContainer>
        <UPageGrid>
          <UFormField label="字符宽度">
            <URadioGroup
              v-model="charWidth"
              orientation="horizontal"
              variant="table"
              :items="[0.8, 1, 1.2].map(v => ({ value: v, label: String(v) }))"
              size="sm"
              indicator="hidden"
              :ui="{
                item: 'flex-1',
              }"
            >
              <template #label="{ item }">
                {{ `${item.label}x` }}
              </template>
            </URadioGroup>
          </UFormField>
          <UFormField label="动画时长">
            <URadioGroup
              v-model="duration"
              orientation="horizontal"
              variant="table"
              :items="[400, 800, 1200].map(v => ({ value: v, label: String(v) }))"
              size="sm"
              indicator="hidden"
              :ui="{
                item: 'flex-1',
              }"
            >
              <template #label="{ item }">
                {{ `${item.label}ms` }}
              </template>
            </URadioGroup>
          </UFormField>
          <UFormField label="滚动方向">
            <URadioGroup
              v-model="direction"
              orientation="horizontal"
              variant="table"
              :items="DIRECTION.items"
              size="sm"
              indicator="hidden"
              :ui="{
                item: 'flex-1',
              }"
            />
          </UFormField>
          <UFormField label="缓动曲线">
            <URadioGroup
              v-model="easing"
              orientation="horizontal"
              variant="table"
              :items="EASING.items"
              size="sm"
              indicator="hidden"
              :ui="{
                item: 'flex-1',
              }"
            />
          </UFormField>
          <UFormField label="控制">
            <UCheckboxGroup
              v-model="controls"
              orientation="horizontal"
              variant="table"
              size="sm"
              :items="CONTROL.items"
            />
          </UFormField>
          <UFormField label="装饰">
            <UFieldGroup size="xl">
              <UInput
                v-model="prefix"
                :ui="{
                  base: 'pl-14',
                  leading: 'pointer-events-none',
                }"
              >
                <template #leading>
                  <p class="text-sm text-muted">
                    前缀
                  </p>
                </template>
              </UInput>
              <UInput
                v-model="suffix"
                :ui="{
                  base: 'pl-14',
                  leading: 'pointer-events-none',
                }"
              >
                <template #leading>
                  <p class="text-sm text-muted">
                    后缀
                  </p>
                </template>
              </UInput>
            </UFieldGroup>
          </UFormField>
        </UPageGrid>
      </UContainer>
    </UPageSection>
  </div>
</template>

<style scoped>
.ticker {
  font-family: var(--font-sans) !important;
}
</style>
