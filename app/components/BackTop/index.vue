<script setup lang="ts">
import { animate } from 'motion-v'

const props = withDefaults(defineProps<{
  threshold?: number
}>(), {
  threshold: 300,
})

const appScrollContainer = useAppScrollContainer()
const visible = ref(false)

function handleScroll() {
  const el = appScrollContainer.value
  if (!el)
    return

  visible.value = el.scrollTop > props.threshold
}

function scrollToTop() {
  const el = appScrollContainer.value
  if (!el)
    return

  animate(el.scrollTop, 0, {
    duration: 0.6,
    ease: 'easeOut',
    onUpdate: (latest) => {
      el.scrollTop = latest
    },
  })
}

function bindScroll(el: HTMLElement) {
  el.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
}

onMounted(() => {
  if (appScrollContainer.value) {
    bindScroll(appScrollContainer.value)
  }
})

watch(appScrollContainer, (el) => {
  if (!el)
    return
  bindScroll(el)
})
</script>

<template>
  <ClientOnly>
    <Transition name="backtop" appear>
      <div
        v-if="visible"
        class="fixed bottom-6 right-6 z-50"
      >
        <UButton
          icon="i-heroicons-arrow-up-20-solid"
          color="primary"
          size="lg"
          class="shadow-lg"
          @click="scrollToTop"
        />
      </div>
    </Transition>
  </ClientOnly>
</template>

<style scoped>
.backtop-enter-active,
.backtop-leave-active {
  transition: all 0.25s ease;
}

.backtop-enter-from,
.backtop-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}
</style>
