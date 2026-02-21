<script setup lang="ts">
definePageMeta({ title: 'Kewangan' })

const stats = ref([
  { label: 'Jumlah Kutipan (2026)', value: 'RM 1.24M', icon: 'i-lucide-banknote', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Belum Bayar', value: 'RM 85,200', icon: 'i-lucide-clock', color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Invois Dikeluarkan', value: 234, icon: 'i-lucide-receipt', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Tertunggak', value: 8, icon: 'i-lucide-alert-triangle', color: 'text-red-600', bg: 'bg-red-50' }
])

const columns = [
  { accessorKey: 'noInvois', header: 'No. Invois' },
  { accessorKey: 'syarikat', header: 'Syarikat' },
  { accessorKey: 'jenis', header: 'Jenis' },
  { accessorKey: 'jumlah', header: 'Jumlah (RM)' },
  { accessorKey: 'tarikh', header: 'Tarikh' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { noInvois: 'INV-2026-0234', syarikat: 'Syarikat Atom Sdn Bhd', jenis: 'Fi Lesen', jumlah: '5,000.00', tarikh: '01/02/2026', status: 'Telah Bayar' },
  { noInvois: 'INV-2026-0233', syarikat: 'Radiasi Teknik Sdn Bhd', jenis: 'Fi Permohonan', jumlah: '2,500.00', tarikh: '28/01/2026', status: 'Telah Bayar' },
  { noInvois: 'INV-2026-0232', syarikat: 'Perubatan Nuklear KL', jenis: 'Fi Lesen', jumlah: '8,000.00', tarikh: '25/01/2026', status: 'Belum Bayar' },
  { noInvois: 'INV-2026-0231', syarikat: 'Gamma Industrial', jenis: 'Fi Pembaharuan', jumlah: '3,500.00', tarikh: '20/01/2026', status: 'Telah Bayar' },
  { noInvois: 'INV-2026-0230', syarikat: 'MediRad Diagnostik', jenis: 'Fi Lesen', jumlah: '5,000.00', tarikh: '15/01/2026', status: 'Belum Bayar' },
  { noInvois: 'INV-2025-0198', syarikat: 'Isotop Malaysia Bhd', jenis: 'Fi Permohonan', jumlah: '2,500.00', tarikh: '10/12/2025', status: 'Tertunggak' }
])

const statusColour: Record<string, string> = { 'Telah Bayar': 'success', 'Belum Bayar': 'warning', Tertunggak: 'error' }

const revenueOptions = computed(() => ({
  chart: { type: 'area' as const, height: 280, toolbar: { show: false } },
  colors: ['#10b981'],
  stroke: { curve: 'smooth' as const, width: 2 },
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } },
  xaxis: { categories: ['Sep', 'Okt', 'Nov', 'Dis', 'Jan', 'Feb'] },
  yaxis: { labels: { formatter: (v: number) => 'RM ' + (v / 1000).toFixed(0) + 'K' } },
  dataLabels: { enabled: false }
}))
const revenueSeries = ref([{ name: 'Kutipan (RM)', data: [185000, 210000, 195000, 230000, 245000, 175000] }])

const breakdownOptions = computed(() => ({
  chart: { type: 'pie' as const, height: 280 },
  labels: ['Fi Lesen', 'Fi Permohonan', 'Fi Pembaharuan', 'Fi Peperiksaan', 'Lain-lain'],
  colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#6b7280'],
  legend: { position: 'bottom' as const, fontSize: '11px' }
}))
const breakdownSeries = ref([520000, 310000, 245000, 98000, 67000])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Kewangan</h2>
      <p class="text-sm text-gray-500">Pengurusan invois, kutipan fi dan jaminan kewangan</p>
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

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <UCard class="lg:col-span-3">
        <template #header><p class="text-sm font-semibold text-gray-700">Trend Kutipan (6 Bulan)</p></template>
        <ClientOnly>
          <apexchart type="area" height="280" :options="revenueOptions" :series="revenueSeries" />
          <template #fallback><div class="h-[280px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
      <UCard class="lg:col-span-2">
        <template #header><p class="text-sm font-semibold text-gray-700">Pecahan Jenis Fi</p></template>
        <ClientOnly>
          <apexchart type="pie" height="280" :options="breakdownOptions" :series="breakdownSeries" />
          <template #fallback><div class="h-[280px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
    </div>

    <UCard :ui="{ body: 'p-0' }">
      <template #header><p class="text-sm font-semibold text-gray-700">Senarai Invois Terkini</p></template>
      <UTable :data="data" :columns="columns">
        <template #status-cell="{ row }">
          <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
