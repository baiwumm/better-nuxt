import { lastLoginMethodClient, magicLinkClient, usernameClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/vue'

export default defineNuxtPlugin(() => {
  const authClient = createAuthClient({
    plugins: [
      usernameClient(),
      magicLinkClient(),
      lastLoginMethodClient(),
    ],
  })
  return {
    provide: {
      authClient,
    },
  }
})
