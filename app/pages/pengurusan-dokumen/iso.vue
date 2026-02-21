<script setup lang="ts">
definePageMeta({ title: 'Dokumen ISO' })

const columns = [
  { accessorKey: 'noDoc', header: 'No. Dokumen' },
  { accessorKey: 'tajuk', header: 'Tajuk' },
  { accessorKey: 'jenis', header: 'Jenis' },
  { accessorKey: 'versi', header: 'Versi' },
  { accessorKey: 'tarikhSemakan', header: 'Tarikh Semakan' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { noDoc: 'QMS-MAN-001', tajuk: 'Manual Kualiti ISO 9001:2015', jenis: 'Manual', versi: 'Rev. 5', tarikhSemakan: '01/01/2026', status: 'Berkuatkuasa' },
  { noDoc: 'QMS-PRO-001', tajuk: 'Prosedur Kawalan Dokumen', jenis: 'Prosedur', versi: 'Rev. 3', tarikhSemakan: '15/12/2025', status: 'Berkuatkuasa' },
  { noDoc: 'QMS-PRO-002', tajuk: 'Prosedur Audit Dalaman', jenis: 'Prosedur', versi: 'Rev. 4', tarikhSemakan: '01/01/2026', status: 'Berkuatkuasa' },
  { noDoc: 'QMS-PRO-003', tajuk: 'Prosedur Tindakan Pembetulan', jenis: 'Prosedur', versi: 'Rev. 2', tarikhSemakan: '10/11/2025', status: 'Berkuatkuasa' },
  { noDoc: 'QMS-WI-001', tajuk: 'Arahan Kerja Pemprosesan Lesen', jenis: 'Arahan Kerja', versi: 'Rev. 6', tarikhSemakan: '20/01/2026', status: 'Berkuatkuasa' },
  { noDoc: 'QMS-WI-002', tajuk: 'Arahan Kerja Pemeriksaan Tapak', jenis: 'Arahan Kerja', versi: 'Rev. 3', tarikhSemakan: '05/02/2026', status: 'Dalam Semakan' },
  { noDoc: 'QMS-FRM-001', tajuk: 'Borang Semakan Permohonan', jenis: 'Borang', versi: 'Rev. 8', tarikhSemakan: '01/02/2026', status: 'Berkuatkuasa' }
])

const statusColour: Record<string, string> = { Berkuatkuasa: 'success', 'Dalam Semakan': 'warning', Batal: 'error' }
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Dokumen ISO</h2>
      <p class="text-sm text-gray-500">Sistem pengurusan kualiti ISO 9001 - kawalan dokumen</p>
    </div>
    <UCard :ui="{ body: 'p-0' }">
      <template #header><p class="text-sm font-semibold text-gray-700">Senarai Dokumen ISO</p></template>
      <UTable :data="data" :columns="columns">
        <template #status-cell="{ row }">
          <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
