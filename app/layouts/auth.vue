<template>
  <UApp>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <!-- Logo / Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-900 mb-4">
            <UIcon name="i-lucide-atom" class="w-8 h-8 text-white" />
          </div>
          <h1 class="text-2xl font-bold text-gray-900">Sistem eATOM</h1>
          <p class="text-gray-500 text-sm mt-1">Jabatan Tenaga Atom Malaysia</p>
        </div>
        <slot />
        <p class="text-center text-gray-500 text-xs mt-6">
          © {{ new Date().getFullYear() }} Jabatan Tenaga Atom Malaysia
        </p>
      </div>
    </div>
  </UApp>
</template>
