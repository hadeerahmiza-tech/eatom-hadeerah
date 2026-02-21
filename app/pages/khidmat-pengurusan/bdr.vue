<script setup lang="ts">
definePageMeta({ title: 'Permohonan BDR' })

const stats = ref([
  { label: 'Permohonan Bulan Ini', value: 28, icon: 'i-lucide-home', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Diluluskan', value: 24, icon: 'i-lucide-check-circle', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Menunggu', value: 3, icon: 'i-lucide-clock', color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Ditolak', value: 1, icon: 'i-lucide-x-circle', color: 'text-red-600', bg: 'bg-red-50' }
])

const columns = [
  { accessorKey: 'nama', header: 'Nama Pegawai' },
  { accessorKey: 'bahagian', header: 'Bahagian' },
  { accessorKey: 'tarikh', header: 'Tarikh BDR' },
  { accessorKey: 'sebab', header: 'Sebab' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { nama: 'Siti Semakan', bahagian: 'BPP', tarikh: '24/02/2026', sebab: 'Penyediaan laporan dari rumah', status: 'Diluluskan' },
  { nama: 'Ahmad Admin', bahagian: 'Pentadbiran', tarikh: '24/02/2026', sebab: 'Penyelenggaraan sistem', status: 'Diluluskan' },
  { nama: 'Nurul Hafizah', bahagian: 'BPR', tarikh: '25/02/2026', sebab: 'Analisis data pemantauan', status: 'Menunggu' },
  { nama: 'Kamal Ketua', bahagian: 'BPP', tarikh: '25/02/2026', sebab: 'Semakan dokumen perlesenan', status: 'Menunggu' },
  { nama: 'Mohd Rizal', bahagian: 'BPR', tarikh: '21/02/2026', sebab: 'Penulisan laporan teknikal', status: 'Diluluskan' }
])

const statusColour: Record<string, string> = { Diluluskan: 'success', Menunggu: 'warning', Ditolak: 'error' }

const trendOptions = computed(() => ({
  chart: { type: 'bar' as const, height: 260, toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
  colors: ['#3b82f6'],
  xaxis: { categories: ['Sep', 'Okt', 'Nov', 'Dis', 'Jan', 'Feb'] },
  dataLabels: { enabled: true },
  tooltip: { enabled: false }
}))
const trendSeries = ref([{ name: 'Permohonan', data: [22, 25, 30, 18, 26, 28] }])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Permohonan Bekerja Dari Rumah (BDR)</h2>
      <p class="text-sm text-gray-500">Pengurusan permohonan bekerja dari rumah</p>
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
          <template #header><p class="text-sm font-semibold text-gray-700">Senarai Permohonan</p></template>
          <UTable :data="data" :columns="columns">
            <template #status-cell="{ row }">
              <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
            </template>
          </UTable>
        </UCard>
      </div>
      <UCard>
        <template #header><p class="text-sm font-semibold text-gray-700">Permohonan Bulanan</p></template>
        <ClientOnly>
          <apexchart type="bar" height="260" :options="trendOptions" :series="trendSeries" />
          <template #fallback><div class="h-[260px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
    </div>
  </div>
</template>
