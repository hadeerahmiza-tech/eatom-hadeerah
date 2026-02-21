<script setup lang="ts">
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: { lang: 'ms' }
})
useSeoMeta({
  title: 'Sistem eATOM — Jabatan Tenaga Atom Malaysia',
  description: 'Sistem Aplikasi Jabatan Tenaga Atom (eATOM)'
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
