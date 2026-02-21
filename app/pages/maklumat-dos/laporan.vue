<script setup lang="ts">
definePageMeta({ title: 'Laporan & Statistik Dos' })

const chartOptions = computed(() => ({
  chart: { type: 'bar' as const, height: 300, stacked: true, toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
  colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
  xaxis: { categories: ['2020', '2021', '2022', '2023', '2024', '2025'] },
  yaxis: { title: { text: 'Bil. Pekerja' } },
  legend: { position: 'top' as const, fontSize: '11px' },
  dataLabels: { enabled: false }
}))
const chartSeries = ref([
  { name: 'Perubatan', data: [1250, 1320, 1380, 1420, 1510, 1580] },
  { name: 'Industri', data: [980, 1020, 1050, 1100, 1150, 1200] },
  { name: 'Penyelidikan', data: [450, 480, 520, 540, 560, 580] },
  { name: 'Lain-lain', data: [320, 340, 360, 380, 400, 420] }
])

const sektorOptions = computed(() => ({
  chart: { type: 'pie' as const, height: 280 },
  labels: ['Perubatan', 'Industri', 'Penyelidikan', 'Pendidikan', 'Lain-lain'],
  colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#6b7280'],
  legend: { position: 'bottom' as const, fontSize: '11px' }
}))
const sektorSeries = ref([1580, 1200, 580, 250, 170])

const reports = ref([
  { nama: 'Laporan Tahunan Dos Pekerja Sinaran 2025', tarikh: '15/01/2026', jenis: 'Tahunan', status: 'Diterbitkan' },
  { nama: 'Ringkasan Statistik Dos Q4 2025', tarikh: '10/01/2026', jenis: 'Suku Tahunan', status: 'Diterbitkan' },
  { nama: 'Laporan Khas - Analisis Dos Melebihi Had Siasatan', tarikh: '20/12/2025', jenis: 'Khas', status: 'Diterbitkan' },
  { nama: 'Ringkasan Statistik Dos Q1 2026', tarikh: '-', jenis: 'Suku Tahunan', status: 'Dalam Penyediaan' }
])

const reportColumns = [
  { accessorKey: 'nama', header: 'Nama Laporan' },
  { accessorKey: 'jenis', header: 'Jenis' },
  { accessorKey: 'tarikh', header: 'Tarikh' },
  { accessorKey: 'status', header: 'Status' }
]

const statusColour: Record<string, string> = { Diterbitkan: 'success', 'Dalam Penyediaan': 'warning' }
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Laporan & Statistik Dos</h2>
      <p class="text-sm text-gray-500">Laporan berkala dan analisis statistik dos pekerja sinaran</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <UCard class="lg:col-span-3">
        <template #header><p class="text-sm font-semibold text-gray-700">Pekerja Sinaran Mengikut Sektor (6 Tahun)</p></template>
        <ClientOnly>
          <apexchart type="bar" height="300" :options="chartOptions" :series="chartSeries" />
          <template #fallback><div class="h-[300px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
      <UCard class="lg:col-span-2">
        <template #header><p class="text-sm font-semibold text-gray-700">Pecahan Sektor (2025)</p></template>
        <ClientOnly>
          <apexchart type="pie" height="280" :options="sektorOptions" :series="sektorSeries" />
          <template #fallback><div class="h-[280px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
    </div>
    <UCard :ui="{ body: 'p-0' }">
      <template #header><p class="text-sm font-semibold text-gray-700">Senarai Laporan</p></template>
      <UTable :data="reports" :columns="reportColumns">
        <template #status-cell="{ row }">
          <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
