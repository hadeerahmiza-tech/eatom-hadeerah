<script setup lang="ts">
definePageMeta({ title: 'Peperiksaan & Pensijilan' })

const stats = ref([
  { label: 'Jumlah Calon', value: 156, icon: 'i-lucide-graduation-cap', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Lulus', value: 132, icon: 'i-lucide-check-circle', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Gagal', value: 18, icon: 'i-lucide-x-circle', color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Belum Duduki', value: 6, icon: 'i-lucide-clock', color: 'text-amber-600', bg: 'bg-amber-50' }
])

const columns = [
  { accessorKey: 'nama', header: 'Nama Calon' },
  { accessorKey: 'noIC', header: 'No. KP' },
  { accessorKey: 'jenisPeperiksaan', header: 'Jenis' },
  { accessorKey: 'tarikh', header: 'Tarikh' },
  { accessorKey: 'markah', header: 'Markah' },
  { accessorKey: 'status', header: 'Keputusan' }
]

const data = ref([
  { nama: 'Ahmad bin Hassan', noIC: '850312-XX-XXXX', jenisPeperiksaan: 'PPB Asas', tarikh: '15/01/2026', markah: '82%', status: 'Lulus' },
  { nama: 'Siti Aminah binti Yusof', noIC: '900715-XX-XXXX', jenisPeperiksaan: 'PPB Lanjutan', tarikh: '15/01/2026', markah: '91%', status: 'Lulus' },
  { nama: 'Razak bin Ali', noIC: '880423-XX-XXXX', jenisPeperiksaan: 'PPB Asas', tarikh: '15/01/2026', markah: '45%', status: 'Gagal' },
  { nama: 'Lee Wei Ming', noIC: '920108-XX-XXXX', jenisPeperiksaan: 'Pengendali Sinaran', tarikh: '20/01/2026', markah: '76%', status: 'Lulus' },
  { nama: 'Nurul Aisyah binti Omar', noIC: '950620-XX-XXXX', jenisPeperiksaan: 'PPB Asas', tarikh: '28/02/2026', markah: '-', status: 'Belum Duduki' },
  { nama: 'Mohd Faiz bin Ibrahim', noIC: '870930-XX-XXXX', jenisPeperiksaan: 'PPB Lanjutan', tarikh: '28/02/2026', markah: '-', status: 'Belum Duduki' }
])

const statusColour: Record<string, string> = { Lulus: 'success', Gagal: 'error', 'Belum Duduki': 'warning' }

const chartOptions = computed(() => ({
  chart: { type: 'donut' as const, height: 260 },
  labels: ['Lulus', 'Gagal', 'Belum Duduki'],
  colors: ['#10b981', '#ef4444', '#f59e0b'],
  legend: { position: 'bottom' as const, fontSize: '12px' },
  plotOptions: { pie: { donut: { size: '55%' } } }
}))
const chartSeries = ref([132, 18, 6])

const trendOptions = computed(() => ({
  chart: { type: 'bar' as const, height: 260, toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
  colors: ['#10b981', '#ef4444'],
  xaxis: { categories: ['Sep', 'Okt', 'Nov', 'Dis', 'Jan', 'Feb'] },
  dataLabels: { enabled: false },
  legend: { position: 'top' as const, fontSize: '11px' }
}))
const trendSeries = ref([
  { name: 'Lulus', data: [18, 22, 25, 20, 28, 19] },
  { name: 'Gagal', data: [3, 2, 5, 4, 2, 2] }
])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Peperiksaan & Pensijilan</h2>
      <p class="text-sm text-gray-500">Pengurusan peperiksaan PPB dan pensijilan pengendali sinaran</p>
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

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <UCard>
        <template #header><p class="text-sm font-semibold text-gray-700">Keputusan Peperiksaan</p></template>
        <ClientOnly>
          <apexchart type="donut" height="260" :options="chartOptions" :series="chartSeries" />
          <template #fallback><div class="h-[260px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
      <UCard>
        <template #header><p class="text-sm font-semibold text-gray-700">Trend Peperiksaan (6 Bulan)</p></template>
        <ClientOnly>
          <apexchart type="bar" height="260" :options="trendOptions" :series="trendSeries" />
          <template #fallback><div class="h-[260px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
    </div>

    <UCard :ui="{ body: 'p-0' }">
      <template #header><p class="text-sm font-semibold text-gray-700">Senarai Calon Peperiksaan</p></template>
      <UTable :data="data" :columns="columns">
        <template #status-cell="{ row }">
          <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
