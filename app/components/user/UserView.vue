<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  user: User
}>()

const { getUserDisplayName } = useCurrentUser()

const userName = computed(() => getUserDisplayName(props.user))
const email = computed(() => props.user.email)

const attrs = useAttrs()
</script>

<template>
  <UUser
    :name="userName"
    :description="userName === email ? undefined : email"
    :avatar="{
      src: user.image ?? undefined,
      alt: userName,
      loading: 'lazy',
    }"
    v-bind="attrs"
  />
</template>
