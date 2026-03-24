<script lang="ts" setup>
const router = useRouter()

const { $authClient } = useNuxtApp()

const session = $authClient.useSession()

const loading = ref(false)

async function signOut() {
  loading.value = true
  await $authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        router.push('/auth/sign-in')
      },
    },
  }).finally(() => {
    loading.value = false
  })
}
</script>

<template>
  <div>
    <UButton>{{ $t('pages.dashboard.title') }}</UButton>
    <UButton :loading="session.isPending">
      {{ session?.data?.user?.name }}
    </UButton>
    <UButton :loading @click="signOut">
      注销
    </UButton>
  </div>
</template>
