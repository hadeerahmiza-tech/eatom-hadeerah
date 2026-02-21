<script setup lang="ts">
definePageMeta({ title: 'Mesyuarat' })

const stats = ref([
  { label: 'Jumlah Mesyuarat (2026)', value: 18, icon: 'i-lucide-presentation', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Akan Datang', value: 3, icon: 'i-lucide-calendar-plus', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Minit Belum Sedia', value: 2, icon: 'i-lucide-file-warning', color: 'text-amber-600', bg: 'bg-amber-50' }
])

const columns = [
  { accessorKey: 'tajuk', header: 'Tajuk Mesyuarat' },
  { accessorKey: 'tarikh', header: 'Tarikh' },
  { accessorKey: 'masa', header: 'Masa' },
  { accessorKey: 'lokasi', header: 'Lokasi' },
  { accessorKey: 'pengerusi', header: 'Pengerusi' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { tajuk: 'Mesyuarat Jawatankuasa Perlesenan Bil. 1/2026', tarikh: '05/03/2026', masa: '9:00 AM', lokasi: 'Bilik Mesyuarat Utama', pengerusi: 'Pengarah Penilaian', status: 'Akan Datang' },
  { tajuk: 'Mesyuarat Pengurusan BPP Bil. 2/2026', tarikh: '12/03/2026', masa: '2:30 PM', lokasi: 'Bilik Mesyuarat 2', pengerusi: 'Kamal Ketua', status: 'Akan Datang' },
  { tajuk: 'Mesyuarat Teknikal Kawalselia', tarikh: '20/02/2026', masa: '10:00 AM', lokasi: 'Bilik Mesyuarat 1', pengerusi: 'Kamal Ketua', status: 'Minit Belum Sedia' },
  { tajuk: 'Mesyuarat Jawatankuasa Perlesenan Bil. 12/2025', tarikh: '15/02/2026', masa: '9:00 AM', lokasi: 'Bilik Mesyuarat Utama', pengerusi: 'Pengarah Penilaian', status: 'Selesai' },
  { tajuk: 'Mesyuarat Pengurusan BPP Bil. 1/2026', tarikh: '08/02/2026', masa: '2:30 PM', lokasi: 'Bilik Mesyuarat 2', pengerusi: 'Kamal Ketua', status: 'Selesai' },
  { tajuk: 'Mesyuarat Khas: Isu Pematuhan 2025', tarikh: '28/01/2026', masa: '10:00 AM', lokasi: 'Bilik Mesyuarat Utama', pengerusi: 'Pengarah Penilaian', status: 'Selesai' }
])

const statusColour: Record<string, string> = { 'Akan Datang': 'info', 'Minit Belum Sedia': 'warning', Selesai: 'success' }
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Mesyuarat</h2>
      <p class="text-sm text-gray-500">Pengurusan mesyuarat, agenda dan minit mesyuarat</p>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
      <UCard v-for="s in stats" :key="s.label">
        <div class="flex items-start gap-3">
          <div class="p-2 rounded-lg" :class="s.bg"><UIcon :name="s.icon" class="w-4 h-4" :class="s.color" /></div>
          <div><p class="text-2xl font-bold text-gray-900 leading-none">{{ s.value }}</p><p class="text-xs text-gray-500 mt-1">{{ s.label }}</p></div>
        </div>
      </UCard>
    </div>
    <UCard :ui="{ body: 'p-0' }">
      <template #header>
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-gray-700">Senarai Mesyuarat</p>
          <UButton icon="i-lucide-plus" color="neutral" size="xs" label="Jadual Mesyuarat Baru" />
        </div>
      </template>
      <UTable :data="data" :columns="columns">
        <template #status-cell="{ row }">
          <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
