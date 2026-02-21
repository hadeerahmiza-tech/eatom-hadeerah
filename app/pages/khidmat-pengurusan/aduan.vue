<script setup lang="ts">
definePageMeta({ title: 'Aduan Kerosakan' })

const stats = ref([
  { label: 'Jumlah Aduan (2026)', value: 34, icon: 'i-lucide-alert-circle', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Selesai', value: 28, icon: 'i-lucide-check-circle', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Dalam Tindakan', value: 4, icon: 'i-lucide-wrench', color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Baru', value: 2, icon: 'i-lucide-plus-circle', color: 'text-red-600', bg: 'bg-red-50' }
])

const columns = [
  { accessorKey: 'noAduan', header: 'No. Aduan' },
  { accessorKey: 'pengadu', header: 'Pengadu' },
  { accessorKey: 'kategori', header: 'Kategori' },
  { accessorKey: 'penerangan', header: 'Penerangan' },
  { accessorKey: 'lokasi', header: 'Lokasi' },
  { accessorKey: 'tarikh', header: 'Tarikh' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { noAduan: 'AD-2026-034', pengadu: 'Siti Semakan', kategori: 'Elektrikal', penerangan: 'Lampu pejabat BPP tidak berfungsi', lokasi: 'Aras 3, BPP', tarikh: '21/02/2026', status: 'Baru' },
  { noAduan: 'AD-2026-033', pengadu: 'Ahmad Admin', kategori: 'ICT', penerangan: 'Printer bilik server rosak', lokasi: 'Bilik Server', tarikh: '20/02/2026', status: 'Dalam Tindakan' },
  { noAduan: 'AD-2026-032', pengadu: 'Nurul Hafizah', kategori: 'Penghawa Dingin', penerangan: 'Aircond makmal tidak sejuk', lokasi: 'Makmal Analisis', tarikh: '18/02/2026', status: 'Dalam Tindakan' },
  { noAduan: 'AD-2026-031', pengadu: 'Kamal Ketua', kategori: 'Bangunan', penerangan: 'Kebocoran siling bilik mesyuarat', lokasi: 'Bilik Mesyuarat 2', tarikh: '15/02/2026', status: 'Selesai' },
  { noAduan: 'AD-2026-030', pengadu: 'Mohd Rizal', kategori: 'Elektrikal', penerangan: 'Socket rosak', lokasi: 'Aras 2, BPR', tarikh: '12/02/2026', status: 'Selesai' }
])

const statusColour: Record<string, string> = { Selesai: 'success', 'Dalam Tindakan': 'warning', Baru: 'error' }

const chartOptions = computed(() => ({
  chart: { type: 'donut' as const, height: 250 },
  labels: ['Elektrikal', 'ICT', 'Penghawa Dingin', 'Bangunan', 'Lain-lain'],
  colors: ['#f59e0b', '#3b82f6', '#06b6d4', '#8b5cf6', '#6b7280'],
  legend: { position: 'bottom' as const, fontSize: '11px' },
  plotOptions: { pie: { donut: { size: '50%' } } }
}))
const chartSeries = ref([10, 8, 7, 5, 4])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Aduan Kerosakan</h2>
      <p class="text-sm text-gray-500">Sistem pengurusan aduan kerosakan dan penyelenggaraan</p>
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
          <template #header>
            <div class="flex items-center justify-between">
              <p class="text-sm font-semibold text-gray-700">Senarai Aduan</p>
              <UButton icon="i-lucide-plus" color="neutral" size="xs" label="Buat Aduan" />
            </div>
          </template>
          <UTable :data="data" :columns="columns">
            <template #status-cell="{ row }">
              <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
            </template>
          </UTable>
        </UCard>
      </div>
      <UCard>
        <template #header><p class="text-sm font-semibold text-gray-700">Pecahan Kategori Aduan</p></template>
        <ClientOnly>
          <apexchart type="donut" height="250" :options="chartOptions" :series="chartSeries" />
          <template #fallback><div class="h-[250px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
    </div>
  </div>
</template>
