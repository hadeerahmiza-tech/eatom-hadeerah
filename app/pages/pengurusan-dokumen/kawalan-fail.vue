<script setup lang="ts">
definePageMeta({ title: 'Kawalan Fail' })

const columns = [
  { accessorKey: 'noFail', header: 'No. Fail' },
  { accessorKey: 'tajuk', header: 'Tajuk Fail' },
  { accessorKey: 'bahagian', header: 'Bahagian' },
  { accessorKey: 'bilDokumen', header: 'Bil. Dokumen' },
  { accessorKey: 'lokasi', header: 'Lokasi Fizikal' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { noFail: 'JTA/BPP/100-1', tajuk: 'Fail Permohonan Lesen Am', bahagian: 'BPP', bilDokumen: 245, lokasi: 'Bilik Fail BPP - Rak A1', status: 'Aktif' },
  { noFail: 'JTA/BPP/100-2', tajuk: 'Fail Kelulusan Lesen', bahagian: 'BPP', bilDokumen: 189, lokasi: 'Bilik Fail BPP - Rak A2', status: 'Aktif' },
  { noFail: 'JTA/BKP/200-1', tajuk: 'Fail Kebenaran Import/Eksport', bahagian: 'BKP', bilDokumen: 78, lokasi: 'Bilik Fail BKP - Rak B1', status: 'Aktif' },
  { noFail: 'JTA/BPR/300-1', tajuk: 'Fail Pemantauan Radiasi', bahagian: 'BPR', bilDokumen: 312, lokasi: 'Bilik Fail BPR - Rak C1', status: 'Aktif' },
  { noFail: 'JTA/BPP/100-3', tajuk: 'Fail Kawalselia & Pemeriksaan', bahagian: 'BPP', bilDokumen: 156, lokasi: 'Bilik Fail BPP - Rak A3', status: 'Aktif' },
  { noFail: 'JTA/ADM/400-1', tajuk: 'Fail Pentadbiran Am', bahagian: 'Pentadbiran', bilDokumen: 98, lokasi: 'Bilik Fail Admin - Rak D1', status: 'Arkib' }
])

const statusColour: Record<string, string> = { Aktif: 'success', Arkib: 'neutral' }
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Kawalan Fail</h2>
      <p class="text-sm text-gray-500">Pengurusan dan penjejakan fail fizikal organisasi</p>
    </div>
    <UCard :ui="{ body: 'p-0' }">
      <template #header><p class="text-sm font-semibold text-gray-700">Senarai Fail</p></template>
      <UTable :data="data" :columns="columns">
        <template #status-cell="{ row }">
          <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
