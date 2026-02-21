<script setup lang="ts">
definePageMeta({ title: 'Tempahan Bilik' })

const rooms = ref([
  { nama: 'Bilik Mesyuarat Utama', kapasiti: 30, peralatan: 'Projektor, Skrin, Video Conference', status: 'Tersedia' },
  { nama: 'Bilik Mesyuarat 1', kapasiti: 15, peralatan: 'Projektor, Whiteboard', status: 'Sedang Digunakan' },
  { nama: 'Bilik Mesyuarat 2', kapasiti: 10, peralatan: 'TV Skrin, Whiteboard', status: 'Tersedia' },
  { nama: 'Bilik Seminar', kapasiti: 50, peralatan: 'PA System, Projektor, Podium', status: 'Tersedia' },
  { nama: 'Dewan Serbaguna', kapasiti: 200, peralatan: 'PA System, Projektor, Pentas', status: 'Tersedia' },
  { nama: 'Bilik Latihan ICT', kapasiti: 20, peralatan: '20 PC, Projektor, Printer', status: 'Penyelenggaraan' }
])

const bookings = ref([
  { bilik: 'Bilik Mesyuarat 1', pemohon: 'Kamal Ketua', tajuk: 'Mesyuarat Perlesenan', tarikh: '22/02/2026', masa: '10:00 - 12:00', status: 'Aktif' },
  { bilik: 'Bilik Mesyuarat Utama', pemohon: 'Pengarah Penilaian', tajuk: 'Mesyuarat Pengurusan', tarikh: '25/02/2026', masa: '9:00 - 11:00', status: 'Disahkan' },
  { bilik: 'Bilik Seminar', pemohon: 'Siti Semakan', tajuk: 'Bengkel Keselamatan Sinaran', tarikh: '01/03/2026', masa: '9:00 - 17:00', status: 'Disahkan' },
  { bilik: 'Dewan Serbaguna', pemohon: 'Ahmad Admin', tajuk: 'Ceramah Bulanan', tarikh: '05/03/2026', masa: '14:30 - 16:30', status: 'Menunggu' }
])

const bookingColumns = [
  { accessorKey: 'bilik', header: 'Bilik' },
  { accessorKey: 'pemohon', header: 'Pemohon' },
  { accessorKey: 'tajuk', header: 'Tajuk' },
  { accessorKey: 'tarikh', header: 'Tarikh' },
  { accessorKey: 'masa', header: 'Masa' },
  { accessorKey: 'status', header: 'Status' }
]

const roomColour: Record<string, string> = { Tersedia: 'success', 'Sedang Digunakan': 'warning', Penyelenggaraan: 'error' }
const statusColour: Record<string, string> = { Aktif: 'success', Disahkan: 'info', Menunggu: 'warning' }
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Tempahan Bilik</h2>
      <p class="text-sm text-gray-500">Sistem tempahan bilik mesyuarat dan kemudahan</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
      <UCard v-for="r in rooms" :key="r.nama">
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <p class="text-sm font-semibold text-gray-900">{{ r.nama }}</p>
            <UBadge :color="roomColour[r.status] ?? 'neutral'" variant="soft" size="xs">{{ r.status }}</UBadge>
          </div>
          <p class="text-xs text-gray-500">Kapasiti: {{ r.kapasiti }} orang</p>
          <p class="text-xs text-gray-400">{{ r.peralatan }}</p>
        </div>
      </UCard>
    </div>
    <UCard :ui="{ body: 'p-0' }">
      <template #header>
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-gray-700">Tempahan Terkini</p>
          <UButton icon="i-lucide-plus" color="neutral" size="xs" label="Tempah Bilik" />
        </div>
      </template>
      <UTable :data="bookings" :columns="bookingColumns">
        <template #status-cell="{ row }">
          <UBadge :color="statusColour[row.original.status] ?? 'neutral'" variant="soft" size="sm">{{ row.original.status }}</UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
