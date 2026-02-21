<script setup lang="ts">
definePageMeta({ title: 'Permohonan Latihan' })

const stats = ref([
  { label: 'Jumlah Permohonan', value: 42, icon: 'i-lucide-book-open', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Diluluskan', value: 35, icon: 'i-lucide-check-circle', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Menunggu', value: 5, icon: 'i-lucide-clock', color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Ditolak', value: 2, icon: 'i-lucide-x-circle', color: 'text-red-600', bg: 'bg-red-50' }
])

const columns = [
  { accessorKey: 'nama', header: 'Nama Pegawai' },
  { accessorKey: 'kursus', header: 'Nama Kursus / Latihan' },
  { accessorKey: 'penganjur', header: 'Penganjur' },
  { accessorKey: 'tarikh', header: 'Tarikh' },
  { accessorKey: 'kos', header: 'Kos (RM)' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { nama: 'Siti Semakan', kursus: 'Kursus Perlindungan Sinaran Lanjutan', penganjur: 'AELB', tarikh: '10-12/03/2026', kos: '1,500', status: 'Diluluskan' },
  { nama: 'Kamal Ketua', kursus: 'Seminar Keselamatan Nuklear Antarabangsa', penganjur: 'IAEA', tarikh: '20-24/04/2026', kos: '8,500', status: 'Menunggu' },
  { nama: 'Ahmad Admin', kursus: 'Latihan Pengurusan Sistem ICT', penganjur: 'INTAN', tarikh: '15-16/03/2026', kos: '800', status: 'Diluluskan' },
  { nama: 'Siti Semakan', kursus: 'Bengkel QA/QC Pengukuran Radiasi', penganjur: 'SSDL Malaysia', tarikh: '05/03/2026', kos: '500', status: 'Diluluskan' },
  { nama: 'Pengarah Penilaian', kursus: 'Leadership Development Programme', penganjur: 'JPA', tarikh: '01-05/06/2026', kos: '3,000', status: 'Menunggu' }
])

const statusColour: Record<string, string> = { Diluluskan: 'success', Menunggu: 'warning', Ditolak: 'error' }

const chartOptions = computed(() => ({
  chart: { type: 'bar' as const, height: 260, toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
  colors: ['#3b82f6'],
  xaxis: { categories: ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun'] },
  dataLabels: { enabled: true },
  tooltip: { enabled: false }
}))
const chartSeries = ref([{ name: 'Permohonan', data: [8, 6, 10, 5, 7, 6] }])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Permohonan Latihan</h2>
      <p class="text-sm text-gray-500">Pengurusan permohonan kursus dan latihan pegawai</p>
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
          <template #header><p class="text-sm font-semibold text-gray-700">Senarai Permohonan Latihan</p></template>
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
          <apexchart type="bar" height="260" :options="chartOptions" :series="chartSeries" />
          <template #fallback><div class="h-[260px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
    </div>
  </div>
</template>
