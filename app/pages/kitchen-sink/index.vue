<script setup lang="ts">
definePageMeta({ title: 'Kitchen Sink' })

const open = ref(false)
const openSlideover = ref(false)
const collapsibleOpen = ref(false)
const toast = useToast()

const tableData = [
  { id: 1, name: 'Ahmad Admin', email: 'admin@eatom.gov.my', role: 'ADMIN', status: 'aktif' },
  { id: 2, name: 'Siti Semakan', email: 'ps@eatom.gov.my', role: 'PS', status: 'aktif' },
  { id: 3, name: 'Kamal Ketua', email: 'ku@eatom.gov.my', role: 'KU', status: 'aktif' },
  { id: 4, name: 'Pengarah', email: 'p@eatom.gov.my', role: 'P', status: 'tidak aktif' }
]
const columns = [
  { accessorKey: 'name', header: 'Nama' },
  { accessorKey: 'email', header: 'E-mel' },
  { accessorKey: 'role', header: 'Peranan' },
  { accessorKey: 'status', header: 'Status' }
]
const formState = reactive({ name: '', email: '', role: '', textarea: '' })
const selectOptions = [
  { label: 'ADMIN', value: 'ADMIN' },
  { label: 'PS — Pegawai Semakan', value: 'PS' },
  { label: 'KU — Ketua Unit', value: 'KU' },
  { label: 'PL — Pemegang Lesen', value: 'PL' }
]

// Tabs
const tabItems = [
  { label: 'Maklumat', slot: 'maklumat' as const },
  { label: 'Dokumen', slot: 'dokumen' as const },
  { label: 'Status', slot: 'status' as const }
]

// Accordion
const accordionItems = [
  { label: 'Apakah itu eATOM?', content: 'eATOM adalah sistem pengurusan maklumat atom untuk JTA Malaysia yang merangkumi perlesenan, pemantauan radiasi dan pengurusan dokumen.' },
  { label: 'Siapakah pengguna sistem?', content: 'Pengguna terdiri daripada pegawai dalaman (PS, KU, P, KP, ADMIN) dan pihak luar (Pemegang Lesen, Orang Awam).' },
  { label: 'Bagaimana proses permohonan lesen?', content: 'Pemegang Lesen mengemukakan permohonan → PS menyemak → KU meluluskan → Pengarah mengesahkan.' }
]

// Dropdown
const dropdownItems = [
  [
    { label: 'Lihat', icon: 'i-lucide-eye' },
    { label: 'Edit', icon: 'i-lucide-edit' }
  ],
  [
    { label: 'Padam', icon: 'i-lucide-trash' }
  ]
]

// Breadcrumb
const breadcrumbItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Perlesenan', to: '/perlesenan' },
  { label: 'Permohonan Lesen' }
]

// Pagination
const page = ref(1)

// Switch / Slider
const switchVal = ref(false)
const switchVal2 = ref(true)
const sliderVal = ref(40)

// InputMenu
const inputMenuVal = ref(null)
const inputMenuOptions = [
  { label: 'Selangor' },
  { label: 'Kuala Lumpur' },
  { label: 'Johor Bahru' },
  { label: 'Pulau Pinang' },
  { label: 'Kota Kinabalu' },
  { label: 'Kuching' }
]

// Pin Input
const pinVal = ref([])
</script>

<template>
  <div class="space-y-10 max-w-4xl">
    <div>
      <h2 class="text-lg font-semibold text-gray-900">Kitchen Sink</h2>
      <p class="text-sm text-gray-500 mt-1">Rujukan komponen Nuxt UI v3 yang digunakan dalam sistem ini.</p>
    </div>

    <!-- Typography -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Typography</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5 space-y-2">
        <p class="text-2xl font-bold text-gray-900">Heading 2xl Bold</p>
        <p class="text-lg font-semibold text-gray-900">Heading lg Semibold</p>
        <p class="text-base font-medium text-gray-800">Body base Medium</p>
        <p class="text-sm text-gray-600">Body sm — teks biasa paragraph kandungan sistem.</p>
        <p class="text-xs text-gray-500">Caption xs — label, metadata, nota kaki.</p>
        <code class="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">monospace code</code>
      </div>
    </section>

    <!-- Buttons -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Buttons</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
        <div class="flex flex-wrap gap-2">
          <UButton color="neutral" variant="solid">Solid</UButton>
          <UButton color="neutral" variant="outline">Outline</UButton>
          <UButton color="neutral" variant="soft">Soft</UButton>
          <UButton color="neutral" variant="ghost">Ghost</UButton>
          <UButton color="neutral" variant="link">Link</UButton>
        </div>
        <div class="flex flex-wrap gap-2">
          <UButton color="neutral" size="xl">XL</UButton>
          <UButton color="neutral" size="lg">LG</UButton>
          <UButton color="neutral" size="md">MD</UButton>
          <UButton color="neutral" size="sm">SM</UButton>
          <UButton color="neutral" size="xs">XS</UButton>
        </div>
        <div class="flex flex-wrap gap-2">
          <UButton color="neutral" icon="i-lucide-plus">Dengan Ikon</UButton>
          <UButton color="neutral" icon="i-lucide-download" variant="outline">Muat Turun</UButton>
          <UButton color="neutral" icon="i-lucide-trash" variant="ghost" />
          <UButton color="neutral" :loading="true">Loading</UButton>
          <UButton color="neutral" disabled>Disabled</UButton>
        </div>
      </div>
    </section>

    <!-- Badges -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Badges</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5">
        <div class="flex flex-wrap gap-2">
          <UBadge color="neutral" variant="solid">Neutral</UBadge>
          <UBadge color="neutral" variant="outline">Outline</UBadge>
          <UBadge color="neutral" variant="soft">Soft</UBadge>
          <UBadge color="success" variant="soft">Diluluskan</UBadge>
          <UBadge color="warning" variant="soft">Semakan</UBadge>
          <UBadge color="error" variant="soft">Ditolak</UBadge>
          <UBadge color="info" variant="soft">Baru</UBadge>
        </div>
      </div>
    </section>

    <!-- Alerts -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Alerts</h3>
      <div class="space-y-2">
        <UAlert color="neutral" variant="soft" icon="i-lucide-info" title="Maklumat" description="Ini adalah mesej maklumat biasa untuk pengguna." />
        <UAlert color="success" variant="soft" icon="i-lucide-check-circle" title="Berjaya" description="Permohonan telah berjaya dikemukakan." />
        <UAlert color="warning" variant="soft" icon="i-lucide-triangle-alert" title="Amaran" description="Sila lengkapkan semua medan yang diperlukan." />
        <UAlert color="error" variant="soft" icon="i-lucide-x-circle" title="Ralat" description="Permohonan gagal. Sila cuba semula." />
      </div>
    </section>

    <!-- Form Fields -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Form Fields</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Nama Penuh" required>
            <UInput v-model="formState.name" placeholder="Masukkan nama penuh" class="w-full" />
          </UFormField>
          <UFormField label="E-mel">
            <UInput v-model="formState.email" type="email" placeholder="nama@eatom.gov.my" class="w-full" />
          </UFormField>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Input dengan ikon">
            <UInput placeholder="Cari..." icon="i-lucide-search" class="w-full" />
          </UFormField>
          <UFormField label="Input dengan trailing">
            <UInput placeholder="0.00" trailing-icon="i-lucide-dollar-sign" class="w-full" />
          </UFormField>
        </div>
        <UFormField label="Peranan">
          <USelect v-model="formState.role" :items="selectOptions" placeholder="Pilih peranan" class="w-full" />
        </UFormField>
        <UFormField label="Catatan">
          <UTextarea v-model="formState.textarea" placeholder="Masukkan catatan..." :rows="3" class="w-full" />
        </UFormField>
        <UFormField label="Pilihan">
          <div class="flex gap-4">
            <UCheckbox label="Aktif" />
            <UCheckbox label="Disahkan" />
            <URadioGroup :items="[{ label: 'Lelaki', value: 'L' }, { label: 'Perempuan', value: 'P' }]" />
          </div>
        </UFormField>
      </div>
    </section>

    <!-- Switch & Slider -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Switch & Slider</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5 space-y-5">
        <div class="flex flex-wrap gap-6 items-center">
          <USwitch v-model="switchVal" label="Tidak aktif / Aktif" />
          <USwitch v-model="switchVal2" label="Dibolehkan" />
          <USwitch v-model="switchVal" label="Disabled" disabled />
        </div>
        <div class="space-y-1">
          <p class="text-xs text-gray-500">Slider — nilai: {{ sliderVal }}</p>
          <USlider v-model="sliderVal" :min="0" :max="100" class="w-full max-w-xs" />
        </div>
      </div>
    </section>

    <!-- Tabs -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tabs</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5">
        <UTabs :items="tabItems">
          <template #maklumat>
            <p class="text-sm text-gray-600 py-3">Maklumat am permohonan — nombor rujukan, tarikh, jenis permohonan dan maklumat syarikat pemohon.</p>
          </template>
          <template #dokumen>
            <p class="text-sm text-gray-600 py-3">Senarai dokumen sokongan yang telah dimuat naik oleh pemohon untuk semakan pegawai.</p>
          </template>
          <template #status>
            <p class="text-sm text-gray-600 py-3">Sejarah status permohonan dari draf hingga keputusan akhir diluluskan atau ditolak.</p>
          </template>
        </UTabs>
      </div>
    </section>

    <!-- Accordion -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Accordion</h3>
      <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <UAccordion :items="accordionItems" />
      </div>
    </section>

    <!-- Collapsible -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Collapsible</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5">
        <UCollapsible v-model:open="collapsibleOpen">
          <UButton color="neutral" variant="outline" :trailing-icon="collapsibleOpen ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'">
            {{ collapsibleOpen ? 'Sembunyikan' : 'Tunjukkan' }} maklumat lanjut
          </UButton>
          <template #content>
            <div class="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
              Kandungan tersembunyi ini akan muncul apabila pengguna klik butang di atas. Berguna untuk nota tambahan atau maklumat kontekstual yang tidak perlu sentiasa ditunjukkan.
            </div>
          </template>
        </UCollapsible>
      </div>
    </section>

    <!-- Dropdown Menu -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dropdown Menu</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5 flex gap-3 flex-wrap">
        <UDropdownMenu :items="dropdownItems">
          <UButton color="neutral" variant="outline" trailing-icon="i-lucide-chevron-down">Tindakan</UButton>
        </UDropdownMenu>
        <UDropdownMenu :items="dropdownItems">
          <UButton color="neutral" variant="ghost" icon="i-lucide-more-horizontal" />
        </UDropdownMenu>
      </div>
    </section>

    <!-- Tooltip & Popover & Kbd -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tooltip, Popover & Kbd</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5 flex flex-wrap gap-4 items-center">
        <UTooltip text="Log keluar dari sistem">
          <UButton color="neutral" variant="outline" icon="i-lucide-log-out">Log Keluar</UButton>
        </UTooltip>
        <UTooltip text="Muat turun laporan PDF">
          <UButton color="neutral" variant="ghost" icon="i-lucide-download" />
        </UTooltip>
        <UPopover>
          <UButton color="neutral" variant="outline">Buka Popover</UButton>
          <template #content>
            <div class="p-3 text-sm text-gray-600 max-w-xs">
              <p class="font-medium text-gray-900 mb-1">Maklumat Tambahan</p>
              <p>Ini adalah popover dengan kandungan bebas. Boleh diisi dengan form kecil atau nota ringkas.</p>
            </div>
          </template>
        </UPopover>
        <div class="flex items-center gap-1 text-sm text-gray-500">
          <span>Cari:</span>
          <UKbd>⌘</UKbd>
          <UKbd>K</UKbd>
        </div>
        <div class="flex items-center gap-1 text-sm text-gray-500">
          <span>Simpan:</span>
          <UKbd>Ctrl</UKbd>
          <UKbd>S</UKbd>
        </div>
      </div>
    </section>

    <!-- Breadcrumb -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Breadcrumb</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5">
        <UBreadcrumb :items="breadcrumbItems" />
      </div>
    </section>

    <!-- Avatar & Chip -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Avatar, Avatar Group & Chip</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5 flex flex-wrap gap-6 items-center">
        <div class="flex gap-2 items-center">
          <UAvatar alt="Ahmad Admin" size="xl" />
          <UAvatar alt="Siti Semakan" size="lg" />
          <UAvatar alt="Kamal Ketua" size="md" />
          <UAvatar alt="Pengarah" size="sm" />
          <UAvatar alt="KP" size="xs" />
        </div>
        <UAvatarGroup
          :items="[
            { alt: 'Ahmad Admin' },
            { alt: 'Siti Semakan' },
            { alt: 'Kamal Ketua' },
            { alt: 'Pengarah' }
          ]"
          size="sm"
        />
        <div class="flex gap-3 items-center">
          <UChip text="3" color="error">
            <UButton color="neutral" variant="outline" icon="i-lucide-bell" />
          </UChip>
          <UChip text="12" color="warning">
            <UButton color="neutral" variant="outline" icon="i-lucide-inbox" />
          </UChip>
          <UChip color="success" inset>
            <UAvatar alt="Online User" size="md" />
          </UChip>
        </div>
      </div>
    </section>

    <!-- InputMenu -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Input Menu (Combobox)</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5">
        <div class="max-w-xs">
          <UFormField label="Negeri">
            <UInputMenu v-model="inputMenuVal" :items="inputMenuOptions" placeholder="Taip atau pilih negeri..." class="w-full" />
          </UFormField>
        </div>
      </div>
    </section>

    <!-- Pin Input -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pin Input (OTP)</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
        <UFormField label="Masukkan Kod OTP">
          <UPinInput v-model="pinVal" :length="6" placeholder="○" />
        </UFormField>
        <p class="text-xs text-gray-500">Nilai: {{ pinVal.join('') || '—' }}</p>
      </div>
    </section>

    <!-- Pagination -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pagination</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
        <UPagination v-model:page="page" :total="100" :items-per-page="10" />
        <p class="text-xs text-gray-500">Halaman semasa: {{ page }}</p>
      </div>
    </section>

    <!-- Skeleton -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Skeleton (Loading State)</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
        <div class="flex items-center gap-3">
          <USkeleton class="w-10 h-10 rounded-full shrink-0" />
          <div class="flex-1 space-y-2">
            <USkeleton class="h-4 w-48" />
            <USkeleton class="h-3 w-32" />
          </div>
        </div>
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-3/4" />
        <USkeleton class="h-4 w-1/2" />
        <div class="grid grid-cols-3 gap-3">
          <USkeleton class="h-20 rounded-lg" />
          <USkeleton class="h-20 rounded-lg" />
          <USkeleton class="h-20 rounded-lg" />
        </div>
      </div>
    </section>

    <!-- Cards -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cards</h3>
      <div class="grid grid-cols-3 gap-3">
        <UCard>
          <template #header><p class="font-medium text-sm">Default Card</p></template>
          <p class="text-sm text-gray-500">Kandungan kad dengan header dan footer.</p>
          <template #footer><UButton size="xs" color="neutral" variant="outline">Tindakan</UButton></template>
        </UCard>
        <UCard class="border-gray-300">
          <div class="text-center py-2">
            <p class="text-2xl font-bold text-gray-900">247</p>
            <p class="text-xs text-gray-500 mt-1">Jumlah Permohonan</p>
          </div>
        </UCard>
        <UCard>
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-lg bg-gray-100">
              <UIcon name="i-lucide-file-text" class="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">Stat Card</p>
              <p class="text-xs text-gray-500">Dengan ikon</p>
            </div>
          </div>
        </UCard>
      </div>
    </section>

    <!-- Table -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Table</h3>
      <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <UTable :data="tableData" :columns="columns">
          <template #status-cell="{ row }">
            <UBadge
              :color="row.original.status === 'aktif' ? 'success' : 'neutral'"
              variant="soft"
              size="sm"
            >
              {{ row.original.status }}
            </UBadge>
          </template>
        </UTable>
      </div>
    </section>

    <!-- Modal & Toast & Slideover -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Modal, Toast & Slideover</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5 flex gap-3 flex-wrap">
        <UButton color="neutral" variant="outline" @click="open = true">Buka Modal</UButton>
        <UButton color="neutral" variant="outline" @click="openSlideover = true">Buka Slideover</UButton>
        <UButton color="neutral" variant="outline" @click="toast.add({ title: 'Berjaya!', description: 'Rekod telah disimpan.', color: 'success' })">
          Toast Berjaya
        </UButton>
        <UButton color="neutral" variant="outline" @click="toast.add({ title: 'Ralat', description: 'Gagal menyimpan rekod.', color: 'error' })">
          Toast Ralat
        </UButton>
        <UButton color="neutral" variant="outline" @click="toast.add({ title: 'Amaran', description: 'Data belum disimpan.', color: 'warning' })">
          Toast Amaran
        </UButton>
      </div>
    </section>

    <!-- Separator & Progress -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Separator & Progress</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
        <USeparator label="atau" />
        <div class="space-y-2">
          <div class="flex justify-between text-xs text-gray-500">
            <span>Permohonan Diproses</span><span>65%</span>
          </div>
          <UProgress :value="65" />
        </div>
        <div class="space-y-2">
          <div class="flex justify-between text-xs text-gray-500">
            <span>Kapasiti Storan</span><span>30%</span>
          </div>
          <UProgress :value="30" color="neutral" />
        </div>
      </div>
    </section>

    <!-- Icons -->
    <section class="space-y-3">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Icons (Lucide)</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-5">
        <div class="flex flex-wrap gap-4 text-gray-500">
          <div v-for="icon in ['i-lucide-shield-check','i-lucide-users','i-lucide-activity','i-lucide-folder-open','i-lucide-radiation','i-lucide-briefcase','i-lucide-atom','i-lucide-check-circle','i-lucide-x-circle','i-lucide-clock','i-lucide-file-text','i-lucide-download','i-lucide-upload','i-lucide-search','i-lucide-filter','i-lucide-edit','i-lucide-trash','i-lucide-plus','i-lucide-bell','i-lucide-log-out','i-lucide-eye','i-lucide-lock','i-lucide-unlock','i-lucide-user-check','i-lucide-clipboard-list','i-lucide-send','i-lucide-inbox','i-lucide-settings','i-lucide-more-horizontal','i-lucide-chevron-down']" :key="icon" class="flex flex-col items-center gap-1">
            <UIcon :name="icon" class="w-5 h-5" />
            <span class="text-xs text-gray-500">{{ icon.replace('i-lucide-','') }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal component -->
    <UModal v-model:open="open" title="Contoh Modal">
      <template #body>
        <p class="text-sm text-gray-600">Ini adalah contoh modal dialog. Boleh diisi dengan borang atau maklumat tambahan.</p>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton color="neutral" variant="outline" @click="open = false">Batal</UButton>
          <UButton color="neutral" @click="open = false">Sahkan</UButton>
        </div>
      </template>
    </UModal>

    <!-- Slideover component -->
    <USlideover v-model:open="openSlideover" title="Maklumat Lanjut">
      <template #body>
        <div class="space-y-4">
          <p class="text-sm text-gray-600">Ini adalah slideover panel. Berguna untuk borang edit, detail rekod, atau panel navigasi sekunder.</p>
          <UFormField label="Nama">
            <UInput placeholder="Masukkan nama" class="w-full" />
          </UFormField>
          <UFormField label="Status">
            <USelect :items="[{ label: 'Aktif', value: 'aktif' }, { label: 'Tidak Aktif', value: 'tidak_aktif' }]" class="w-full" />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton color="neutral" variant="outline" @click="openSlideover = false">Batal</UButton>
          <UButton color="neutral" @click="openSlideover = false">Simpan</UButton>
        </div>
      </template>
    </USlideover>
  </div>
</template>
