<script setup lang="ts">
definePageMeta({ title: 'Mesyuarat Dokumen' })

const columns = [
  { accessorKey: 'tajuk', header: 'Tajuk Mesyuarat' },
  { accessorKey: 'tarikh', header: 'Tarikh' },
  { accessorKey: 'bilAgenda', header: 'Bil. Agenda' },
  { accessorKey: 'kehadiran', header: 'Kehadiran' },
  { accessorKey: 'statusMinit', header: 'Status Minit' }
]

const data = ref([
  { tajuk: 'Mesyuarat Semakan Pengurusan (MSP) Bil. 1/2026', tarikh: '15/01/2026', bilAgenda: 8, kehadiran: '12/15', statusMinit: 'Diedarkan' },
  { tajuk: 'Mesyuarat Jawatankuasa ISO Bil. 1/2026', tarikh: '28/01/2026', bilAgenda: 5, kehadiran: '8/10', statusMinit: 'Diedarkan' },
  { tajuk: 'Mesyuarat Audit Dalaman Bil. 1/2026', tarikh: '10/02/2026', bilAgenda: 6, kehadiran: '6/8', statusMinit: 'Dalam Penyediaan' },
  { tajuk: 'Mesyuarat Jawatankuasa ISO Bil. 2/2026', tarikh: '10/03/2026', bilAgenda: '-', kehadiran: '-', statusMinit: 'Belum Bermula' }
])

const statusColour: Record<string, string> = { Diedarkan: 'success', 'Dalam Penyediaan': 'warning', 'Belum Bermula': 'neutral' }
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Mesyuarat (Pengurusan Dokumen)</h2>
      <p class="text-sm text-gray-500">Pengurusan mesyuarat berkaitan sistem pengurusan kualiti</p>
    </div>
    <UCard :ui="{ body: 'p-0' }">
      <template #header><p class="text-sm font-semibold text-gray-700">Senarai Mesyuarat</p></template>
      <UTable :data="data" :columns="columns">
        <template #statusMinit-cell="{ row }">
          <UBadge :color="statusColour[row.original.statusMinit] ?? 'neutral'" variant="soft" size="sm">{{ row.original.statusMinit }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
