/**
 * @file src/data/booking.config.ts
 * Sumber konfigurasi tunggal untuk aturan jadwal dan sistem booking ViramidAgency.
 * Semua logika waktu, jam kerja, batas pemesanan, dan jenis pertemuan diatur di sini.
 */

export interface JenisPertemuanConfig {
  id: string;
  nama: string;
  durasiMenit: number;
  deskripsi: string;
}

export interface FormatPertemuanConfig {
  id: 'online' | 'tatap-muka';
  nama: string;
  deskripsi: string;
  lokasi?: string;
}

export interface BookingConfig {
  timezone: string;
  timezoneLabel: string;
  hariKerja: number[]; // 0 = Minggu, 1 = Senin, ..., 5 = Jumat, 6 = Sabtu
  jamBuka: string; // Format "HH:mm" (24 jam)
  jamTutup: string; // Format "HH:mm" (24 jam)
  intervalSlot: number; // Menit per langkah slot (30 menit)
  bufferAntarSesi: number; // Menit jeda antar sesi (15 menit)
  minimalPemberitahuanJam: number; // Minimal jeda pemesanan dari sekarang (12 jam)
  maksimalHariKedepan: number; // Maksimal hari ke depan yang dapat dipesan (30 hari)
  tanggalLibur: string[]; // Format "YYYY-MM-DD"
  jenisPertemuan: JenisPertemuanConfig[];
  formatPertemuan: FormatPertemuanConfig[];
  kontak: {
    whatsappNomor: string; // Nomor internasional tanpa spasi/simbol untuk link wa.me
    whatsappDisplay: string;
    email: string;
    lokasiStudio: string;
  };
}

export const BOOKING_CONFIG: BookingConfig = {
  timezone: 'Asia/Makassar',
  timezoneLabel: 'WITA (UTC+8)',
  
  // Senin (1) sampai Jumat (5)
  hariKerja: [1, 2, 3, 4, 5],
  
  jamBuka: '09:00',
  jamTutup: '17:00',
  
  intervalSlot: 30,
  bufferAntarSesi: 15,
  minimalPemberitahuanJam: 12,
  maksimalHariKedepan: 30,
  
  // Tanggal libur nasional & blokir jadwal khusus
  tanggalLibur: [
    '2026-01-01', // Tahun Baru
    '2026-05-01', // Hari Buruh
    '2026-08-17', // Hari Kemerdekaan RI
    '2026-12-25', // Hari Natal
  ],

  jenisPertemuan: [
    {
      id: 'konsultasi-gratis',
      nama: 'Konsultasi Gratis',
      durasiMenit: 30,
      deskripsi: 'Diskusi awal 30 menit untuk membedah kebutuhan, arah brand, dan estimasi lingkup proyek.',
    },
    {
      id: 'diskusi-proyek',
      nama: 'Diskusi Proyek',
      durasiMenit: 60,
      deskripsi: 'Pembahasan mendalam 60 menit mengenai spesifikasi teknis, fitur, arsitektur website, dan timeline.',
    },
    {
      id: 'review-desain',
      nama: 'Review Desain',
      durasiMenit: 45,
      deskripsi: 'Sesi evaluasi 45 menit untuk menelaah antarmuka (UI/UX), prototipe, atau brand guidelines yang sudah ada.',
    },
  ],

  formatPertemuan: [
    {
      id: 'online',
      nama: 'Online (Google Meet)',
      deskripsi: 'Tautan Google Meet akan dikirimkan via WhatsApp dan email konfirmasi.',
    },
    {
      id: 'tatap-muka',
      nama: 'Tatap Muka',
      deskripsi: 'Pertemuan langsung di studio ViramidAgency (Mataram, Nusa Tenggara Barat).',
      lokasi: 'ViramidAgency Studio, Nusa Tenggara Barat - Indonesia',
    },
  ],

  kontak: {
    whatsappNomor: '6287864033058',
    whatsappDisplay: '+62 878-6403-3058',
    email: 'kerjadigitallll@gmail.com',
    lokasiStudio: 'Nusa Tenggara Barat, Indonesia',
  },
};
