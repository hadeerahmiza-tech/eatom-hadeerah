<script setup lang="ts">
definePageMeta({ title: 'Pengurusan Surat' })

const columns = [
  { accessorKey: 'noSurat', header: 'No. Surat' },
  { accessorKey: 'tajuk', header: 'Tajuk' },
  { accessorKey: 'jenis', header: 'Jenis' },
  { accessorKey: 'penerima', header: 'Penerima/Pengirim' },
  { accessorKey: 'tarikh', header: 'Tarikh' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { noSurat: 'JTA/BPP/100-3/1/2026(1)', tajuk: 'Kelulusan Lesen - Syarikat Atom', jenis: 'Keluar', penerima: 'Syarikat Atom Sdn Bhd', tarikh: '17/01/2026', status: 'Dihantar' },
  { noSurat: 'JTA/BPP/100-3/1/2026(2)', tajuk: 'Notis Pemeriksaan Tapak', jenis: 'Keluar', penerima: 'Radiasi Teknik Sdn Bhd', tarikh: '20/01/2026', status: 'Dihantar' },
  { noSurat: 'JTA/BKP/200-1/2026(3)', tajuk: 'Permohonan Import Sumber', jenis: 'Masuk', penerima: 'SinarTech Engineering', tarikh: '15/02/2026', status: 'Diterima' },
  { noSurat: 'JTA/BPP/100-3/1/2026(4)', tajuk: 'Surat Penolakan - MediRad', jenis: 'Keluar', penerima: 'MediRad Diagnostik', tarikh: '18/02/2026', status: 'Draf' },
  { noSurat: 'JTA/BPR/300-2/2026(1)', tajuk: 'Laporan Insiden Radiasi', jenis: 'Masuk', penerima: 'Gamma Industrial', tarikh: '10/02/2026', status: 'Diterima' }
])

const statusColour: Record<string, string> = { Dihantar: 'success', Diterima: 'info', Draf: 'warning' }
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Pengurusan Surat</h2>
      <p class="text-sm text-gray-500">Pengurusan surat masuk dan keluar organisasi</p>
    </div>
    <UCard :ui="{ body: 'p-0' }">
      <template #header>
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-gray-700">Senarai Surat</p>
          <UButton icon="i-lucide-plus" color="neutral" size="xs" label="Daftar Surat Baru" />
        </div>
      </template>
      <UTable :data="data" :columns="columns">
        <template #jenis-cell="{ row }">
          <UBadge :color="row.original.jenis === 'Masuk' ? 'info' : 'neutral'" variant="soft" size="xs">{{ row.original.jenis }}</UBadge>
        </template>
        <template #status-cell="{ row }">
          <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
