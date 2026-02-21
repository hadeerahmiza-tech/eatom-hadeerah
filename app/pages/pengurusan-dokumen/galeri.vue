<script setup lang="ts">
definePageMeta({ title: 'Galeri' })

const albums = ref([
  { tajuk: 'Pemeriksaan Tapak - Gebeng, Pahang', tarikh: '15/02/2026', bilFoto: 24, kategori: 'Kawalselia' },
  { tajuk: 'Majlis Penyerahan Lesen 2025', tarikh: '20/12/2025', bilFoto: 45, kategori: 'Acara' },
  { tajuk: 'Bengkel Keselamatan Sinaran Nasional', tarikh: '10/01/2026', bilFoto: 32, kategori: 'Latihan' },
  { tajuk: 'Lawatan Kerja ke Loji NORM', tarikh: '05/02/2026', bilFoto: 18, kategori: 'Lawatan' },
  { tajuk: 'Kalibrasi Peralatan - Makmal SSDL', tarikh: '28/01/2026', bilFoto: 12, kategori: 'Teknikal' },
  { tajuk: 'Hari Kualiti JTA 2025', tarikh: '15/11/2025', bilFoto: 56, kategori: 'Acara' },
  { tajuk: 'Pemeriksaan Tapak - Hospital Serdang', tarikh: '10/01/2026', bilFoto: 15, kategori: 'Kawalselia' },
  { tajuk: 'Mesyuarat IAEA Technical Meeting', tarikh: '25/11/2025', bilFoto: 20, kategori: 'Mesyuarat' }
])

const colours = ['bg-blue-100 text-blue-700', 'bg-green-100 text-green-700', 'bg-amber-100 text-amber-700', 'bg-purple-100 text-purple-700', 'bg-pink-100 text-pink-700']
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Galeri</h2>
      <p class="text-sm text-gray-500">Galeri foto dan dokumentasi visual aktiviti organisasi</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="(album, i) in albums" :key="album.tajuk" class="group cursor-pointer">
        <div class="aspect-video rounded-lg bg-gray-200 flex items-center justify-center mb-2 group-hover:bg-gray-300 transition-colors">
          <UIcon name="i-lucide-image" class="w-8 h-8 text-gray-400" />
        </div>
        <p class="text-xs font-medium text-gray-800 leading-tight">{{ album.tajuk }}</p>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-xs px-1.5 py-0.5 rounded" :class="colours[i % colours.length]">{{ album.kategori }}</span>
          <span class="text-xs text-gray-400">{{ album.bilFoto }} foto</span>
        </div>
        <p class="text-xs text-gray-400 mt-0.5">{{ album.tarikh }}</p>
      </div>
    </div>
  </div>
</template>
