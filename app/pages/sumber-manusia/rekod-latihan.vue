<script setup lang="ts">
definePageMeta({ title: 'Rekod Latihan' })

const columns = [
  { accessorKey: 'nama', header: 'Nama Pegawai' },
  { accessorKey: 'jawatan', header: 'Jawatan' },
  { accessorKey: 'jumlahKursus', header: 'Kursus Hadir' },
  { accessorKey: 'jamLatihan', header: 'Jam Latihan' },
  { accessorKey: 'terakhir', header: 'Kursus Terakhir' },
  { accessorKey: 'tarikhTerakhir', header: 'Tarikh' }
]

const data = ref([
  { nama: 'Siti Semakan', jawatan: 'Pegawai Semakan', jumlahKursus: 12, jamLatihan: 96, terakhir: 'Perlindungan Sinaran Lanjutan', tarikhTerakhir: '12/03/2026' },
  { nama: 'Kamal Ketua', jawatan: 'Ketua Unit', jumlahKursus: 15, jamLatihan: 124, terakhir: 'Leadership Programme', tarikhTerakhir: '05/06/2026' },
  { nama: 'Ahmad Admin', jawatan: 'Pentadbir Sistem', jumlahKursus: 8, jamLatihan: 64, terakhir: 'Pengurusan Sistem ICT', tarikhTerakhir: '16/03/2026' },
  { nama: 'Pengarah Penilaian', jawatan: 'Pengarah', jumlahKursus: 18, jamLatihan: 156, terakhir: 'International Nuclear Safety', tarikhTerakhir: '24/04/2026' },
  { nama: 'Nurul Hafizah', jawatan: 'Pegawai Sains', jumlahKursus: 6, jamLatihan: 48, terakhir: 'Dosimetri Persekitaran', tarikhTerakhir: '20/01/2026' }
])

const chartOptions = computed(() => ({
  chart: { type: 'radar' as const, height: 300, toolbar: { show: false } },
  xaxis: { categories: ['Perlindungan Sinaran', 'Pengurusan', 'Teknikal', 'ICT', 'Kepimpinan', 'Keselamatan'] },
  colors: ['#3b82f6'],
  markers: { size: 4 },
  fill: { opacity: 0.2 }
}))
const chartSeries = ref([{ name: 'Jam Latihan', data: [35, 22, 28, 18, 15, 20] }])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Rekod Latihan</h2>
      <p class="text-sm text-gray-500">Rekod kehadiran kursus dan jam latihan pegawai</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2">
        <UCard :ui="{ body: 'p-0' }">
          <template #header><p class="text-sm font-semibold text-gray-700">Rekod Latihan Pegawai</p></template>
          <UTable :data="data" :columns="columns" />
        </UCard>
      </div>
      <UCard>
        <template #header><p class="text-sm font-semibold text-gray-700">Pecahan Kategori Latihan</p></template>
        <ClientOnly>
          <apexchart type="radar" height="300" :options="chartOptions" :series="chartSeries" />
          <template #fallback><div class="h-[300px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
    </div>
  </div>
</template>
