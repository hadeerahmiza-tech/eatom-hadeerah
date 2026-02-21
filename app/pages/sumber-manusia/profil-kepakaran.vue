<script setup lang="ts">
definePageMeta({ title: 'Profil Kepakaran' })

const profiles = ref([
  { nama: 'Siti Semakan', jawatan: 'Pegawai Semakan', kepakaran: ['Perlindungan Sinaran', 'Dosimetri', 'QA/QC'], kelayakan: 'M.Sc. Fizik Perubatan', pengalaman: '8 tahun' },
  { nama: 'Kamal Ketua', jawatan: 'Ketua Unit Perlesenan', kepakaran: ['Pengurusan Lesen', 'Kawalselia', 'Keselamatan Nuklear'], kelayakan: 'M.Sc. Sains Nuklear', pengalaman: '12 tahun' },
  { nama: 'Pengarah Penilaian', jawatan: 'Pengarah BPP', kepakaran: ['Polisi Nuklear', 'Pengurusan Strategik', 'Hubungan Antarabangsa'], kelayakan: 'Ph.D. Fizik Nuklear', pengalaman: '20 tahun' },
  { nama: 'Nurul Hafizah', jawatan: 'Pegawai Sains', kepakaran: ['Pemantauan Radiasi', 'Persampelan Alam Sekitar', 'ERMS'], kelayakan: 'B.Sc. Sains Persekitaran', pengalaman: '4 tahun' },
  { nama: 'Mohd Rizal', jawatan: 'Pegawai Fizik', kepakaran: ['Radioterapi', 'Fizik Perubatan', 'Kalibrasi'], kelayakan: 'M.Sc. Fizik Perubatan', pengalaman: '6 tahun' },
  { nama: 'Dr. Lim Wei', jawatan: 'Pakar Perunding', kepakaran: ['Keselamatan Sinaran', 'Penilaian Risiko', 'Dekomisioning'], kelayakan: 'Ph.D. Kejuruteraan Nuklear', pengalaman: '15 tahun' }
])

const chartOptions = computed(() => ({
  chart: { type: 'bar' as const, height: 260, toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 4, horizontal: true } },
  colors: ['#6366f1'],
  xaxis: { categories: ['Perlindungan Sinaran', 'Pengurusan', 'Dosimetri', 'Kawalselia', 'Fizik Perubatan', 'Pemantauan'] },
  dataLabels: { enabled: true },
  tooltip: { enabled: false }
}))
const chartSeries = ref([{ name: 'Pakar', data: [5, 4, 3, 3, 2, 2] }])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Profil Kepakaran</h2>
      <p class="text-sm text-gray-500">Direktori kepakaran dan kelayakan pegawai</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <UCard v-for="p in profiles" :key="p.nama">
            <div class="space-y-2">
              <div class="flex items-center gap-3">
                <UAvatar :alt="p.nama" size="sm" />
                <div>
                  <p class="text-sm font-semibold text-gray-900">{{ p.nama }}</p>
                  <p class="text-xs text-gray-500">{{ p.jawatan }}</p>
                </div>
              </div>
              <div class="text-xs text-gray-600"><span class="font-medium">Kelayakan:</span> {{ p.kelayakan }}</div>
              <div class="text-xs text-gray-600"><span class="font-medium">Pengalaman:</span> {{ p.pengalaman }}</div>
              <div class="flex flex-wrap gap-1">
                <UBadge v-for="k in p.kepakaran" :key="k" color="neutral" variant="subtle" size="xs">{{ k }}</UBadge>
              </div>
            </div>
          </UCard>
        </div>
      </div>
      <UCard>
        <template #header><p class="text-sm font-semibold text-gray-700">Pecahan Kepakaran</p></template>
        <ClientOnly>
          <apexchart type="bar" height="260" :options="chartOptions" :series="chartSeries" />
          <template #fallback><div class="h-[260px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
    </div>
  </div>
</template>
