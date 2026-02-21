import { createAuthClient } from 'better-auth/vue'

export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' ? window.location.origin : (process.env.BETTER_AUTH_URL || 'http://localhost:3001')
})

export const useAuthUser = () => {
  // useSession() may return data=undefined during SSR; use optional chaining throughout
  const sessionResult = authClient.useSession()
  const session = sessionResult?.data as Ref<{ user?: Record<string, unknown> } | null> | undefined

  const user = computed(() => session?.value?.user ?? null)
  const role = computed(() => (session?.value?.user as { role?: string } | undefined)?.role ?? null)
  const isLoggedIn = computed(() => !!session?.value?.user)

  const hasRole = (...roles: string[]) => roles.includes(role.value ?? '')
  const isInternal = computed(() => hasRole('ADMIN', 'PS', 'KU', 'P', 'KP'))
  const isExternal = computed(() => hasRole('PL', 'AWAM'))
  const isPending = sessionResult?.isPending ?? ref(false)

  return { user, role, isLoggedIn, isPending, hasRole, isInternal, isExternal }
}
