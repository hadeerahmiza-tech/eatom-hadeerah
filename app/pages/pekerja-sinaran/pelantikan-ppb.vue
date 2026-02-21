<script setup lang="ts">
definePageMeta({ title: 'Pelantikan PPB' })

const stats = ref([
  { label: 'PPB Aktif', value: 312, icon: 'i-lucide-user-check', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Pelantikan Baru (2026)', value: 24, icon: 'i-lucide-user-plus', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Tamat Tempoh', value: 8, icon: 'i-lucide-alert-triangle', color: 'text-red-600', bg: 'bg-red-50' }
])

const columns = [
  { accessorKey: 'noPPB', header: 'No. PPB' },
  { accessorKey: 'nama', header: 'Nama' },
  { accessorKey: 'syarikat', header: 'Syarikat' },
  { accessorKey: 'kategori', header: 'Kategori' },
  { accessorKey: 'tarikhLantik', header: 'Tarikh Lantik' },
  { accessorKey: 'tarikhTamat', header: 'Tarikh Tamat' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { noPPB: 'PPB-2025-001', nama: 'Dr. Ahmad Faisal', syarikat: 'Syarikat Atom Sdn Bhd', kategori: 'Kategori A', tarikhLantik: '01/01/2025', tarikhTamat: '31/12/2027', status: 'Aktif' },
  { noPPB: 'PPB-2025-002', nama: 'Ir. Tan Soon Huat', syarikat: 'Radiasi Teknik Sdn Bhd', kategori: 'Kategori B', tarikhLantik: '15/03/2025', tarikhTamat: '14/03/2028', status: 'Aktif' },
  { noPPB: 'PPB-2025-003', nama: 'Dr. Nurul Ain', syarikat: 'Perubatan Nuklear KL', kategori: 'Kategori A', tarikhLantik: '01/06/2025', tarikhTamat: '31/05/2028', status: 'Aktif' },
  { noPPB: 'PPB-2023-045', nama: 'Mohd Rizal', syarikat: 'MediRad Diagnostik', kategori: 'Kategori B', tarikhLantik: '01/04/2023', tarikhTamat: '31/03/2026', status: 'Hampir Tamat' },
  { noPPB: 'PPB-2026-001', nama: 'Lee Chong Wei', syarikat: 'SinarTech Engineering', kategori: 'Kategori B', tarikhLantik: '-', tarikhTamat: '-', status: 'Dalam Proses' }
])

const statusColour: Record<string, string> = { Aktif: 'success', 'Hampir Tamat': 'error', 'Dalam Proses': 'warning' }
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Pelantikan Pegawai Perlindungan Bahagian (PPB)</h2>
      <p class="text-sm text-gray-500">Pengurusan pelantikan dan rekod PPB</p>
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
      <template #header><p class="text-sm font-semibold text-gray-700">Senarai PPB</p></template>
      <UTable :data="data" :columns="columns">
        <template #status-cell="{ row }">
          <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
