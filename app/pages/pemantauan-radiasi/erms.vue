<script setup lang="ts">
definePageMeta({ title: 'ERMS' })

const chartOptions = computed(() => ({
  chart: { type: 'heatmap' as const, height: 300, toolbar: { show: false } },
  colors: ['#10b981'],
  dataLabels: { enabled: false },
  xaxis: { categories: ['Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab', 'Ahd'] },
  plotOptions: { heatmap: { colorScale: { ranges: [
    { from: 0, to: 0.05, name: 'Rendah', color: '#d1fae5' },
    { from: 0.05, to: 0.10, name: 'Normal', color: '#6ee7b7' },
    { from: 0.10, to: 0.15, name: 'Sederhana', color: '#f59e0b' },
    { from: 0.15, to: 0.25, name: 'Tinggi', color: '#ef4444' }
  ] } } }
}))
const chartSeries = ref([
  { name: 'Minggu 4', data: [0.08, 0.09, 0.07, 0.08, 0.10, 0.06, 0.07] },
  { name: 'Minggu 3', data: [0.07, 0.08, 0.09, 0.07, 0.08, 0.05, 0.06] },
  { name: 'Minggu 2', data: [0.09, 0.10, 0.08, 0.09, 0.11, 0.07, 0.08] },
  { name: 'Minggu 1', data: [0.08, 0.07, 0.08, 0.08, 0.09, 0.06, 0.07] }
])

const alerts = ref([
  { masa: '22/02/2026 08:15', stesen: 'STN-03', mesej: 'Bacaan melebihi 0.10 μSv/h (0.12)', tahap: 'info' },
  { masa: '20/02/2026 14:30', stesen: 'STN-05', mesej: 'Sensor tidak responsif - perlu penyelenggaraan', tahap: 'warning' },
  { masa: '18/02/2026 09:00', stesen: 'STN-01', mesej: 'Kalibrasi tahunan telah selesai', tahap: 'success' }
])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Environmental Radiation Monitoring System (ERMS)</h2>
      <p class="text-sm text-gray-500">Paparan data pemantauan radiasi persekitaran secara automatik</p>
    </div>
    <UCard>
      <template #header><p class="text-sm font-semibold text-gray-700">Peta Haba Bacaan Mingguan (μSv/h)</p></template>
      <ClientOnly>
        <apexchart type="heatmap" height="300" :options="chartOptions" :series="chartSeries" />
        <template #fallback><div class="h-[300px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
      </ClientOnly>
    </UCard>
    <UCard>
      <template #header><p class="text-sm font-semibold text-gray-700">Amaran & Notifikasi Terkini</p></template>
      <div class="space-y-2">
        <div v-for="(a, i) in alerts" :key="i" class="flex items-start gap-3 p-3 rounded-md" :class="a.tahap === 'warning' ? 'bg-amber-50' : a.tahap === 'success' ? 'bg-green-50' : 'bg-blue-50'">
          <UIcon :name="a.tahap === 'warning' ? 'i-lucide-alert-triangle' : a.tahap === 'success' ? 'i-lucide-check-circle' : 'i-lucide-info'" class="w-4 h-4 mt-0.5 shrink-0" :class="a.tahap === 'warning' ? 'text-amber-500' : a.tahap === 'success' ? 'text-green-500' : 'text-blue-500'" />
          <div>
            <p class="text-xs text-gray-800">{{ a.mesej }}</p>
            <p class="text-xs text-gray-500 mt-0.5">{{ a.stesen }} &middot; {{ a.masa }}</p>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
