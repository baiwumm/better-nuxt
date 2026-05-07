import { lastLoginMethodClient, magicLinkClient, multiSessionClient, usernameClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/vue'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const authClient = createAuthClient({
    baseURL: config.public.appDomain,
    plugins: [
      usernameClient(),
      magicLinkClient(),
      lastLoginMethodClient(),
      multiSessionClient(),
    ],
  })
  return {
    provide: {
      authClient,
    },
  }
})
