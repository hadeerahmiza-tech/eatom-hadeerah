<script setup lang="ts">
definePageMeta({ title: 'Media Kreatif' })

const stats = ref([
  { label: 'Projek Aktif', value: 6, icon: 'i-lucide-palette', color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Selesai (2026)', value: 14, icon: 'i-lucide-check-circle', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Permohonan Baru', value: 3, icon: 'i-lucide-file-plus', color: 'text-blue-600', bg: 'bg-blue-50' }
])

const columns = [
  { accessorKey: 'noPermohonan', header: 'No. Permohonan' },
  { accessorKey: 'pemohon', header: 'Pemohon' },
  { accessorKey: 'jenis', header: 'Jenis' },
  { accessorKey: 'tajuk', header: 'Tajuk/Penerangan' },
  { accessorKey: 'tarikhPerlu', header: 'Tarikh Perlu' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { noPermohonan: 'MK-2026-014', pemohon: 'BPP', jenis: 'Banner', tajuk: 'Banner Hari Kualiti 2026', tarikhPerlu: '01/03/2026', status: 'Dalam Proses' },
  { noPermohonan: 'MK-2026-013', pemohon: 'BPR', jenis: 'Infografik', tajuk: 'Infografik Keselamatan Sinaran', tarikhPerlu: '28/02/2026', status: 'Dalam Proses' },
  { noPermohonan: 'MK-2026-012', pemohon: 'Pengarah', jenis: 'Video', tajuk: 'Video Korporat JTA 2026', tarikhPerlu: '15/03/2026', status: 'Dalam Proses' },
  { noPermohonan: 'MK-2026-011', pemohon: 'BPP', jenis: 'Brosur', tajuk: 'Brosur Panduan Permohonan Lesen', tarikhPerlu: '15/02/2026', status: 'Selesai' },
  { noPermohonan: 'MK-2026-010', pemohon: 'Pentadbiran', jenis: 'Poster', tajuk: 'Poster Keselamatan Pejabat', tarikhPerlu: '10/02/2026', status: 'Selesai' }
])

const statusColour: Record<string, string> = { 'Dalam Proses': 'warning', Selesai: 'success', Baru: 'info' }
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Media Kreatif</h2>
      <p class="text-sm text-gray-500">Permohonan reka bentuk grafik, video dan bahan kreatif</p>
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
          <p class="text-sm font-semibold text-gray-700">Senarai Permohonan</p>
          <UButton icon="i-lucide-plus" color="neutral" size="xs" label="Permohonan Baru" />
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
