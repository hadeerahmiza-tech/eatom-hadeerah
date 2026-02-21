<script setup lang="ts">
definePageMeta({ title: 'Semakan Peperiksaan' })

const columns = [
  { accessorKey: 'sesi', header: 'Sesi' },
  { accessorKey: 'jenis', header: 'Jenis Peperiksaan' },
  { accessorKey: 'jumlahCalon', header: 'Calon' },
  { accessorKey: 'lulus', header: 'Lulus' },
  { accessorKey: 'gagal', header: 'Gagal' },
  { accessorKey: 'peratus', header: '% Lulus' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { sesi: 'Jan 2026', jenis: 'PPB Asas', jumlahCalon: 25, lulus: 21, gagal: 4, peratus: '84%', status: 'Disahkan' },
  { sesi: 'Jan 2026', jenis: 'PPB Lanjutan', jumlahCalon: 12, lulus: 11, gagal: 1, peratus: '92%', status: 'Disahkan' },
  { sesi: 'Jan 2026', jenis: 'Pengendali Sinaran', jumlahCalon: 8, lulus: 7, gagal: 1, peratus: '88%', status: 'Disahkan' },
  { sesi: 'Mac 2026', jenis: 'PPB Asas', jumlahCalon: 18, lulus: '-', gagal: '-', peratus: '-', status: 'Akan Datang' },
  { sesi: 'Mac 2026', jenis: 'PPB Lanjutan', jumlahCalon: 10, lulus: '-', gagal: '-', peratus: '-', status: 'Akan Datang' }
])

const statusColour: Record<string, string> = { Disahkan: 'success', 'Akan Datang': 'info', 'Dalam Semakan': 'warning' }

const chartOptions = computed(() => ({
  chart: { type: 'bar' as const, height: 280, toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
  colors: ['#10b981', '#ef4444'],
  xaxis: { categories: ['Sep 25', 'Okt 25', 'Nov 25', 'Dis 25', 'Jan 26'] },
  legend: { position: 'top' as const, fontSize: '11px' },
  dataLabels: { enabled: false }
}))
const chartSeries = ref([
  { name: 'Lulus', data: [18, 22, 20, 15, 39] },
  { name: 'Gagal', data: [3, 4, 2, 5, 6] }
])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Semakan Peperiksaan</h2>
      <p class="text-sm text-gray-500">Semakan keputusan dan statistik peperiksaan mengikut sesi</p>
    </div>
    <UCard>
      <template #header><p class="text-sm font-semibold text-gray-700">Trend Keputusan Peperiksaan</p></template>
      <ClientOnly>
        <apexchart type="bar" height="280" :options="chartOptions" :series="chartSeries" />
        <template #fallback><div class="h-[280px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
      </ClientOnly>
    </UCard>
    <UCard :ui="{ body: 'p-0' }">
      <template #header><p class="text-sm font-semibold text-gray-700">Ringkasan Sesi Peperiksaan</p></template>
      <UTable :data="data" :columns="columns">
        <template #status-cell="{ row }">
          <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
