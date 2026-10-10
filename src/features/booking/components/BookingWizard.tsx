/**
 * @file src/features/booking/components/BookingWizard.tsx
 * Container wizard konsultasi modern 2 langkah:
 * Langkah 1: Pilih Jenis Sesi, Format, Tanggal, dan Jam Waktu Sekaligus
 * Langkah 2: Data Kontak, Kebutuhan Proyek Cepat, dan Konfirmasi Langsung
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BOOKING_CONFIG } from '../../../data/booking.config';
import { bookingService } from '../services/bookingService';
import { StepIndicator } from './StepIndicator';
import { ScheduleStep } from './ScheduleStep';
import { QuickContactStep, type ContactFormErrors } from './QuickContactStep';
import { Icon } from '../../../components/ui/Icon';
import type { BookingFormData, FormatPertemuan, TimeSlot } from '../types';

interface BookingWizardProps {
  initialJenisId?: string;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({ initialJenisId }) => {
  const navigate = useNavigate();
  const stepContainerRef = useRef<HTMLDivElement>(null);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxAccessibleStep, setMaxAccessibleStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form State Baku
  const [formData, setFormData] = useState<BookingFormData>({
    jenisPertemuanId: initialJenisId || BOOKING_CONFIG.jenisPertemuan[0].id,
    format: 'online',
    tanggal: '',
    jamMulai: '',
    jamSelesai: '',
    nama: '',
    email: '',
    whatsapp: '',
    topik: 'Platform LMS & Sistem Kursus Online',
    linkReferensi: '',
  });

  const [contactErrors, setContactErrors] = useState<ContactFormErrors>({});
  const [stepNotice, setStepNotice] = useState<string | null>(null);

  // Sinkronkan jenisPertemuanId saat initialJenisId berubah dari URL query parameter
  useEffect(() => {
    if (initialJenisId) {
      setFormData((prev) => ({
        ...prev,
        jenisPertemuanId: initialJenisId,
      }));
    }
  }, [initialJenisId]);

  // Bersihkan notifikasi saat berganti langkah
  useEffect(() => {
    setStepNotice(null);
  }, [currentStep]);

  // Fokus ke judul tahapan saat berpindah langkah (Aksesibilitas WCAG)
  useEffect(() => {
    if (stepContainerRef.current) {
      stepContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStep]);

  // Validasi Langkah 2 (Data Kontak)
  const validateContactForm = (): boolean => {
    const errors: ContactFormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nama || formData.nama.trim().length < 2) {
      errors.nama = 'Mohon masukkan nama lengkap atau nama bisnismu (minimal 2 karakter)';
    }

    const cleanWa = formData.whatsapp.replace(/[^0-9]/g, '');
    if (!formData.whatsapp || cleanWa.length < 8) {
      errors.whatsapp = 'Nomor WhatsApp aktif minimal 8 digit angka (contoh: 0812...)';
    }

    if (formData.email && formData.email.trim().length > 0 && !emailRegex.test(formData.email.trim())) {
      errors.email = 'Format alamat email tidak valid (contoh: nama@perusahaan.com)';
    }

    if (!formData.topik || formData.topik.trim().length < 4) {
      errors.topik = 'Pilih salah satu tag kebutuhan atau tuliskan catatan singkat';
    }

    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextToContact = () => {
    setStepNotice(null);

    if (!formData.tanggal) {
      setStepNotice('Silakan pilih tanggal pertemuan pada kalender.');
      return;
    }
    if (!formData.jamMulai || !formData.jamSelesai) {
      setStepNotice('Silakan pilih salah satu jam pertemuan yang tersedia pada tanggal ini.');
      return;
    }

    setCurrentStep(2);
    setMaxAccessibleStep(2);
  };

  const handleBackToSchedule = () => {
    setCurrentStep(1);
  };

  // Handler Submit Akhir
  const handleSubmitBooking = async () => {
    const isValid = validateContactForm();
    if (!isValid) {
      setStepNotice('Mohon lengkapi data kontak yang bertanda bintang di bawah.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const created = await bookingService.createBooking(formData);
      navigate(`/booking/sukses?code=${created.kodeBooking}`, {
        state: { booking: created },
      });
    } catch (err) {
      console.error('[BookingWizard] Gagal membuat booking:', err);
      setSubmitError(
        'Terjadi kendala saat memproses permintaan jadwal. Silakan periksa kembali data Anda atau hubungi kami langsung via WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={stepContainerRef} className="w-full max-w-4xl mx-auto flex flex-col">
      {/* 2-Step Modern Indicator */}
      <StepIndicator
        currentStep={currentStep}
        onStepClick={(step) => {
          if (step === 1) setCurrentStep(1);
          if (step === 2 && maxAccessibleStep >= 2) setCurrentStep(2);
        }}
        maxAccessibleStep={maxAccessibleStep}
      />

      {/* Konten Tahapan Aktif */}
      <div className="w-full min-h-[420px] pb-12">
        {currentStep === 1 && (
          <ScheduleStep
            selectedJenisId={formData.jenisPertemuanId}
            selectedFormat={formData.format}
            selectedDate={formData.tanggal}
            selectedJamMulai={formData.jamMulai}
            selectedJamSelesai={formData.jamSelesai}
            onSelectJenis={(id) => setFormData((prev) => ({ ...prev, jenisPertemuanId: id }))}
            onSelectFormat={(format: FormatPertemuan) => setFormData((prev) => ({ ...prev, format }))}
            onSelectDate={(date) =>
              setFormData((prev) => ({
                ...prev,
                tanggal: date,
                jamMulai: '',
                jamSelesai: '',
              }))
            }
            onSelectSlot={(slot: TimeSlot) =>
              setFormData((prev) => ({
                ...prev,
                jamMulai: slot.jamMulai,
                jamSelesai: slot.jamSelesai,
              }))
            }
          />
        )}

        {currentStep === 2 && (
          <QuickContactStep
            formData={formData}
            onChange={(field, value) => {
              setFormData((prev) => ({ ...prev, [field]: value }));
              if (contactErrors[field as keyof ContactFormErrors]) {
                setContactErrors((prev) => ({ ...prev, [field]: undefined }));
              }
            }}
            onEditSchedule={handleBackToSchedule}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmitBooking}
            errors={contactErrors}
            errorMessage={submitError}
          />
        )}
      </div>

      {/* Notifikasi Kendala */}
      {stepNotice && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl border border-[#B0EDF9] bg-[#04344C] text-[#B0EDF9] flex items-center gap-3 text-xs sm:text-sm"
        >
          <Icon name="alert-circle" size={18} className="text-[#B0EDF9] shrink-0" />
          <span className="text-[#B0EDF9] font-medium">{stepNotice}</span>
        </div>
      )}

      {/* Tombol Lanjut di Langkah 1 */}
      {currentStep === 1 && (
        <div className="mt-4 pt-6 border-t border-[#165A7E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#78B9CA] font-mono flex items-center gap-2">
            <Icon name="shield-check" size={16} className="text-[#B0EDF9]" />
            <span>Pilih waktu di atas, lalu lanjutkan untuk mengisi data kontak.</span>
          </div>

          <button
            type="button"
            onClick={handleNextToContact}
            className="w-full sm:w-auto h-12 px-7 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-md active:scale-[0.98]"
          >
            <span>Lanjut ke Data Kontak</span>
            <Icon name="arrow-right" size={18} />
          </button>
        </div>
      )}
    </div>
  );
};
