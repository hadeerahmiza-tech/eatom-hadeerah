<script setup lang="ts">
definePageMeta({ title: 'Pendaftaran Sumber Sinaran' })

const stats = ref([
  { label: 'Jumlah Sumber Berdaftar', value: 247, icon: 'i-lucide-database', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Pendaftaran Baru (Bulan Ini)', value: 8, icon: 'i-lucide-plus-circle', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Menunggu Pengesahan', value: 3, icon: 'i-lucide-clock', color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Tamat Tempoh', value: 12, icon: 'i-lucide-alert-triangle', color: 'text-red-600', bg: 'bg-red-50' }
])

const columns = [
  { accessorKey: 'noSiri', header: 'No. Siri' },
  { accessorKey: 'jenisSumber', header: 'Jenis Sumber' },
  { accessorKey: 'nuklida', header: 'Nuklida' },
  { accessorKey: 'aktiviti', header: 'Aktiviti (GBq)' },
  { accessorKey: 'lokasi', header: 'Lokasi' },
  { accessorKey: 'pemilik', header: 'Pemilik' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { noSiri: 'SS-2025-0001', jenisSumber: 'Sealed Source', nuklida: 'Cs-137', aktiviti: '3.7', lokasi: 'Hospital Serdang', pemilik: 'Syarikat Atom Sdn Bhd', status: 'Aktif' },
  { noSiri: 'SS-2025-0002', jenisSumber: 'X-Ray Generator', nuklida: '-', aktiviti: '-', lokasi: 'Klinik PNK, KL', pemilik: 'Perubatan Nuklear KL', status: 'Aktif' },
  { noSiri: 'SS-2025-0003', jenisSumber: 'Sealed Source', nuklida: 'Co-60', aktiviti: '185.0', lokasi: 'Kilang Gebeng', pemilik: 'Radiasi Teknik Sdn Bhd', status: 'Aktif' },
  { noSiri: 'SS-2025-0004', jenisSumber: 'Sealed Source', nuklida: 'Ir-192', aktiviti: '1.85', lokasi: 'Kompleks Senai', pemilik: 'Gamma Industrial Services', status: 'Menunggu' },
  { noSiri: 'SS-2025-0005', jenisSumber: 'Linear Accelerator', nuklida: '-', aktiviti: '-', lokasi: 'MediRad Centre, Penang', pemilik: 'MediRad Diagnostik', status: 'Aktif' },
  { noSiri: 'SS-2024-0198', jenisSumber: 'Sealed Source', nuklida: 'Am-241', aktiviti: '0.37', lokasi: 'Makmal Isotop, Cyberjaya', pemilik: 'Isotop Malaysia Bhd', status: 'Tamat Tempoh' },
  { noSiri: 'SS-2024-0145', jenisSumber: 'X-Ray Generator', nuklida: '-', aktiviti: '-', lokasi: 'Klinik Butterworth', pemilik: 'MediRad Diagnostik', status: 'Aktif' }
])

const statusColour: Record<string, string> = { Aktif: 'success', 'Menunggu': 'warning', 'Tamat Tempoh': 'error' }

const chartOptions = computed(() => ({
  chart: { type: 'pie' as const, height: 260 },
  labels: ['Sealed Source', 'X-Ray Generator', 'Linear Accelerator', 'Lain-lain'],
  colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
  legend: { position: 'bottom' as const, fontSize: '11px' },
  dataLabels: { enabled: true, formatter: (val: number) => val.toFixed(0) + '%' }
}))
const chartSeries = ref([142, 78, 15, 12])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Pendaftaran Sumber Sinaran</h2>
      <p class="text-sm text-gray-500">Pengurusan pendaftaran sumber sinaran mengion dan peralatan</p>
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
          <template #header>
            <div class="flex items-center justify-between">
              <p class="text-sm font-semibold text-gray-700">Senarai Sumber Berdaftar</p>
              <UButton icon="i-lucide-plus" color="neutral" size="xs" label="Daftar Baru" />
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
        <template #header><p class="text-sm font-semibold text-gray-700">Pecahan Jenis Sumber</p></template>
        <ClientOnly>
          <apexchart type="pie" height="260" :options="chartOptions" :series="chartSeries" />
          <template #fallback><div class="h-[260px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
    </div>
  </div>
</template>
