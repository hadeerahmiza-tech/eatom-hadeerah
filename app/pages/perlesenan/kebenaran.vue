<script setup lang="ts">
definePageMeta({ title: 'Kebenaran' })

const stats = ref([
  { label: 'Kebenaran Aktif', value: 34, icon: 'i-lucide-stamp', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Permohonan Baru', value: 5, icon: 'i-lucide-file-plus', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Dalam Proses', value: 3, icon: 'i-lucide-clock', color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Tamat Tempoh', value: 2, icon: 'i-lucide-alert-triangle', color: 'text-red-600', bg: 'bg-red-50' }
])

const columns = [
  { accessorKey: 'noKebenaran', header: 'No. Kebenaran' },
  { accessorKey: 'jenisKebenaran', header: 'Jenis' },
  { accessorKey: 'syarikat', header: 'Syarikat' },
  { accessorKey: 'tarikhMula', header: 'Tarikh Mula' },
  { accessorKey: 'tarikhTamat', header: 'Tarikh Tamat' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { noKebenaran: 'KB-2025-001', jenisKebenaran: 'Import Sumber', syarikat: 'Syarikat Atom Sdn Bhd', tarikhMula: '01/01/2025', tarikhTamat: '31/12/2025', status: 'Aktif' },
  { noKebenaran: 'KB-2025-002', jenisKebenaran: 'Eksport Sumber', syarikat: 'Radiasi Teknik Sdn Bhd', tarikhMula: '15/02/2025', tarikhTamat: '14/02/2026', status: 'Aktif' },
  { noKebenaran: 'KB-2025-003', jenisKebenaran: 'Transit Bahan Radioaktif', syarikat: 'Gamma Industrial', tarikhMula: '01/03/2025', tarikhTamat: '28/02/2026', status: 'Aktif' },
  { noKebenaran: 'KB-2025-004', jenisKebenaran: 'Pengangkutan', syarikat: 'SinarTech Engineering', tarikhMula: '-', tarikhTamat: '-', status: 'Dalam Proses' },
  { noKebenaran: 'KB-2024-089', jenisKebenaran: 'Import Sumber', syarikat: 'MediRad Diagnostik', tarikhMula: '01/06/2024', tarikhTamat: '31/05/2025', status: 'Hampir Tamat' },
  { noKebenaran: 'KB-2025-005', jenisKebenaran: 'Pelupusan Sumber', syarikat: 'Isotop Malaysia Bhd', tarikhMula: '-', tarikhTamat: '-', status: 'Permohonan Baru' }
])

const statusColour: Record<string, string> = { Aktif: 'success', 'Dalam Proses': 'warning', 'Hampir Tamat': 'error', 'Permohonan Baru': 'info' }

const chartOptions = computed(() => ({
  chart: { type: 'bar' as const, height: 260, toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 4, horizontal: true } },
  colors: ['#6366f1'],
  xaxis: { categories: ['Import', 'Eksport', 'Transit', 'Pengangkutan', 'Pelupusan'] },
  dataLabels: { enabled: true },
  tooltip: { enabled: false }
}))
const chartSeries = ref([{ name: 'Kebenaran', data: [14, 8, 5, 4, 3] }])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Kebenaran</h2>
      <p class="text-sm text-gray-500">Pengurusan kebenaran import, eksport, transit dan pengangkutan bahan radioaktif</p>
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

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2">
        <UCard :ui="{ body: 'p-0' }">
          <template #header><p class="text-sm font-semibold text-gray-700">Senarai Kebenaran</p></template>
          <UTable :data="data" :columns="columns">
            <template #status-cell="{ row }">
              <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
            </template>
          </UTable>
        </UCard>
      </div>
      <UCard>
        <template #header><p class="text-sm font-semibold text-gray-700">Kebenaran Mengikut Jenis</p></template>
        <ClientOnly>
          <apexchart type="bar" height="260" :options="chartOptions" :series="chartSeries" />
          <template #fallback><div class="h-[260px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
    </div>
  </div>
</template>
