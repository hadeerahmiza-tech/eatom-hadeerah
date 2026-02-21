<script setup lang="ts">
definePageMeta({ title: 'Dokumen Panduan' })

const documents = ref([
  { nama: 'Garis Panduan Keselamatan Sinaran (GP-01)', kategori: 'Keselamatan', versi: 'v3.2', tarikh: '15/01/2026', saiz: '2.4 MB' },
  { nama: 'Prosedur Operasi Standard - Pemeriksaan (SOP-KS-01)', kategori: 'Kawalselia', versi: 'v2.1', tarikh: '10/12/2025', saiz: '1.8 MB' },
  { nama: 'Manual Pengurusan Perlesenan', kategori: 'Perlesenan', versi: 'v4.0', tarikh: '01/01/2026', saiz: '5.2 MB' },
  { nama: 'Panduan Pengendalian Kecemasan Sinaran', kategori: 'Kecemasan', versi: 'v2.0', tarikh: '20/11/2025', saiz: '3.1 MB' },
  { nama: 'Kod Amalan Pengangkutan Bahan Radioaktif', kategori: 'Pengangkutan', versi: 'v1.5', tarikh: '05/10/2025', saiz: '1.2 MB' },
  { nama: 'Garis Panduan Pemantauan Dos Pekerja', kategori: 'Dosimetri', versi: 'v2.3', tarikh: '15/09/2025', saiz: '1.5 MB' },
  { nama: 'Manual Sistem Pengurusan Kualiti ISO 9001', kategori: 'ISO', versi: 'v5.0', tarikh: '01/01/2026', saiz: '4.8 MB' },
  { nama: 'Panduan Penggunaan Sistem eATOM', kategori: 'ICT', versi: 'v1.0', tarikh: '01/02/2026', saiz: '2.0 MB' }
])

const columns = [
  { accessorKey: 'nama', header: 'Nama Dokumen' },
  { accessorKey: 'kategori', header: 'Kategori' },
  { accessorKey: 'versi', header: 'Versi' },
  { accessorKey: 'tarikh', header: 'Tarikh Kemaskini' },
  { accessorKey: 'saiz', header: 'Saiz' },
  { id: 'actions', header: '' }
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold text-gray-900">Dokumen Panduan</h2>
      <p class="text-sm text-gray-500">Repositori garis panduan, SOP dan manual rujukan</p>
    </div>
    <UCard :ui="{ body: 'p-0' }">
      <template #header>
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-gray-700">Senarai Dokumen</p>
          <UButton icon="i-lucide-upload" color="neutral" size="xs" label="Muat Naik" />
        </div>
      </template>
      <UTable :data="documents" :columns="columns">
        <template #kategori-cell="{ row }">
          <UBadge color="neutral" variant="subtle" size="xs">{{ row.original.kategori }}</UBadge>
        </template>
        <template #actions-cell>
          <UButton icon="i-lucide-download" color="neutral" variant="ghost" size="xs" label="Muat Turun" />
        </template>
      </UTable>
    </UCard>
  </div>
</template>
