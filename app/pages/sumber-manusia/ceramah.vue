<script setup lang="ts">
definePageMeta({ title: 'Ceramah' })

const columns = [
  { accessorKey: 'tajuk', header: 'Tajuk Ceramah' },
  { accessorKey: 'penceramah', header: 'Penceramah' },
  { accessorKey: 'tarikh', header: 'Tarikh' },
  { accessorKey: 'lokasi', header: 'Lokasi' },
  { accessorKey: 'kehadiran', header: 'Kehadiran' },
  { accessorKey: 'status', header: 'Status' }
]

const data = ref([
  { tajuk: 'Kesedaran Keselamatan Sinaran 2026', penceramah: 'Dr. Lim Wei', tarikh: '15/03/2026', lokasi: 'Dewan Serbaguna JTA', kehadiran: '-', status: 'Akan Datang' },
  { tajuk: 'Perkembangan Teknologi Nuklear', penceramah: 'Prof. Ahmad Zaki', tarikh: '28/02/2026', lokasi: 'Bilik Seminar', kehadiran: '45', status: 'Selesai' },
  { tajuk: 'Pengurusan Sisa Radioaktif', penceramah: 'Kamal Ketua', tarikh: '14/02/2026', lokasi: 'Dewan Serbaguna JTA', kehadiran: '62', status: 'Selesai' },
  { tajuk: 'Peranan IAEA dalam Keselamatan Nuklear', penceramah: 'Pengarah Penilaian', tarikh: '30/01/2026', lokasi: 'Bilik Seminar', kehadiran: '38', status: 'Selesai' },
  { tajuk: 'Aplikasi AI dalam Pemantauan Radiasi', penceramah: 'Dr. Nurul Ain', tarikh: '20/04/2026', lokasi: 'Dalam Talian (Webinar)', kehadiran: '-', status: 'Akan Datang' }
])

const statusColour: Record<string, string> = { 'Akan Datang': 'info', Selesai: 'success' }
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Ceramah</h2>
      <p class="text-sm text-gray-500">Pengurusan siri ceramah dan perkongsian ilmu</p>
    </div>
    <UCard :ui="{ body: 'p-0' }">
      <template #header>
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-gray-700">Senarai Ceramah</p>
          <UButton icon="i-lucide-plus" color="neutral" size="xs" label="Jadual Ceramah Baru" />
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
