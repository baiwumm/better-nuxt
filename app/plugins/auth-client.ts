import { dashClient, sentinelClient } from '@better-auth/infra/client'
import { adminClient, lastLoginMethodClient, magicLinkClient, multiSessionClient, usernameClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/vue'

export default defineNuxtPlugin(() => {
  const siteConfig = useSiteConfig()

  const authClient = createAuthClient({
    baseURL: siteConfig.url,
    plugins: [
      usernameClient(),
      magicLinkClient(),
      lastLoginMethodClient(),
      multiSessionClient(),
      adminClient(),
      dashClient(),
      sentinelClient({
        autoSolveChallenge: true,
      }),
    ],
  })
  return {
    provide: {
      authClient,
    },
  }
})
