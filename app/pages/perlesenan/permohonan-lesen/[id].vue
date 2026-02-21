<script setup lang="ts">
definePageMeta({ title: 'Detail Permohonan' })

const route = useRoute()
const { role, hasRole } = useAuthUser()
const toast = useToast()

const { data: permohonan, refresh } = await useFetch(`/api/permohonan/${route.params.id}`)

// --- Mock Data for Documents ---
const dokumenList = ref([
  { id: 1, namaFail: 'Sijil_SSM_2025.pdf', jenisDoc: 'ssm', saizFail: 245000 },
  { id: 2, namaFail: 'Pelan_Tapak_Premis.pdf', jenisDoc: 'pelan_tapak', saizFail: 1200000 },
  { id: 3, namaFail: 'Surat_Sokongan_Pengarah.pdf', jenisDoc: 'surat_sokongan', saizFail: 98000 }
])
const jenisDocLabel: Record<string, string> = {
  ssm: 'Sijil SSM', lesen_sedia_ada: 'Lesen Sedia Ada',
  surat_sokongan: 'Surat Sokongan', pelan_tapak: 'Pelan Tapak', lain_lain: 'Lain-lain'
}
const jenisDocOptions = [
  { label: 'Sijil SSM', value: 'ssm' },
  { label: 'Lesen Sedia Ada', value: 'lesen_sedia_ada' },
  { label: 'Surat Sokongan', value: 'surat_sokongan' },
  { label: 'Pelan Tapak', value: 'pelan_tapak' },
  { label: 'Lain-lain', value: 'lain_lain' }
]
const jenisDocUpload = ref('lain_lain')
const canUploadDoc = computed(() =>
  hasRole('PL', 'ADMIN') && ['draf', 'dikemukakan'].includes(permohonan.value?.status ?? '')
)

function uploadFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  dokumenList.value.push({
    id: Date.now(),
    namaFail: file.name,
    jenisDoc: jenisDocUpload.value,
    saizFail: file.size
  })
  toast.add({ title: 'Berjaya', description: 'Dokumen dimuat naik (mock).', color: 'success' })
  ;(e.target as HTMLInputElement).value = ''
}

function deleteDoc(docId: number) {
  dokumenList.value = dokumenList.value.filter(d => d.id !== docId)
  toast.add({ title: 'Dipadam', description: 'Dokumen dipadam (mock).', color: 'success' })
}

// --- Mock Data for Invoices ---
const invoisList = ref([
  { id: 1, noInvois: 'INV/2026/10001', jenisInvois: 'fee_permohonan', jumlah: 20000, status: 'belum_bayar' },
])
const invoisStatusLabel: Record<string, string> = {
  belum_bayar: 'Belum Bayar', telah_bayar: 'Telah Bayar', disahkan: 'Disahkan', batal: 'Batal'
}
const invoisStatusColor: Record<string, string> = {
  belum_bayar: 'warning', telah_bayar: 'info', disahkan: 'success', batal: 'error'
}

function sahkanInvois(invoisId: number) {
  const inv = invoisList.value.find(i => i.id === invoisId)
  if (inv) inv.status = 'disahkan'
  toast.add({ title: 'Disahkan', description: 'Pembayaran telah disahkan (mock).', color: 'success' })
}
function simulateBayar(invoisId: number) {
  const inv = invoisList.value.find(i => i.id === invoisId)
  if (inv) inv.status = 'telah_bayar'
  toast.add({ title: 'Dibayar', description: 'Pembayaran simulasi berjaya.', color: 'success' })
}

// --- Mock Data for Syarat Lesen ---
const syaratList = ref([
  { id: 1, kodSyarat: 'SL-001', penerangan: 'Pegawai Perlindungan Sinaran (PPS) bertauliah mestilah dilantik sepanjang tempoh sah lesen.', kategori: 'Keselamatan' },
  { id: 2, kodSyarat: 'SL-002', penerangan: 'Semua pekerja sinaran mesti menjalani pemeriksaan perubatan berkala setiap 12 bulan.', kategori: 'Perubatan' },
  { id: 3, kodSyarat: 'SL-003', penerangan: 'Rekod dos sinaran pekerja perlu dikemaskini dan disimpan sekurang-kurangnya 30 tahun.', kategori: 'Penyimpanan' }
])
const showSyaratModal = ref(false)
const syaratForm = reactive({ kodSyarat: '', penerangan: '', kategori: '' })
const canEditSyarat = computed(() =>
  hasRole('PS', 'ADMIN') && permohonan.value?.status === 'semakan_PS'
)

function addSyarat() {
  syaratList.value.push({
    id: Date.now(),
    kodSyarat: syaratForm.kodSyarat || `SL-${String(syaratList.value.length + 1).padStart(3, '0')}`,
    penerangan: syaratForm.penerangan,
    kategori: syaratForm.kategori
  })
  showSyaratModal.value = false
  syaratForm.kodSyarat = ''
  syaratForm.penerangan = ''
  syaratForm.kategori = ''
  toast.add({ title: 'Berjaya', description: 'Syarat lesen ditambah (mock).', color: 'success' })
}

function deleteSyarat(syaratId: number) {
  syaratList.value = syaratList.value.filter(s => s.id !== syaratId)
  toast.add({ title: 'Dipadam', description: 'Syarat lesen dipadam (mock).', color: 'success' })
}

// --- Kategori Kawalan ---
const kategoriKawalanForm = reactive({ kategoriKawalan: '', catatanKategori: '' })
const kategoriLoading = ref(false)
const canSetKategori = computed(() =>
  hasRole('KU', 'ADMIN') && permohonan.value?.status === 'semakan_KU'
)

watch(() => permohonan.value, (p) => {
  if (p) {
    kategoriKawalanForm.kategoriKawalan = (p as Record<string, string>).kategoriKawalan ?? ''
    kategoriKawalanForm.catatanKategori = (p as Record<string, string>).catatanKategori ?? ''
  }
}, { immediate: true })

function saveKategoriKawalan() {
  toast.add({ title: 'Berjaya', description: `Kategori kawalan "${kategoriKawalanForm.kategoriKawalan}" disimpan (mock).`, color: 'success' })
}

// --- Mock Timeline ---
const timeline = computed(() => {
  const events: { id: number; action: string; userName: string; createdAt: unknown }[] = []
  let idx = 1
  if (permohonan.value?.createdAt) {
    events.push({ id: idx++, action: 'CREATE_DRAF', userName: permohonan.value.createdByName as string ?? 'Pemohon', createdAt: permohonan.value.createdAt })
  }
  if (permohonan.value?.submittedAt) {
    events.push({ id: idx++, action: 'SUBMIT_PERMOHONAN', userName: permohonan.value.createdByName as string ?? 'Pemohon', createdAt: permohonan.value.submittedAt })
  }
  const status = permohonan.value?.status
  if (status && !['draf', 'dikemukakan'].includes(status as string)) {
    events.push({ id: idx++, action: 'STATUS_SEMAKAN_PS', userName: 'Pegawai Semakan', createdAt: permohonan.value?.updatedAt })
  }
  if (status && ['lulus_PS', 'semakan_KU', 'diluluskan'].includes(status as string)) {
    events.push({ id: idx++, action: 'STATUS_LULUS_PS', userName: 'Pegawai Semakan', createdAt: permohonan.value?.updatedAt })
  }
  if (status && ['semakan_KU', 'diluluskan'].includes(status as string)) {
    events.push({ id: idx++, action: 'STATUS_SEMAKAN_KU', userName: 'Ketua Unit', createdAt: permohonan.value?.updatedAt })
  }
  if (status === 'diluluskan') {
    events.push({ id: idx++, action: 'STATUS_DILULUSKAN', userName: 'Ketua Unit', createdAt: permohonan.value?.approvedAt ?? permohonan.value?.updatedAt })
  }
  if (status === 'ditolak') {
    events.push({ id: idx++, action: 'STATUS_DITOLAK', userName: 'Pegawai', createdAt: permohonan.value?.updatedAt })
  }
  return events
})

// --- Status/Actions ---
const actionLoading = ref(false)
const showActionModal = ref(false)
const actionType = ref<'lulus' | 'tolak' | null>(null)
const catatan = ref('')

const statusColour: Record<string, string> = {
  draf: 'neutral', dikemukakan: 'info', semakan_PS: 'warning',
  lulus_PS: 'success', semakan_KU: 'warning', diluluskan: 'success', ditolak: 'error'
}
const statusLabel: Record<string, string> = {
  draf: 'Draf', dikemukakan: 'Dikemukakan', semakan_PS: 'Dalam Semakan (PS)',
  lulus_PS: 'Lulus PS', semakan_KU: 'Dalam Semakan (KU)', diluluskan: 'Diluluskan', ditolak: 'Ditolak'
}
const jenisLabel: Record<string, string> = {
  baru: 'Permohonan Baru', pinda: 'Pindaan Lesen', perbaharui: 'Pembaharuan Lesen'
}
const kategoriLesenLabel: Record<string, string> = {
  perubatan: 'Perubatan', industri: 'Industri', penyelidikan: 'Penyelidikan',
  pendidikan: 'Pendidikan', pertanian: 'Pertanian', lain_lain: 'Lain-lain'
}
const timelineActionLabel: Record<string, string> = {
  CREATE_DRAF: 'Draf Dicipta',
  SUBMIT_PERMOHONAN: 'Permohonan Dikemukakan',
  STATUS_SEMAKAN_PS: 'Semakan PS Dimulakan',
  STATUS_LULUS_PS: 'Diluluskan oleh PS',
  STATUS_SEMAKAN_KU: 'Semakan KU Dimulakan',
  STATUS_DILULUSKAN: 'Permohonan Diluluskan',
  STATUS_DITOLAK: 'Permohonan Ditolak'
}
const timelineIcons: Record<string, string> = {
  CREATE_DRAF: 'i-lucide-file-plus',
  SUBMIT_PERMOHONAN: 'i-lucide-send',
  STATUS_SEMAKAN_PS: 'i-lucide-clipboard-check',
  STATUS_LULUS_PS: 'i-lucide-check',
  STATUS_SEMAKAN_KU: 'i-lucide-clipboard-check',
  STATUS_DILULUSKAN: 'i-lucide-check-circle',
  STATUS_DITOLAK: 'i-lucide-x-circle'
}

function formatDate(d: unknown) {
  if (!d) return '-'
  return new Date(Number(d) * 1000).toLocaleString('ms-MY')
}
function formatCurrency(sen: number) {
  return `RM ${(sen / 100).toFixed(2)}`
}

const canSubmitDraf = computed(() =>
  hasRole('PL', 'ADMIN') && permohonan.value?.status === 'draf'
)
const canClaimPS = computed(() =>
  hasRole('PS', 'ADMIN') && permohonan.value?.status === 'dikemukakan'
)
const canActPS = computed(() =>
  hasRole('PS', 'ADMIN') && permohonan.value?.status === 'semakan_PS'
)
const canClaimKU = computed(() =>
  hasRole('KU', 'ADMIN') && permohonan.value?.status === 'lulus_PS'
)
const canActKU = computed(() =>
  hasRole('KU', 'ADMIN') && permohonan.value?.status === 'semakan_KU'
)

function openAction(type: 'lulus' | 'tolak') {
  actionType.value = type
  catatan.value = ''
  showActionModal.value = true
}

async function changeStatus(newStatus: string, successMsg: string) {
  actionLoading.value = true
  try {
    await $fetch(`/api/permohonan/${permohonan.value!.id}/status`, {
      method: 'PATCH',
      body: { status: newStatus, catatan: catatan.value || undefined }
    })
    toast.add({ title: 'Berjaya', description: successMsg, color: 'success' })
    showActionModal.value = false
    await refresh()
  } catch (err: unknown) {
    const e = err as { data?: { statusMessage?: string } }
    toast.add({ title: 'Ralat', description: e.data?.statusMessage ?? 'Sila cuba semula.', color: 'error' })
  } finally {
    actionLoading.value = false
  }
}

async function submitDraf() {
  if (!permohonan.value) return
  await changeStatus('dikemukakan', 'Permohonan telah dikemukakan untuk semakan.')
}

async function claimSemakan() {
  if (!permohonan.value) return
  const status = canClaimPS.value ? 'semakan_PS' : 'semakan_KU'
  const msg = canClaimPS.value ? 'Semakan PS dimulakan.' : 'Semakan KU dimulakan.'
  await changeStatus(status, msg)
}

async function confirmAction() {
  if (!permohonan.value || !actionType.value) return
  let newStatus = ''
  if (canActPS.value) newStatus = actionType.value === 'lulus' ? 'lulus_PS' : 'ditolak'
  if (canActKU.value) newStatus = actionType.value === 'lulus' ? 'diluluskan' : 'ditolak'
  await changeStatus(newStatus, `Status dikemaskini kepada: ${statusLabel[newStatus]}`)
}
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-4" v-if="permohonan">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-3">
        <UButton to="/perlesenan/permohonan-lesen" icon="i-lucide-arrow-left" color="neutral" variant="ghost" />
        <div>
          <h2 class="text-xl font-bold text-gray-900">{{ permohonan.noRujukan }}</h2>
          <div class="flex items-center gap-2 mt-1">
            <UBadge :color="statusColour[permohonan.status] ?? 'neutral'" variant="subtle">
              {{ statusLabel[permohonan.status] ?? permohonan.status }}
            </UBadge>
            <span class="text-sm text-gray-500">{{ permohonan.namaSyarikat }}</span>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flex gap-2">
        <UButton
          v-if="canSubmitDraf"
          :to="`/perlesenan/permohonan-lesen/${permohonan.id}/sunting`"
          icon="i-lucide-pencil"
          color="neutral"
          variant="subtle"
        >
          Sunting Draf
        </UButton>
        <UButton
          v-if="canSubmitDraf"
          icon="i-lucide-send"
          color="neutral"
          :loading="actionLoading"
          @click="submitDraf"
        >
          Kemukakan
        </UButton>
        <UButton
          v-if="canClaimPS || canClaimKU"
          icon="i-lucide-clipboard-check"
          color="warning"
          :loading="actionLoading"
          @click="claimSemakan"
        >
          Mula Semakan
        </UButton>
        <template v-if="canActPS || canActKU">
          <UButton color="error" variant="subtle" icon="i-lucide-x" @click="openAction('tolak')">Tolak</UButton>
          <UButton color="success" icon="i-lucide-check" @click="openAction('lulus')">Lulus</UButton>
        </template>
      </div>
    </div>

    <!-- Maklumat Syarikat -->
    <UCard>
      <template #header>
        <h3 class="font-semibold">Maklumat Syarikat</h3>
      </template>
      <dl class="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div>
          <dt class="text-gray-500">Nama Syarikat</dt>
          <dd class="font-medium mt-0.5">{{ permohonan.namaSyarikat }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">No. Daftar</dt>
          <dd class="font-medium mt-0.5">{{ permohonan.noDaftar }}</dd>
        </div>
        <div class="col-span-2">
          <dt class="text-gray-500">Alamat</dt>
          <dd class="font-medium mt-0.5">{{ permohonan.alamat }}, {{ permohonan.negeri }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Telefon</dt>
          <dd class="font-medium mt-0.5">{{ permohonan.tel ?? '-' }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">E-mel</dt>
          <dd class="font-medium mt-0.5">{{ permohonan.emailSyarikat ?? '-' }}</dd>
        </div>
      </dl>
    </UCard>

    <!-- Maklumat Permohonan -->
    <UCard>
      <template #header>
        <h3 class="font-semibold">Maklumat Permohonan</h3>
      </template>
      <dl class="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div>
          <dt class="text-gray-500">Jenis Permohonan</dt>
          <dd class="font-medium mt-0.5">{{ jenisLabel[permohonan.jenisPermohonan] ?? permohonan.jenisPermohonan }}</dd>
        </div>
        <div v-if="permohonan.noLesenSediaAda">
          <dt class="text-gray-500">No. Lesen Sedia Ada</dt>
          <dd class="font-medium mt-0.5">{{ permohonan.noLesenSediaAda }}</dd>
        </div>
        <div v-if="permohonan.kategoriLesen">
          <dt class="text-gray-500">Kategori Lesen</dt>
          <dd class="font-medium mt-0.5">{{ kategoriLesenLabel[permohonan.kategoriLesen] ?? permohonan.kategoriLesen }}</dd>
        </div>
        <div v-if="permohonan.subKategori">
          <dt class="text-gray-500">Sub-Kategori</dt>
          <dd class="font-medium mt-0.5 capitalize">{{ String(permohonan.subKategori).replace(/_/g, ' ') }}</dd>
        </div>
        <div v-if="permohonan.lokasi" class="col-span-2">
          <dt class="text-gray-500">Lokasi Premis</dt>
          <dd class="font-medium mt-0.5">{{ permohonan.lokasi }}</dd>
        </div>
        <div v-if="permohonan.aktiviti" class="col-span-2">
          <dt class="text-gray-500">Aktiviti Sinaran</dt>
          <dd class="font-medium mt-0.5">{{ permohonan.aktiviti }}</dd>
        </div>
        <div v-if="permohonan.bilPeralatan">
          <dt class="text-gray-500">Bil. Peralatan</dt>
          <dd class="font-medium mt-0.5">{{ permohonan.bilPeralatan }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Dikemukakan Oleh</dt>
          <dd class="font-medium mt-0.5">{{ permohonan.createdByName ?? '-' }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Tarikh Kemukakan</dt>
          <dd class="font-medium mt-0.5">{{ formatDate(permohonan.submittedAt) }}</dd>
        </div>
        <div>
          <dt class="text-gray-500">Tarikh Kemaskini</dt>
          <dd class="font-medium mt-0.5">{{ formatDate(permohonan.updatedAt) }}</dd>
        </div>
        <div v-if="permohonan.keteranganPermohonan" class="col-span-2">
          <dt class="text-gray-500">Keterangan</dt>
          <dd class="font-medium mt-0.5">{{ permohonan.keteranganPermohonan }}</dd>
        </div>
      </dl>
    </UCard>

    <!-- Dokumen Sokongan -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">Dokumen Sokongan</h3>
          <span class="text-xs text-gray-400">{{ dokumenList.length }} fail</span>
        </div>
      </template>
      <div class="space-y-3">
        <div v-if="dokumenList.length" class="divide-y divide-gray-100">
          <div v-for="doc in dokumenList" :key="doc.id" class="flex items-center justify-between py-2">
            <div class="flex items-center gap-3">
              <UIcon name="i-lucide-file-text" class="w-4 h-4 text-gray-400" />
              <div>
                <p class="text-sm font-medium text-gray-900">{{ doc.namaFail }}</p>
                <p class="text-xs text-gray-400">{{ jenisDocLabel[doc.jenisDoc] ?? doc.jenisDoc }} &middot; {{ (doc.saizFail / 1024).toFixed(0) }} KB</p>
              </div>
            </div>
            <UButton v-if="canUploadDoc" icon="i-lucide-trash-2" color="error" variant="ghost" size="xs" @click="deleteDoc(doc.id)" />
          </div>
        </div>
        <p v-else class="text-sm text-gray-400">Tiada dokumen dimuat naik.</p>
        <div v-if="canUploadDoc" class="flex items-end gap-3 pt-3 border-t border-gray-100">
          <UFormField label="Jenis Dokumen" class="w-44">
            <USelect v-model="jenisDocUpload" :items="jenisDocOptions" class="w-full" />
          </UFormField>
          <div class="flex-1">
            <label class="flex items-center gap-2 px-4 py-2 rounded-md border border-dashed border-gray-300 cursor-pointer hover:border-gray-400 transition-colors">
              <UIcon name="i-lucide-upload" class="w-4 h-4 text-gray-500" />
              <span class="text-sm text-gray-600">Pilih fail untuk dimuat naik</span>
              <input type="file" class="hidden" @change="uploadFile" />
            </label>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Invois & Kewangan -->
    <UCard v-if="hasRole('PS', 'KU', 'ADMIN', 'P', 'KP')">
      <template #header>
        <h3 class="font-semibold">Invois & Kewangan</h3>
      </template>
      <div v-if="invoisList.length" class="divide-y divide-gray-100">
        <div v-for="inv in invoisList" :key="inv.id" class="flex items-center justify-between py-3">
          <div>
            <p class="text-sm font-medium">{{ inv.noInvois }}</p>
            <p class="text-xs text-gray-500">{{ inv.jenisInvois === 'fee_permohonan' ? 'Fee Permohonan' : 'Fee Lesen' }}</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm font-semibold">{{ formatCurrency(inv.jumlah) }}</span>
            <UBadge :color="invoisStatusColor[inv.status] ?? 'neutral'" variant="soft" size="sm">
              {{ invoisStatusLabel[inv.status] ?? inv.status }}
            </UBadge>
            <UButton v-if="inv.status === 'belum_bayar'" size="xs" icon="i-lucide-credit-card" color="info" variant="subtle" @click="simulateBayar(inv.id)">
              Simulasi Bayar
            </UButton>
            <UButton v-if="hasRole('PS', 'KU', 'ADMIN') && inv.status === 'telah_bayar'" size="xs" icon="i-lucide-check" color="success" @click="sahkanInvois(inv.id)">
              Sahkan
            </UButton>
          </div>
        </div>
      </div>
      <p v-else class="text-sm text-gray-400">Tiada invois lagi.</p>
    </UCard>

    <!-- Syarat Lesen -->
    <UCard v-if="hasRole('PS', 'KU', 'ADMIN', 'P', 'KP') || syaratList.length">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">Syarat Lesen</h3>
          <UButton v-if="canEditSyarat" size="xs" icon="i-lucide-plus" color="neutral" @click="showSyaratModal = true">
            Tambah Syarat
          </UButton>
        </div>
      </template>
      <div v-if="syaratList.length" class="space-y-2">
        <div v-for="s in syaratList" :key="s.id" class="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
          <span class="text-xs font-mono text-gray-400 mt-0.5">{{ s.kodSyarat }}.</span>
          <div class="flex-1">
            <p class="text-sm">{{ s.penerangan }}</p>
            <p v-if="s.kategori" class="text-xs text-gray-400 mt-0.5">Kategori: {{ s.kategori }}</p>
          </div>
          <UButton v-if="canEditSyarat" icon="i-lucide-trash-2" color="error" variant="ghost" size="xs" @click="deleteSyarat(s.id)" />
        </div>
      </div>
      <p v-else class="text-sm text-gray-400">Tiada syarat lesen ditetapkan.</p>
    </UCard>

    <!-- Kategori Kawalan -->
    <UCard v-if="permohonan.kategoriKawalan || canSetKategori || hasRole('P', 'KP', 'ADMIN')">
      <template #header>
        <h3 class="font-semibold">Kategori Kawalan</h3>
      </template>
      <div v-if="canSetKategori" class="space-y-3">
        <UFormField label="Kategori Kawalan">
          <div class="flex gap-3">
            <label v-for="cat in ['A', 'B', 'C', 'D', 'E']" :key="cat"
              class="flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors"
              :class="kategoriKawalanForm.kategoriKawalan === cat ? 'border-gray-900 bg-gray-50 font-semibold' : 'border-gray-200 hover:border-gray-400'">
              <input v-model="kategoriKawalanForm.kategoriKawalan" type="radio" :value="cat" class="accent-gray-900" />
              <span class="text-sm">{{ cat }}</span>
            </label>
          </div>
        </UFormField>
        <UFormField label="Catatan">
          <UTextarea v-model="kategoriKawalanForm.catatanKategori" :rows="2" placeholder="Catatan kategori kawalan..." class="w-full" />
        </UFormField>
        <div class="flex justify-end">
          <UButton color="neutral" :loading="kategoriLoading" :disabled="!kategoriKawalanForm.kategoriKawalan" @click="saveKategoriKawalan">
            Simpan Kategori
          </UButton>
        </div>
      </div>
      <div v-else class="text-sm">
        <div class="flex items-center gap-3">
          <span class="text-gray-500">Kategori:</span>
          <UBadge v-if="permohonan.kategoriKawalan" color="neutral" variant="subtle" size="lg">{{ permohonan.kategoriKawalan }}</UBadge>
          <span v-else class="text-gray-400">Belum ditetapkan</span>
        </div>
        <p v-if="permohonan.catatanKategori" class="mt-2 p-3 rounded-lg bg-gray-50 text-sm">{{ permohonan.catatanKategori }}</p>
      </div>
    </UCard>

    <!-- Catatan Pegawai -->
    <UCard v-if="permohonan.catatanPS || permohonan.catatanKU || hasRole('PS', 'KU', 'ADMIN', 'P', 'KP')">
      <template #header>
        <h3 class="font-semibold">Catatan Pegawai</h3>
      </template>
      <div class="space-y-3 text-sm">
        <div v-if="permohonan.catatanPS">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Catatan Pegawai Semakan (PS)</p>
          <p class="mt-1 p-3 rounded-lg bg-gray-50">{{ permohonan.catatanPS }}</p>
        </div>
        <div v-if="permohonan.catatanKU">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Catatan Ketua Unit (KU)</p>
          <p class="mt-1 p-3 rounded-lg bg-gray-50">{{ permohonan.catatanKU }}</p>
        </div>
        <p v-if="!permohonan.catatanPS && !permohonan.catatanKU" class="text-gray-400">Tiada catatan lagi.</p>
      </div>
    </UCard>

    <!-- Timeline -->
    <UCard v-if="timeline.length">
      <template #header>
        <h3 class="font-semibold">Garis Masa Permohonan</h3>
      </template>
      <div class="relative pl-6 space-y-4">
        <div class="absolute left-2.5 top-1 bottom-1 w-px bg-gray-200" />
        <div v-for="event in timeline" :key="event.id" class="relative">
          <div class="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
            <UIcon :name="timelineIcons[event.action] ?? 'i-lucide-circle'" class="w-3 h-3 text-gray-500" />
          </div>
          <div>
            <p class="text-sm font-medium">{{ timelineActionLabel[event.action] ?? event.action }}</p>
            <p class="text-xs text-gray-500">{{ event.userName }} &middot; {{ formatDate(event.createdAt) }}</p>
          </div>
        </div>
      </div>
    </UCard>
  </div>

  <!-- Action Modal -->
  <UModal v-model:open="showActionModal">
    <template #content>
      <UCard>
        <template #header>
          <h3 class="font-semibold">{{ actionType === 'lulus' ? 'Luluskan Permohonan' : 'Tolak Permohonan' }}</h3>
        </template>
        <div class="space-y-3">
          <UAlert :color="actionType === 'lulus' ? 'success' : 'error'" variant="subtle"
            :icon="actionType === 'lulus' ? 'i-lucide-check-circle' : 'i-lucide-x-circle'"
            :description="`Anda akan ${actionType === 'lulus' ? 'meluluskan' : 'menolak'} permohonan ${permohonan?.noRujukan}.`" />
          <UFormField :label="actionType === 'tolak' ? 'Sebab Penolakan (wajib)' : 'Catatan (pilihan)'">
            <UTextarea v-model="catatan" :rows="3" class="w-full" placeholder="Masukkan catatan..." />
          </UFormField>
        </div>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton color="neutral" variant="ghost" @click="showActionModal = false">Batal</UButton>
            <UButton :color="actionType === 'lulus' ? 'success' : 'error'" :loading="actionLoading"
              :disabled="actionType === 'tolak' && !catatan.trim()" @click="confirmAction">
              {{ actionType === 'lulus' ? 'Lulus' : 'Tolak' }}
            </UButton>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>

  <!-- Syarat Lesen Modal -->
  <UModal v-model:open="showSyaratModal">
    <template #content>
      <UCard>
        <template #header>
          <h3 class="font-semibold">Tambah Syarat Lesen</h3>
        </template>
        <div class="space-y-3">
          <UFormField label="Kod Syarat">
            <UInput v-model="syaratForm.kodSyarat" placeholder="cth: SL-001" class="w-full" />
          </UFormField>
          <UFormField label="Penerangan Syarat" required>
            <UTextarea v-model="syaratForm.penerangan" :rows="3" placeholder="Masukkan syarat lesen..." class="w-full" />
          </UFormField>
          <UFormField label="Kategori">
            <UInput v-model="syaratForm.kategori" placeholder="cth: Keselamatan, Penyimpanan" class="w-full" />
          </UFormField>
        </div>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton color="neutral" variant="ghost" @click="showSyaratModal = false">Batal</UButton>
            <UButton color="neutral" :disabled="!syaratForm.penerangan.trim()" @click="addSyarat">Tambah</UButton>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>
