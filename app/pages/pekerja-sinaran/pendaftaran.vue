<script setup lang="ts">
definePageMeta({ title: 'Pendaftaran Peperiksaan' })

const stats = ref([
  { label: 'Calon Berdaftar', value: 48, icon: 'i-lucide-user-plus', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Sesi Akan Datang', value: 2, icon: 'i-lucide-calendar', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Menunggu Pengesahan', value: 12, icon: 'i-lucide-clock', color: 'text-amber-600', bg: 'bg-amber-50' }
])

const columns = [
  { accessorKey: 'noPendaftaran', header: 'No. Pendaftaran' },
  { accessorKey: 'nama', header: 'Nama Calon' },
  { accessorKey: 'syarikat', header: 'Syarikat' },
  { accessorKey: 'jenisPeperiksaan', header: 'Peperiksaan' },
  { accessorKey: 'sesi', header: 'Sesi' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { noPendaftaran: 'REG-2026-001', nama: 'Mohd Hafiz bin Razak', syarikat: 'Syarikat Atom Sdn Bhd', jenisPeperiksaan: 'PPB Asas', sesi: 'Mac 2026', status: 'Disahkan' },
  { noPendaftaran: 'REG-2026-002', nama: 'Tan Mei Ling', syarikat: 'MediRad Diagnostik', jenisPeperiksaan: 'PPB Lanjutan', sesi: 'Mac 2026', status: 'Disahkan' },
  { noPendaftaran: 'REG-2026-003', nama: 'Ravi a/l Kumar', syarikat: 'Gamma Industrial', jenisPeperiksaan: 'Pengendali Sinaran', sesi: 'Mac 2026', status: 'Menunggu' },
  { noPendaftaran: 'REG-2026-004', nama: 'Aisyah binti Ahmad', syarikat: 'SinarTech Engineering', jenisPeperiksaan: 'PPB Asas', sesi: 'Jun 2026', status: 'Menunggu' },
  { noPendaftaran: 'REG-2026-005', nama: 'Wong Jia Wei', syarikat: 'Isotop Malaysia Bhd', jenisPeperiksaan: 'PPB Asas', sesi: 'Jun 2026', status: 'Menunggu' }
])

const statusColour: Record<string, string> = { Disahkan: 'success', Menunggu: 'warning', Ditolak: 'error' }
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Pendaftaran Peperiksaan</h2>
      <p class="text-sm text-gray-500">Pengurusan pendaftaran calon peperiksaan PPB dan pengendali sinaran</p>
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
          <p class="text-sm font-semibold text-gray-700">Senarai Pendaftaran</p>
          <UButton icon="i-lucide-plus" color="neutral" size="xs" label="Daftar Calon Baru" />
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
