<script setup lang="ts">
definePageMeta({ title: 'Maklumbalas' })

const columns = [
  { accessorKey: 'noTiket', header: 'No. Tiket' },
  { accessorKey: 'pengirim', header: 'Pengirim' },
  { accessorKey: 'tajuk', header: 'Tajuk' },
  { accessorKey: 'kategori', header: 'Kategori' },
  { accessorKey: 'tarikh', header: 'Tarikh' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { noTiket: 'FB-2026-001', pengirim: 'Mohd Hafiz', tajuk: 'Pertanyaan mengenai sijil PPB', kategori: 'Pertanyaan', tarikh: '18/02/2026', status: 'Selesai' },
  { noTiket: 'FB-2026-002', pengirim: 'Tan Mei Ling', tajuk: 'Permohonan salinan keputusan peperiksaan', kategori: 'Permohonan', tarikh: '19/02/2026', status: 'Dalam Tindakan' },
  { noTiket: 'FB-2026-003', pengirim: 'Ravi Kumar', tajuk: 'Cadangan penambahbaikan sistem pendaftaran', kategori: 'Cadangan', tarikh: '20/02/2026', status: 'Baru' },
  { noTiket: 'FB-2026-004', pengirim: 'Aisyah Ahmad', tajuk: 'Aduan kelewatan proses kelulusan', kategori: 'Aduan', tarikh: '21/02/2026', status: 'Baru' }
])

const statusColour: Record<string, string> = { Selesai: 'success', 'Dalam Tindakan': 'warning', Baru: 'info' }

const chartOptions = computed(() => ({
  chart: { type: 'donut' as const, height: 250 },
  labels: ['Pertanyaan', 'Permohonan', 'Cadangan', 'Aduan'],
  colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
  legend: { position: 'bottom' as const, fontSize: '11px' },
  plotOptions: { pie: { donut: { size: '50%' } } }
}))
const chartSeries = ref([15, 8, 5, 3])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Maklumbalas</h2>
      <p class="text-sm text-gray-500">Pengurusan maklumbalas, pertanyaan dan aduan pekerja sinaran</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2">
        <UCard :ui="{ body: 'p-0' }">
          <template #header><p class="text-sm font-semibold text-gray-700">Senarai Maklumbalas</p></template>
          <UTable :data="data" :columns="columns">
            <template #status-cell="{ row }">
              <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
            </template>
          </UTable>
        </UCard>
      </div>
      <UCard>
        <template #header><p class="text-sm font-semibold text-gray-700">Pecahan Kategori</p></template>
        <ClientOnly>
          <apexchart type="donut" height="250" :options="chartOptions" :series="chartSeries" />
          <template #fallback><div class="h-[250px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
    </div>
  </div>
</template>
