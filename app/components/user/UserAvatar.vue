<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  user: User
}>()

const { getUserDisplayName } = useCurrentUser()

const userName = computed(() => getUserDisplayName(props.user))

const attrs = useAttrs()
</script>

<template>
  <UAvatar
    :src="user.image ?? undefined"
    :alt="userName"
    loading="lazy"
    v-bind="attrs"
  />
</template>
