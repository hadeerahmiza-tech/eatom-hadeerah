<script setup lang="ts">
definePageMeta({ title: 'Tempahan Kenderaan' })

const stats = ref([
  { label: 'Kenderaan Tersedia', value: 8, icon: 'i-lucide-car', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Sedang Digunakan', value: 3, icon: 'i-lucide-map-pin', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Tempahan Akan Datang', value: 5, icon: 'i-lucide-calendar', color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Penyelenggaraan', value: 1, icon: 'i-lucide-wrench', color: 'text-red-600', bg: 'bg-red-50' }
])

const columns = [
  { accessorKey: 'noTempahan', header: 'No. Tempahan' },
  { accessorKey: 'pemohon', header: 'Pemohon' },
  { accessorKey: 'kenderaan', header: 'Kenderaan' },
  { accessorKey: 'destinasi', header: 'Destinasi' },
  { accessorKey: 'tarikh', header: 'Tarikh' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { noTempahan: 'TK-2026-045', pemohon: 'Siti Semakan', kenderaan: 'Toyota Hilux (JTA 1234)', destinasi: 'Gebeng, Pahang - Pemeriksaan Tapak', tarikh: '25/02/2026', status: 'Disahkan' },
  { noTempahan: 'TK-2026-046', pemohon: 'Kamal Ketua', kenderaan: 'Toyota Innova (JTA 5678)', destinasi: 'Senai, Johor - Mesyuarat', tarikh: '26/02/2026', status: 'Disahkan' },
  { noTempahan: 'TK-2026-047', pemohon: 'Nurul Hafizah', kenderaan: 'Proton X70 (JTA 9012)', destinasi: 'Georgetown, Pulau Pinang - Persampelan', tarikh: '01/03/2026', status: 'Menunggu' },
  { noTempahan: 'TK-2026-044', pemohon: 'Ahmad Admin', kenderaan: 'Toyota Hilux (JTA 1234)', destinasi: 'Bangi - Hantar Peralatan', tarikh: '22/02/2026', status: 'Selesai' }
])

const statusColour: Record<string, string> = { Disahkan: 'success', Menunggu: 'warning', Selesai: 'neutral' }
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Tempahan Kenderaan</h2>
      <p class="text-sm text-gray-500">Sistem tempahan kenderaan rasmi jabatan</p>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <UCard v-for="s in stats" :key="s.label">
        <div class="flex items-start gap-3">
          <div class="p-2 rounded-lg" :class="s.bg"><UIcon :name="s.icon" class="w-4 h-4" :class="s.color" /></div>
          <div><p class="text-2xl font-bold text-gray-900 leading-none">{{ s.value }}</p><p class="text-xs text-gray-500 mt-1">{{ s.label }}</p></div>
        </div>
      </UCard>
    </div>
    <UCard :ui="{ body: 'p-0' }">
      <template #header>
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-gray-700">Senarai Tempahan</p>
          <UButton icon="i-lucide-plus" color="neutral" size="xs" label="Tempah Kenderaan" />
        </div>
      </template>
      <UTable :data="data" :columns="columns">
        <template #status-cell="{ row }">
          <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
