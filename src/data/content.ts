/**
 * @file src/data/content.ts
 * Sumber data tunggal untuk ViramidAgency.
 * Berisi informasi profil agency, layanan, portofolio karya, alur proses, nilai kerja, dan kontak.
 */

export interface AgencyProfile {
  nama: string;
  label: string;
  tagline: string;
  deskripsi: string;
  cerita: string;
}

export interface KontakInfo {
  whatsappNomor: string;
  whatsappDisplay: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  lokasi: string;
}

export interface LayananItem {
  id: string;
  nomor: string;
  nama: string;
  deskripsi: string;
}

export type KategoriProyek = 'Website' | 'Branding' | 'UI/UX' | 'Konten';

export interface ProyekItem {
  slug: string;
  judul: string;
  klien: string;
  kategori: KategoriProyek;
  tahun: string;
  ringkasan: string;
  tantangan: string;
  solusi: string;
  hasil: string;
  layanan: string[];
  gambar: string[];
}

export interface LangkahProses {
  nomor: string;
  judul: string;
  deskripsi: string;
}

export interface NilaiKerja {
  nomor: string;
  judul: string;
  deskripsi: string;
}

export interface AnggotaTim {
  nama: string;
  peran: string;
  foto?: string;
}

export interface PaketLayananItem {
  id: string;
  nama: string;
  badge?: string;
  deskripsi: string;
  harga: string;
  estimasiWaktu: string;
  fitur: string[];
  isPopular?: boolean;
  bookingJenisId: string;
}

export interface FaqItem {
  id: string;
  pertanyaan: string;
  jawaban: string;
}

// -----------------------------------------------------------------------------
// DATA UTAMA VIRAMIDAGENCY
// -----------------------------------------------------------------------------

export const PROFIL_AGENCY: AgencyProfile = {
  nama: 'ViramidAgency',
  label: 'Digital & Creative Agency',
  tagline: 'Kami membangun brand dan website yang bekerja untuk bisnismu.',
  deskripsi: 'Membantu brand berkembang melalui transformasi identitas visual, arsitektur website performa tinggi, dan pengalaman antarmuka digital yang memikat pelanggan.',
  cerita: 'Didirikan dengan filosofi bahwa estetika visual dan keandalan teknologi harus berjalan selaras, ViramidAgency bermitra erat dengan para founder dan pembuat keputusan bisnis. Kami merancang solusi digital yang tidak hanya memukau mata, tetapi juga terbukti mendongkrak konversi bisnis, kecepatan akses, dan loyalitas brand di pasar yang kompetitif.',
};

export const KONTAK_AGENCY: KontakInfo = {
  whatsappNomor: '6287864033058',
  whatsappDisplay: '+62 878-6403-3058',
  email: 'kerjadigitallll@gmail.com',
  instagram: '@viramisagency',
  instagramUrl: 'https://instagram.com/viramisagency',
  lokasi: 'Nusa Tenggara Barat - Indonesia',
};

export const DAFTAR_LAYANAN: LayananItem[] = [
  {
    id: 'layanan-1',
    nomor: '01',
    nama: 'Pengembangan Website',
    deskripsi: 'Website berkecepatan kilat, responsif di semua perangkat, serta dirancang khusus dengan standar SEO dan arsitektur kode modern untuk memaksimalkan konversi bisnis Anda.',
  },
  {
    id: 'layanan-2',
    nomor: '02',
    nama: 'Desain UI/UX',
    deskripsi: 'Riset mendalam mengenai perilaku pengguna, perancangan wireframe terstruktur, serta prototipe antarmuka interaktif yang intuitif dan mudah digunakan oleh pelanggan.',
  },
  {
    id: 'layanan-3',
    nomor: '03',
    nama: 'Branding & Identitas Visual',
    deskripsi: 'Perumusan karakter merek, sistem desain visual menyeluruh, palet warna, tipografi berkarakter, dan pedoman identitas yang membuat brand Anda tampil menonjol dari kompetitor.',
  },
  {
    id: 'layanan-4',
    nomor: '04',
    nama: 'Konten & Media Sosial',
    deskripsi: 'Penyusunan strategi komunikasi digital, produksi aset kreatif multimedia, serta arahan visual yang konsisten untuk memperkuat interaksi dan loyalitas audiens.',
  },
];

export const DAFTAR_PROYEK: ProyekItem[] = [
  {
    slug: 'artha-mandiri-finansial',
    judul: 'Artha Mandiri Finansial',
    klien: 'PT Artha Mandiri Nusantara',
    kategori: 'Website',
    tahun: '2026',
    ringkasan: 'Platform investasi digital dan portal wealth advisory dengan performa tinggi, keamanan teruji, dan kalkulator portofolio interaktif.',
    tantangan: 'Platform lama memiliki waktu muat di atas 4.8 detik dan tingkat drop-off pengguna pada formulir pendaftaran akun mencapai 62%.',
    solusi: 'Rekayasa ulang frontend berbasis Next.js dan Vite dengan render kilat, penyederhanaan alur pendaftaran 3-langkah, dan dasbor analitik aset interaktif.',
    hasil: 'Peningkatan konversi pendaftaran sebesar 84% serta pengurangan waktu loading halaman hingga 78% (Core Web Vitals skor 99).',
    layanan: ['Pengembangan Website', 'Desain UI/UX'],
    gambar: [],
  },
  {
    slug: 'nusantara-artisan-coffee',
    judul: 'Nusantara Artisan Coffee',
    klien: 'PT Kopi Rempah Nusantara',
    kategori: 'Branding',
    tahun: '2026',
    ringkasan: 'Transformasi identitas merek, desain kemasan produk ramah lingkungan, dan pedoman visual komprehensif untuk penetrasi pasar specialty coffee internasional.',
    tantangan: 'Citra merek sebelumnya terkesan generik dan belum mampu mengomunikasikan kualitas premium biji kopi single-origin lokal kepada pembeli ekspor.',
    solusi: 'Penciptaan filosofi logo segitiga dinamis, sistem tipografi elegan, dan palet warna hangat yang berpadu dengan aksen kontemporer pada seluruh kemasan.',
    hasil: 'Peningkatan pesanan ekspor sebesar 140% dan penghargaan kemasan artisan terbaik pada ajang pameran kopi regional.',
    layanan: ['Branding & Identitas Visual', 'Desain UI/UX'],
    gambar: [],
  },
  {
    slug: 'ruangkarya-studio',
    judul: 'RuangKarya Studio SaaS',
    klien: 'RuangKarya Global Teknologi',
    kategori: 'UI/UX',
    tahun: '2025',
    ringkasan: 'Desain antarmuka sistematis dan design system komprehensif untuk aplikasi kolaborasi tim kreatif berbasis cloud.',
    tantangan: 'Tingginya komplain pengguna akibat navigasi kanvas yang rumit dan ketidakkonsistenan komponen desain lintas platform web dan desktop.',
    solusi: 'Penyusunan design token multi-mode (dark/light), restrukturisasi hierarki informasi, dan pengujian usability testing pada 50 tim kolaborator.',
    hasil: 'Penurunan tiket bantuan teknis sebesar 55% serta adopsi harian aktif (DAU) melonjak 2.3 kali lipat dalam 3 bulan pertama.',
    layanan: ['Desain UI/UX'],
    gambar: [],
  },
  {
    slug: 'lumina-living-furniture',
    judul: 'Lumina Living E-Commerce',
    klien: 'Lumina Living Indonesia',
    kategori: 'Website',
    tahun: '2025',
    ringkasan: 'Toko daring furnitur mewah dengan visual editorial, rendering material interaktif, dan alur pembayaran lokal multi-gateway yang mulus.',
    tantangan: 'Pelanggan kesulitan memvisualisasikan proporsi furnitur di dalam ruangan, menyebabkan rasio retur barang yang relatif tinggi.',
    solusi: 'Integrasi fitur simulasi dimensi kamar, tata letak grid editorial responsif, dan checkout instan tanpa login yang cepat.',
    hasil: 'Rata-rata nilai pesanan (AOV) naik 38% dan rasio konversi checkout meningkat dari 1.8% menjadi 4.4%.',
    layanan: ['Pengembangan Website', 'Desain UI/UX'],
    gambar: [],
  },
  {
    slug: 'karsa-green-energy',
    judul: 'Karsa Green Energy Campaign',
    klien: 'Yayasan Karsa Lestari',
    kategori: 'Konten',
    tahun: '2025',
    ringkasan: 'Strategi kampanye digital multi-kanal, serial infografis interaktif, dan video edukasi transisi energi terbarukan di Indonesia.',
    tantangan: 'Isu teknis efisiensi energi terbarukan sulit dipahami masyarakat umum dan pemangku kebijakan daerah.',
    solusi: 'Penyederhanaan data kompleks menjadi narasi visual mikro, micro-site interaktif, serta panduan konten media sosial berbasis data faktual.',
    hasil: 'Mencapai 1.8 juta impresi organik, 45 ribu unduhan panduan energi bersih, dan diliput oleh 14 media nasional.',
    layanan: ['Konten & Media Sosial'],
    gambar: [],
  },
  {
    slug: 'sagara-retail-goods',
    judul: 'Sagara Retail Goods Rebranding',
    klien: 'Sagara Perkasa Retail',
    kategori: 'Branding',
    tahun: '2024',
    ringkasan: 'Rebranding menyeluruh dari jaringan toko ritel konvensional menjadi ekosistem belanja modern ramah generasi digital.',
    tantangan: 'Persepsi pelanggan lama menganggap gerai toko sudah tertinggal zaman dan tidak memiliki identitas digital yang menarik.',
    solusi: 'Pembaruan identitas visual gerai, signase modern, aplikasi keanggotaan digital terpadu, dan pedoman merek komprehensif.',
    hasil: 'Pertumbuhan pelanggan baru usia 18-35 tahun sebesar 72% dan ekspansi 20 gerai baru dalam 1 tahun operasional.',
    layanan: ['Branding & Identitas Visual', 'Konten & Media Sosial'],
    gambar: [],
  },
];

export const LANGKAH_PROSES: LangkahProses[] = [
  {
    nomor: '01',
    judul: 'Eksplorasi & Riset',
    deskripsi: 'Mendengarkan tujuan bisnis Anda, mendalami persona pelanggan, dan menganalisis lanskap kompetitor untuk menentukan arah yang tepat.',
  },
  {
    nomor: '02',
    judul: 'Strategi & Konsep',
    deskripsi: 'Merumuskan arsitektur informasi, eksplorasi gaya visual, prototipe antarmuka, dan peta jalan teknis yang terukur sebelum produksi.',
  },
  {
    nomor: '03',
    judul: 'Eksekusi Presisi',
    deskripsi: 'Pengembangan antarmuka berstandar tinggi, penulisan kode modern yang efisien, dan penerapan sistem desain yang adaptif.',
  },
  {
    nomor: '04',
    judul: 'Uji & Peluncuran',
    deskripsi: 'Pengujian performa ketat lintas perangkat, optimasi SEO menyeluruh, serta pendampingan serah terima aset hingga go-live.',
  },
];

export const NILAI_KERJA: NilaiKerja[] = [
  {
    nomor: '01',
    judul: 'Presisi & Estetika Fungsional',
    deskripsi: 'Setiap piksel, baris kode, dan transisi dirancang dengan cermat untuk menyajikan keindahan visual yang sekaligus mempermudah pengguna.',
  },
  {
    nomor: '02',
    judul: 'Dampak Bisnis Terukur',
    deskripsi: 'Kami tidak sekadar membuat produk yang indah; tujuan utama kami adalah meningkatkan metrik konversi, retensi, dan reputasi merek Anda.',
  },
  {
    nomor: '03',
    judul: 'Transparansi Kolaboratif',
    deskripsi: 'Komunikasi tanpa sekat, iterasi cepat, dan dokumentasi terbuka memastikan kerja sama berjalan lancar tanpa kejutan yang tidak diinginkan.',
  },
];

export const DAFTAR_TIM: AnggotaTim[] = [
  {
    nama: 'Zaril Akbar',
    peran: 'Founder & Creative Director',
    foto: '/images/zaril-akbar.jpg',
  },
  {
    nama: 'Sarah Wijaya',
    peran: 'Lead UI/UX Strategist',
  },
  {
    nama: 'Reza Firmansyah',
    peran: 'Head of Engineering & Tech Lead',
  },
];

export const PAKET_LAYANAN: PaketLayananItem[] = [
  {
    id: 'starter-launchpad',
    nama: 'Landing Page & Brand Identity',
    deskripsi: 'Solusi tepat untuk bisnis atau peluncuran produk baru yang membutuhkan landing page konversi tinggi dan identitas visual profesional.',
    harga: 'Mulai dari [Rp 7.500.000]',
    estimasiWaktu: '10 - 14 Hari Kerja',
    bookingJenisId: 'konsultasi-gratis',
    isPopular: false,
    fitur: [
      '1 Halaman Landing Page Responsif & Performa Cepat',
      'Panduan Identitas Visual Dasar & Tipografi',
      'Optimasi SEO On-Page Dasar & Metadata',
      'Integrasi Formulir Lead & WhatsApp Direct',
      'Revisi Desain Hingga [2] Putaran',
      'Garansi Teknis & Pemeliharaan [14] Hari',
    ],
  },
  {
    id: 'business-core',
    nama: 'Website Perusahaan & Custom UI/UX',
    badge: 'Paling Dipilih',
    deskripsi: 'Arsitektur web multi-halaman berkinerja tinggi yang dirancang khusus dari nol untuk memperkuat reputasi merek dan meningkatkan konversi.',
    harga: 'Mulai dari [Rp 15.000.000]',
    estimasiWaktu: '3 - 4 Minggu Kerja',
    bookingJenisId: 'diskusi-proyek',
    isPopular: true,
    fitur: [
      'Hingga [5 - 7] Halaman Desain Kustom (Tanpa Template)',
      'Sistem Desain UI/UX Eksklusif & Interaktif di Figma',
      'Kode Bersih (React / Next.js / TypeScript)',
      'Integrasi CMS Mudah Kelola Konten',
      'Struktur SEO Lengkap & Skor Kecepatan 95+',
      'Revisi Desain Hingga [3] Putaran',
      'Garansi Teknis & Pendampingan [30] Hari',
    ],
  },
  {
    id: 'enterprise-custom',
    nama: 'Aplikasi Web & Ekosistem Digital',
    deskripsi: 'Pengembangan platform web kompleks, portal pengguna, atau arsitektur digital kustom dengan integrasi backend dan database terstruktur.',
    harga: 'Mulai dari [Rp 28.000.000]',
    estimasiWaktu: '6 - 8 Minggu Kerja',
    bookingJenisId: 'diskusi-proyek',
    isPopular: false,
    fitur: [
      'Arsitektur Web Khusus & Database Terstruktur',
      'Dashboard Admin & Portal Pengguna Kustom',
      'Integrasi API Pihak Ketiga & Payment Gateway',
      'Audit Keamanan & Optimasi Beban Server',
      'Dokumentasi Teknis & Serah Terima Source Code Penuh',
      'Dukungan Teknis Prioritas [60] Hari',
    ],
  },
];

export const DAFTAR_FAQ: FaqItem[] = [
  {
    id: 'faq-1',
    pertanyaan: 'Berapa lama estimasi proses pengerjaan sebuah website di ViramidAgency?',
    jawaban: 'Waktu pengerjaan berkisar antara [10 - 14 hari kerja] untuk landing page terfokus hingga [3 - 6 minggu] untuk website perusahaan atau platform kustom. Jadwal pasti dan tahapan milestone kami susun secara transparan di awal proyek berdasarkan lingkup kerja yang disepakati.',
  },
  {
    id: 'faq-2',
    pertanyaan: 'Apakah desain website dibuat dari nol atau menggunakan template jadi?',
    jawaban: 'Seluruh proyek di ViramidAgency dirancang 100% dari nol (custom design) sesuai karakter brand dan target pelanggan bisnismu. Kami tidak menggunakan template massal agar website bisnismu memiliki diferensiasi unik, kode yang bersih, dan performa akses super cepat.',
  },
  {
    id: 'faq-3',
    pertanyaan: 'Bagaimana skema pembayaran dan tahapan kerjasamanya?',
    jawaban: 'Pembayaran umumnya dibagi menjadi [3 tahapan transparan]: Uang Muka [50%] di awal saat memulai konsep & riset, [30%] setelah tahap desain disetujui dan masuk penulisan kode, serta pelunasan [20%] setelah seluruh uji coba selesai dan siap diluncurkan secara resmi.',
  },
  {
    id: 'faq-4',
    pertanyaan: 'Apakah saya mendapatkan hak kepemilikan penuh atas desain dan kode sumber?',
    jawaban: 'Ya. Setelah proyek selesai dan seluruh administrasi rampung, seluruh hak cipta berkas desain di Figma, aset visual, serta repositori kode sumber (source code) diserahkan 100% menjadi milik bisnismu tanpa biaya tersembunyi.',
  },
  {
    id: 'faq-5',
    pertanyaan: 'Apakah ViramidAgency menyediakan layanan pemeliharaan (maintenance) setelah peluncuran?',
    jawaban: 'Setiap proyek kami lengkapi dengan garansi teknis gratis [14 hingga 60 hari] setelah peluncuran resmi. Setelah periode tersebut, kami juga menyediakan opsi paket pemeliharaan berkala untuk pembaruan keamanan, backup, dan penambahan fitur sesuai perkembangan bisnismu.',
  },
];
