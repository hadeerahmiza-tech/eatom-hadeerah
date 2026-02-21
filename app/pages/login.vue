<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const form = reactive({ email: '', password: '' })
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    const { error: err } = await authClient.signIn.email({
      email: form.email,
      password: form.password
    })
    if (err) {
      error.value = err.message ?? 'E-mel atau kata laluan tidak sah.'
    } else {
      await navigateTo('/dashboard')
    }
  } catch {
    error.value = 'Ralat sistem. Sila cuba semula.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UCard class="shadow-2xl">
    <template #header>
      <h2 class="text-lg font-semibold text-center">Log Masuk</h2>
    </template>

    <form class="space-y-4" @submit.prevent="handleLogin">
      <UAlert
        v-if="error"
        color="error"
        :description="error"
        icon="i-lucide-circle-alert"
        variant="subtle"
      />

      <UFormField label="E-mel" required>
        <UInput
          v-model="form.email"
          type="email"
          placeholder="nama@eatom.gov.my"
          autocomplete="email"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Kata Laluan" required>
        <UInput
          v-model="form.password"
          type="password"
          placeholder="••••••••"
          autocomplete="current-password"
          class="w-full"
        />
      </UFormField>

      <UButton
        type="submit"
        :loading="loading"
        color="neutral"
        class="w-full justify-center"
        size="lg"
      >
        Log Masuk
      </UButton>
    </form>

    <template #footer>
      <p class="text-xs text-center text-gray-500">
        POC — Untuk ujian: ps@eatom.gov.my / ku@eatom.gov.my / pl@syarikat.com<br>
        Kata laluan: <code class="font-mono">password123</code>
      </p>
    </template>
  </UCard>
</template>
