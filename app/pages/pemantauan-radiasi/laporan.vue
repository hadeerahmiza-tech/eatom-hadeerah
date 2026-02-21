<script setup lang="ts">
definePageMeta({ title: 'Laporan Pemantauan' })

const reports = ref([
  { nama: 'Laporan Bulanan Pemantauan Radiasi - Januari 2026', tarikh: '05/02/2026', jenis: 'Bulanan', saiz: '3.2 MB', status: 'Diterbitkan' },
  { nama: 'Laporan Bulanan Pemantauan Radiasi - Disember 2025', tarikh: '08/01/2026', jenis: 'Bulanan', saiz: '2.9 MB', status: 'Diterbitkan' },
  { nama: 'Laporan Tahunan Pemantauan Radiasi 2025', tarikh: '15/01/2026', jenis: 'Tahunan', saiz: '12.5 MB', status: 'Diterbitkan' },
  { nama: 'Laporan Khas - Insiden STN-05 (Sep 2025)', tarikh: '20/10/2025', jenis: 'Khas', saiz: '5.1 MB', status: 'Diterbitkan' },
  { nama: 'Laporan Bulanan Pemantauan Radiasi - Februari 2026', tarikh: '-', jenis: 'Bulanan', saiz: '-', status: 'Dalam Penyediaan' }
])

const columns = [
  { accessorKey: 'nama', header: 'Nama Laporan' },
  { accessorKey: 'jenis', header: 'Jenis' },
  { accessorKey: 'tarikh', header: 'Tarikh Terbit' },
  { accessorKey: 'saiz', header: 'Saiz' },
  { accessorKey: 'status', header: 'Status' }
]

const statusColour: Record<string, string> = { Diterbitkan: 'success', 'Dalam Penyediaan': 'warning' }

const trendOptions = computed(() => ({
  chart: { type: 'area' as const, height: 280, toolbar: { show: false } },
  colors: ['#3b82f6'],
  stroke: { width: 2, curve: 'smooth' as const },
  fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
  xaxis: { categories: ['Jul', 'Ogos', 'Sep', 'Okt', 'Nov', 'Dis', 'Jan'] },
  yaxis: { title: { text: 'Purata μSv/h' }, min: 0.05, max: 0.15 },
  dataLabels: { enabled: false }
}))
const trendSeries = ref([{ name: 'Purata Nasional', data: [0.085, 0.088, 0.092, 0.087, 0.083, 0.086, 0.089] }])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Laporan Pemantauan</h2>
      <p class="text-sm text-gray-500">Laporan berkala dan khas pemantauan radiasi persekitaran</p>
    </div>
    <UCard>
      <template #header><p class="text-sm font-semibold text-gray-700">Trend Purata Bacaan Nasional (7 Bulan)</p></template>
      <ClientOnly>
        <apexchart type="area" height="280" :options="trendOptions" :series="trendSeries" />
        <template #fallback><div class="h-[280px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
      </ClientOnly>
    </UCard>
    <UCard :ui="{ body: 'p-0' }">
      <template #header><p class="text-sm font-semibold text-gray-700">Senarai Laporan</p></template>
      <UTable :data="reports" :columns="columns">
        <template #status-cell="{ row }">
          <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
