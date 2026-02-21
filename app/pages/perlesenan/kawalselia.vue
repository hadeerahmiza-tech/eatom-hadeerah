<script setup lang="ts">
definePageMeta({ title: 'Kawalselia' })

const stats = ref([
  { label: 'Jumlah Pemeriksaan', value: 89, icon: 'i-lucide-clipboard-check', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Patuh', value: 72, icon: 'i-lucide-shield-check', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Tidak Patuh', value: 11, icon: 'i-lucide-shield-alert', color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Dijadualkan', value: 6, icon: 'i-lucide-calendar', color: 'text-amber-600', bg: 'bg-amber-50' }
])

const columns = [
  { accessorKey: 'noLaporan', header: 'No. Laporan' },
  { accessorKey: 'syarikat', header: 'Syarikat' },
  { accessorKey: 'jenisPemeriksaan', header: 'Jenis' },
  { accessorKey: 'tarikhPemeriksaan', header: 'Tarikh' },
  { accessorKey: 'pegawai', header: 'Pegawai' },
  { accessorKey: 'status', header: 'Keputusan' }
]

const data = ref([
  { noLaporan: 'KS-2026-001', syarikat: 'Syarikat Atom Sdn Bhd', jenisPemeriksaan: 'Pemeriksaan Rutin', tarikhPemeriksaan: '10/01/2026', pegawai: 'Siti Semakan', status: 'Patuh' },
  { noLaporan: 'KS-2026-002', syarikat: 'Radiasi Teknik Sdn Bhd', jenisPemeriksaan: 'Pemeriksaan Khas', tarikhPemeriksaan: '15/01/2026', pegawai: 'Kamal Ketua', status: 'Tidak Patuh' },
  { noLaporan: 'KS-2026-003', syarikat: 'Perubatan Nuklear KL', jenisPemeriksaan: 'Pemeriksaan Rutin', tarikhPemeriksaan: '22/01/2026', pegawai: 'Siti Semakan', status: 'Patuh' },
  { noLaporan: 'KS-2026-004', syarikat: 'Gamma Industrial', jenisPemeriksaan: 'Pemeriksaan Tapak', tarikhPemeriksaan: '05/02/2026', pegawai: 'Kamal Ketua', status: 'Patuh' },
  { noLaporan: 'KS-2026-005', syarikat: 'MediRad Diagnostik', jenisPemeriksaan: 'Pemeriksaan Rutin', tarikhPemeriksaan: '28/02/2026', pegawai: 'Siti Semakan', status: 'Dijadualkan' },
  { noLaporan: 'KS-2026-006', syarikat: 'SinarTech Engineering', jenisPemeriksaan: 'Pemeriksaan Khas', tarikhPemeriksaan: '10/03/2026', pegawai: 'Kamal Ketua', status: 'Dijadualkan' }
])

const statusColour: Record<string, string> = { Patuh: 'success', 'Tidak Patuh': 'error', Dijadualkan: 'warning' }

const chartOptions = computed(() => ({
  chart: { type: 'bar' as const, height: 280, stacked: true, toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 4, columnWidth: '45%' } },
  colors: ['#10b981', '#ef4444', '#f59e0b'],
  xaxis: { categories: ['Sep', 'Okt', 'Nov', 'Dis', 'Jan', 'Feb'] },
  legend: { position: 'top' as const, fontSize: '11px' },
  dataLabels: { enabled: false }
}))
const chartSeries = ref([
  { name: 'Patuh', data: [12, 14, 10, 13, 12, 11] },
  { name: 'Tidak Patuh', data: [2, 1, 3, 2, 1, 2] },
  { name: 'Dijadualkan', data: [0, 0, 0, 0, 3, 3] }
])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Kawalselia</h2>
      <p class="text-sm text-gray-500">Pemeriksaan pematuhan dan kawalselia premis sinaran</p>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <UCard v-for="s in stats" :key="s.label">
        <div class="flex items-start gap-3">
          <div class="p-2 rounded-lg" :class="s.bg"><UIcon :name="s.icon" class="w-4 h-4" :class="s.color" /></div>
          <div>
            <p class="text-2xl font-bold text-gray-900 leading-none">{{ s.value }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ s.label }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <UCard>
      <template #header><p class="text-sm font-semibold text-gray-700">Trend Pemeriksaan (6 Bulan)</p></template>
      <ClientOnly>
        <apexchart type="bar" height="280" :options="chartOptions" :series="chartSeries" />
        <template #fallback><div class="h-[280px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
      </ClientOnly>
    </UCard>

    <UCard :ui="{ body: 'p-0' }">
      <template #header><p class="text-sm font-semibold text-gray-700">Senarai Pemeriksaan</p></template>
      <UTable :data="data" :columns="columns">
        <template #status-cell="{ row }">
          <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
