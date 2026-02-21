<script setup lang="ts">
definePageMeta({ title: 'Inventori Peralatan' })

const stats = ref([
  { label: 'Jumlah Peralatan', value: 68, icon: 'i-lucide-box', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Aktif', value: 61, icon: 'i-lucide-check-circle', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Penyelenggaraan', value: 4, icon: 'i-lucide-wrench', color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Rosak/Pelupusan', value: 3, icon: 'i-lucide-trash-2', color: 'text-red-600', bg: 'bg-red-50' }
])

const columns = [
  { accessorKey: 'noAset', header: 'No. Aset' },
  { accessorKey: 'nama', header: 'Nama Peralatan' },
  { accessorKey: 'jenama', header: 'Jenama/Model' },
  { accessorKey: 'lokasi', header: 'Lokasi' },
  { accessorKey: 'tarikhKalibrasi', header: 'Kalibrasi Terakhir' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { noAset: 'JTA-EQ-001', nama: 'Survey Meter', jenama: 'Ludlum 19', lokasi: 'STN-01 Bangi', tarikhKalibrasi: '15/01/2026', status: 'Aktif' },
  { noAset: 'JTA-EQ-002', nama: 'TLD Reader', jenama: 'Harshaw 6600+', lokasi: 'Makmal Dosimetri', tarikhKalibrasi: '10/01/2026', status: 'Aktif' },
  { noAset: 'JTA-EQ-003', nama: 'Gamma Spectrometer', jenama: 'Canberra BE3825', lokasi: 'Makmal Analisis', tarikhKalibrasi: '20/12/2025', status: 'Aktif' },
  { noAset: 'JTA-EQ-004', nama: 'Air Sampler', jenama: 'F&J Specialty DF-14', lokasi: 'STN-03 Gebeng', tarikhKalibrasi: '05/11/2025', status: 'Penyelenggaraan' },
  { noAset: 'JTA-EQ-005', nama: 'Contamination Monitor', jenama: 'Thermo FHT 111M', lokasi: 'STN-06 Georgetown', tarikhKalibrasi: '01/02/2026', status: 'Aktif' },
  { noAset: 'JTA-EQ-006', nama: 'Environmental Monitor', jenama: 'Mirion RD200', lokasi: 'STN-05 Senai', tarikhKalibrasi: '15/09/2025', status: 'Rosak' }
])

const statusColour: Record<string, string> = { Aktif: 'success', Penyelenggaraan: 'warning', Rosak: 'error' }

const chartOptions = computed(() => ({
  chart: { type: 'donut' as const, height: 260 },
  labels: ['Survey Meter', 'TLD Reader', 'Spectrometer', 'Air Sampler', 'Monitor', 'Lain-lain'],
  colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6b7280'],
  legend: { position: 'bottom' as const, fontSize: '11px' },
  plotOptions: { pie: { donut: { size: '50%' } } }
}))
const chartSeries = ref([18, 8, 6, 12, 14, 10])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Inventori Peralatan</h2>
      <p class="text-sm text-gray-500">Pengurusan aset peralatan pemantauan dan pengukuran radiasi</p>
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
          <template #header><p class="text-sm font-semibold text-gray-700">Senarai Peralatan</p></template>
          <UTable :data="data" :columns="columns">
            <template #status-cell="{ row }">
              <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
            </template>
          </UTable>
        </UCard>
      </div>
      <UCard>
        <template #header><p class="text-sm font-semibold text-gray-700">Pecahan Jenis Peralatan</p></template>
        <ClientOnly>
          <apexchart type="donut" height="260" :options="chartOptions" :series="chartSeries" />
          <template #fallback><div class="h-[260px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
    </div>
  </div>
</template>
