<template>
  <div>
    <UButton>{{ $t('pages.dashboard.title') }}</UButton>
    <ClientOnly>
      <LocaleSelect />
    </ClientOnly>
  </div>
</template>
