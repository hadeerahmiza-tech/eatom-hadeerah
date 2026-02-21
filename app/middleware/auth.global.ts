import { authClient } from '~/composables/useAuth'

const PUBLIC_ROUTES = ['/login', '/daftar']

export default defineNuxtRouteMiddleware(async (to) => {
  if (PUBLIC_ROUTES.includes(to.path)) return

  if (import.meta.server) {
    // SSR: forward browser cookies so the session can be verified server-side
    const headers = useRequestHeaders(['cookie'])
    const session = await $fetch('/api/auth/get-session', { headers }).catch(() => null)
    if (!(session as { user?: unknown } | null)?.user) return navigateTo('/login')
    return
  }

  // Client-side: browser sends cookies automatically
  const { data: session } = await authClient.getSession()
  if (!session?.user) return navigateTo('/login')
})
