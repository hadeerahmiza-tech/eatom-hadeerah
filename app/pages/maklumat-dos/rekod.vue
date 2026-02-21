<script setup lang="ts">
definePageMeta({ title: 'Rekod Dos Kebangsaan' })

const stats = ref([
  { label: 'Pekerja Sinaran Dipantau', value: 4823, icon: 'i-lucide-users', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Purata Dos Tahunan', value: '1.2 mSv', icon: 'i-lucide-activity', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Melebihi Had Siasatan', value: 18, icon: 'i-lucide-alert-triangle', color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Melebihi Had Dos', value: 0, icon: 'i-lucide-shield-check', color: 'text-green-600', bg: 'bg-green-50' }
])

const columns = [
  { accessorKey: 'noPekerja', header: 'No. Pekerja' },
  { accessorKey: 'nama', header: 'Nama' },
  { accessorKey: 'syarikat', header: 'Syarikat' },
  { accessorKey: 'dosQ1', header: 'Q1 (mSv)' },
  { accessorKey: 'dosQ2', header: 'Q2 (mSv)' },
  { accessorKey: 'dosQ3', header: 'Q3 (mSv)' },
  { accessorKey: 'dosQ4', header: 'Q4 (mSv)' },
  { accessorKey: 'jumlah', header: 'Jumlah (mSv)' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { noPekerja: 'RW-001234', nama: 'Ahmad bin Hassan', syarikat: 'Syarikat Atom', dosQ1: '0.32', dosQ2: '0.28', dosQ3: '0.45', dosQ4: '0.35', jumlah: '1.40', status: 'Normal' },
  { noPekerja: 'RW-001235', nama: 'Siti Fatimah', syarikat: 'Perubatan Nuklear KL', dosQ1: '0.85', dosQ2: '0.92', dosQ3: '0.78', dosQ4: '0.88', jumlah: '3.43', status: 'Siasatan' },
  { noPekerja: 'RW-001236', nama: 'Lee Ming Hao', syarikat: 'Radiasi Teknik', dosQ1: '0.15', dosQ2: '0.22', dosQ3: '0.18', dosQ4: '0.20', jumlah: '0.75', status: 'Normal' },
  { noPekerja: 'RW-001237', nama: 'Muthu a/l Raman', syarikat: 'Gamma Industrial', dosQ1: '0.55', dosQ2: '0.48', dosQ3: '0.62', dosQ4: '0.51', jumlah: '2.16', status: 'Normal' },
  { noPekerja: 'RW-001238', nama: 'Nurul Ain binti Zainal', syarikat: 'MediRad Diagnostik', dosQ1: '0.42', dosQ2: '0.38', dosQ3: '0.35', dosQ4: '0.40', jumlah: '1.55', status: 'Normal' }
])

const statusColour: Record<string, string> = { Normal: 'success', Siasatan: 'warning', 'Melebihi Had': 'error' }

const trendOptions = computed(() => ({
  chart: { type: 'line' as const, height: 280, toolbar: { show: false } },
  colors: ['#3b82f6', '#ef4444'],
  stroke: { width: 2, curve: 'smooth' as const },
  xaxis: { categories: ['2020', '2021', '2022', '2023', '2024', '2025'] },
  yaxis: { title: { text: 'mSv' } },
  legend: { position: 'top' as const, fontSize: '11px' },
  dataLabels: { enabled: false },
  annotations: { yaxis: [{ y: 20, borderColor: '#ef4444', label: { text: 'Had Dos (20 mSv)', style: { fontSize: '10px' } } }] }
}))
const trendSeries = ref([
  { name: 'Purata Dos', data: [1.35, 1.28, 1.42, 1.15, 1.22, 1.20] },
  { name: 'Maksimum', data: [8.5, 7.2, 9.1, 6.8, 7.5, 5.2] }
])

const distOptions = computed(() => ({
  chart: { type: 'bar' as const, height: 280, toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } },
  colors: ['#6366f1'],
  xaxis: { categories: ['<0.5', '0.5-1', '1-2', '2-5', '5-10', '10-20', '>20'], title: { text: 'Julat Dos (mSv)' } },
  yaxis: { title: { text: 'Bil. Pekerja' } },
  dataLabels: { enabled: true },
  tooltip: { enabled: false }
}))
const distSeries = ref([{ name: 'Pekerja', data: [1820, 1245, 985, 612, 142, 19, 0] }])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Rekod Dos Kebangsaan</h2>
      <p class="text-sm text-gray-500">Pangkalan data dos sinaran pekerja sinaran seluruh negara</p>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <UCard v-for="s in stats" :key="s.label">
        <div class="flex items-start gap-3">
          <div class="p-2 rounded-lg" :class="s.bg"><UIcon :name="s.icon" class="w-4 h-4" :class="s.color" /></div>
          <div><p class="text-2xl font-bold text-gray-900 leading-none">{{ s.value }}</p><p class="text-xs text-gray-500 mt-1">{{ s.label }}</p></div>
        </div>
      </UCard>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <UCard>
        <template #header><p class="text-sm font-semibold text-gray-700">Trend Dos Tahunan</p></template>
        <ClientOnly>
          <apexchart type="line" height="280" :options="trendOptions" :series="trendSeries" />
          <template #fallback><div class="h-[280px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
      <UCard>
        <template #header><p class="text-sm font-semibold text-gray-700">Taburan Dos Pekerja (2025)</p></template>
        <ClientOnly>
          <apexchart type="bar" height="280" :options="distOptions" :series="distSeries" />
          <template #fallback><div class="h-[280px] flex items-center justify-center text-gray-400 text-sm">Memuatkan...</div></template>
        </ClientOnly>
      </UCard>
    </div>
    <UCard :ui="{ body: 'p-0' }">
      <template #header><p class="text-sm font-semibold text-gray-700">Rekod Dos Individu (Sampel)</p></template>
      <UTable :data="data" :columns="columns">
        <template #status-cell="{ row }">
          <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
