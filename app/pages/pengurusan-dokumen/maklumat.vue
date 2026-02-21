<script setup lang="ts">
definePageMeta({ title: 'Maklumat Dokumen' })

const stats = ref([
  { label: 'Jumlah Dokumen', value: 1247, icon: 'i-lucide-files', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Dokumen Baru (Bulan Ini)', value: 34, icon: 'i-lucide-file-plus', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Menunggu Kelulusan', value: 5, icon: 'i-lucide-clock', color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Arkib', value: 823, icon: 'i-lucide-archive', color: 'text-gray-600', bg: 'bg-gray-50' }
])

const columns = [
  { accessorKey: 'noRujukan', header: 'No. Rujukan' },
  { accessorKey: 'tajuk', header: 'Tajuk' },
  { accessorKey: 'kategori', header: 'Kategori' },
  { accessorKey: 'tarikh', header: 'Tarikh' },
  { accessorKey: 'pemilik', header: 'Pemilik' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { noRujukan: 'DOK/BPP/2026/001', tajuk: 'Laporan Tahunan Perlesenan 2025', kategori: 'Laporan', tarikh: '15/01/2026', pemilik: 'BPP', status: 'Aktif' },
  { noRujukan: 'DOK/BPP/2026/002', tajuk: 'Minit Mesyuarat Perlesenan Bil. 1/2026', kategori: 'Minit', tarikh: '08/02/2026', pemilik: 'BPP', status: 'Aktif' },
  { noRujukan: 'DOK/BKP/2026/015', tajuk: 'Surat Kelulusan Lesen PL/2025/0001', kategori: 'Surat Rasmi', tarikh: '17/01/2026', pemilik: 'BKP', status: 'Aktif' },
  { noRujukan: 'DOK/BPP/2026/003', tajuk: 'Draf Garis Panduan Baharu', kategori: 'Panduan', tarikh: '20/02/2026', pemilik: 'BPP', status: 'Draf' },
  { noRujukan: 'DOK/BPR/2026/008', tajuk: 'Laporan Pemantauan Radiasi Jan 2026', kategori: 'Laporan', tarikh: '05/02/2026', pemilik: 'BPR', status: 'Aktif' }
])

const statusColour: Record<string, string> = { Aktif: 'success', Draf: 'warning', Arkib: 'neutral' }

const chartOptions = computed(() => ({
  chart: { type: 'pie' as const, height: 260 },
  labels: ['Laporan', 'Surat Rasmi', 'Minit', 'Panduan', 'Pekeliling', 'Lain-lain'],
  colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6b7280'],
  legend: { position: 'bottom' as const, fontSize: '11px' }
}))
const chartSeries = ref([345, 289, 198, 156, 134, 125])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Maklumat Dokumen</h2>
      <p class="text-sm text-gray-500">Sistem pengurusan dokumen rasmi organisasi</p>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <UCard v-for="s in stats" :key="s.label">
        <div class="flex items-start gap-3">
          <div class="p-2 rounded-lg" :class="s.bg"><UIcon :name="s.icon" class="w-4 h-4" :class="s.color" /></div>
          <div><p class="text-2xl font-bold text-gray-900 leading-none">{{ s.value }}</p><p class="text-xs text-gray-500 mt-1">{{ s.label }}</p></div>
        </div>
      </UCard>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2">
        <UCard :ui="{ body: 'p-0' }">
          <template #header><p class="text-sm font-semibold text-gray-700">Dokumen Terkini</p></template>
          <UTable :data="data" :columns="columns">
            <template #status-cell="{ row }">
              <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
            </template>
          </UTable>
        </UCard>
      </div>
      <UCard>
        <template #header><p class="text-sm font-semibold text-gray-700">Pecahan Kategori</p></template>
        <ClientOnly>
          <apexchart type="pie" height="260" :options="chartOptions" :series="chartSeries" />
          <template #fallback><div class="h-[260px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
    </div>
  </div>
</template>
