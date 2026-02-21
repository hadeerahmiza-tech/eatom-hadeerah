<script setup lang="ts">
definePageMeta({ title: 'Outreach & Promosi' })

const stats = ref([
  { label: 'Program (2026)', value: 12, icon: 'i-lucide-megaphone', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Peserta', value: 1450, icon: 'i-lucide-users', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Akan Datang', value: 4, icon: 'i-lucide-calendar', color: 'text-amber-600', bg: 'bg-amber-50' }
])

const columns = [
  { accessorKey: 'program', header: 'Nama Program' },
  { accessorKey: 'jenis', header: 'Jenis' },
  { accessorKey: 'tarikh', header: 'Tarikh' },
  { accessorKey: 'lokasi', header: 'Lokasi' },
  { accessorKey: 'peserta', header: 'Peserta' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { program: 'Pameran Sains Nuklear 2026', jenis: 'Pameran', tarikh: '15-17/03/2026', lokasi: 'KLCC', peserta: '-', status: 'Akan Datang' },
  { program: 'Program Kesedaran Radiasi - Sekolah', jenis: 'Ceramah', tarikh: '10/03/2026', lokasi: 'SM Sains Selangor', peserta: '-', status: 'Akan Datang' },
  { program: 'Seminar Keselamatan Sinaran untuk Industri', jenis: 'Seminar', tarikh: '20/02/2026', lokasi: 'Hotel Putrajaya', peserta: '120', status: 'Selesai' },
  { program: 'Lawatan Pelajar Universiti ke JTA', jenis: 'Lawatan', tarikh: '14/02/2026', lokasi: 'Pejabat JTA', peserta: '45', status: 'Selesai' },
  { program: 'Kempen Media Sosial - Hari Sinaran Sedunia', jenis: 'Digital', tarikh: '08/11/2025', lokasi: 'Dalam Talian', peserta: '5,200', status: 'Selesai' },
  { program: 'Bengkel Kewartawanan Sains', jenis: 'Bengkel', tarikh: '25/01/2026', lokasi: 'Dewan JTA', peserta: '35', status: 'Selesai' }
])

const statusColour: Record<string, string> = { 'Akan Datang': 'info', Selesai: 'success' }

const chartOptions = computed(() => ({
  chart: { type: 'bar' as const, height: 260, toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 4, horizontal: true } },
  colors: ['#8b5cf6'],
  xaxis: { categories: ['Pameran', 'Ceramah', 'Seminar', 'Lawatan', 'Digital', 'Bengkel'] },
  dataLabels: { enabled: true },
  tooltip: { enabled: false }
}))
const chartSeries = ref([{ name: 'Program', data: [2, 3, 2, 2, 1, 2] }])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Outreach & Promosi</h2>
      <p class="text-sm text-gray-500">Program jangkauan masyarakat dan promosi keselamatan sinaran</p>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
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
          <template #header><p class="text-sm font-semibold text-gray-700">Senarai Program</p></template>
          <UTable :data="data" :columns="columns">
            <template #status-cell="{ row }">
              <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
            </template>
          </UTable>
        </UCard>
      </div>
      <UCard>
        <template #header><p class="text-sm font-semibold text-gray-700">Program Mengikut Jenis</p></template>
        <ClientOnly>
          <apexchart type="bar" height="260" :options="chartOptions" :series="chartSeries" />
          <template #fallback><div class="h-[260px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
    </div>
  </div>
</template>
