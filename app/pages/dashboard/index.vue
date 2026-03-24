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
  <div class="w-screen h-screen flex justify-center items-center flex-col gap-4">
    <div class="flex items-center gap-4">
      <UButton>{{ $t('pages.dashboard.title') }}</UButton>
      <UAvatar
        :text="session?.data?.user?.name || session?.data?.user?.email[0]"
        :chip="{
          inset: true,
          position: 'bottom-right',
          color: 'success',
        }"
      />
      <UButton :loading @click="signOut">
        注销
      </UButton>
    </div>
    <div class="flex items-center gap-8">
      <div class="flex flex-col items-center gap-2">
        <Spinner />
        <span class="text-xs text-muted">Primary</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Spinner color="secondary" />
        <span class="text-xs text-muted">Secondary</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Spinner color="success" />
        <span class="text-xs text-muted">Success</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Spinner color="info" />
        <span class="text-xs text-muted">Info</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Spinner color="warning" />
        <span class="text-xs text-muted">Warning</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Spinner color="error" />
        <span class="text-xs text-muted">Error</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Spinner color="neutral" />
        <span class="text-xs text-muted">Neutral</span>
      </div>
    </div>
    <div class="flex items-center gap-8">
      <div class="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span class="text-xs text-muted">Small</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span class="text-xs text-muted">Medium</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span class="text-xs text-muted">Large</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <Spinner size="xl" />
        <span class="text-xs text-muted">Extra Large</span>
      </div>
    </div>
    <LoadingContent />
  </div>
</template>
