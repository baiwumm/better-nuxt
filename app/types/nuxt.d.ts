import type { $Fetch } from 'ofetch'

declare module '#app' {
  interface NuxtApp {
    $request: $Fetch
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $request: $Fetch
  }
}
