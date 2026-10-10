/**
 * @file src/features/booking/components/BookingWizard.tsx
 * Container wizard 4 langkah pemesanan jadwal dengan navigasi maju-mundur dan validasi data.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BOOKING_CONFIG } from '../../../data/booking.config';
import { bookingService } from '../services/bookingService';
import { StepIndicator } from './StepIndicator';
import { MeetingTypeStep } from './MeetingTypeStep';
import { DateTimeStep } from './DateTimeStep';
import { DetailsStep, type DetailsFormErrors } from './DetailsStep';
import { ReviewStep } from './ReviewStep';
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

  // Form State
  const [formData, setFormData] = useState<BookingFormData>({
    jenisPertemuanId: initialJenisId || BOOKING_CONFIG.jenisPertemuan[0].id,
    format: 'online',
    tanggal: '',
    jamMulai: '',
    jamSelesai: '',
    nama: '',
    email: '',
    whatsapp: '',
    topik: '',
    linkReferensi: '',
  });

  const [detailsErrors, setDetailsErrors] = useState<DetailsFormErrors>({});

  // Fokus ke judul tahapan saat berpindah langkah (Aksesibilitas WCAG)
  useEffect(() => {
    if (stepContainerRef.current) {
      stepContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStep]);

  // Validasi Step 3 (Data Diri)
  const validateStep3 = (): boolean => {
    const errors: DetailsFormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nama || formData.nama.trim().length < 3) {
      errors.nama = 'Nama lengkap minimal 3 karakter';
    }

    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Format alamat email tidak valid';
    }

    const cleanWa = formData.whatsapp.replace(/[^0-9]/g, '');
    if (!formData.whatsapp || cleanWa.length < 9) {
      errors.whatsapp = 'Nomor WhatsApp minimal 9 digit';
    }

    if (!formData.topik || formData.topik.trim().length < 20) {
      errors.topik = 'Topik diskusi minimal 20 karakter agar pembahasan terarah';
    }

    setDetailsErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Cek apakah tombol "Lanjut" boleh aktif
  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        return Boolean(formData.jenisPertemuanId && formData.format);
      case 2:
        return Boolean(formData.tanggal && formData.jamMulai && formData.jamSelesai);
      case 3:
        return (
          formData.nama.trim().length >= 3 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
          formData.whatsapp.replace(/[^0-9]/g, '').length >= 9 &&
          formData.topik.trim().length >= 20
        );
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      const isValid = validateStep3();
      if (!isValid) return;
    }

    if (isStepValid()) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setMaxAccessibleStep((prev) => Math.max(prev, nextStep));
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepJump = (targetStep: number) => {
    if (targetStep <= maxAccessibleStep) {
      setCurrentStep(targetStep);
    }
  };

  // Handler Submit Akhir
  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    try {
      const created = await bookingService.createBooking(formData);
      // Navigasi ke halaman sukses dengan kode booking
      navigate(`/booking/sukses?code=${created.kodeBooking}`, {
        state: { booking: created },
      });
    } catch (err) {
      console.error('[BookingWizard] Gagal membuat booking:', err);
      alert('Terjadi kesalahan saat memproses permintaan jadwal. Silakan coba kembali.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={stepContainerRef} className="w-full max-w-4xl mx-auto flex flex-col">
      {/* 4-Step Visual Indicator */}
      <StepIndicator
        currentStep={currentStep}
        onStepClick={handleStepJump}
        maxAccessibleStep={maxAccessibleStep}
      />

      {/* Konten Tahapan Aktif */}
      <div className="w-full min-h-[420px] pb-24 md:pb-12">
        {currentStep === 1 && (
          <MeetingTypeStep
            selectedJenisId={formData.jenisPertemuanId}
            selectedFormat={formData.format}
            onSelectJenis={(id) => setFormData((prev) => ({ ...prev, jenisPertemuanId: id }))}
            onSelectFormat={(format: FormatPertemuan) =>
              setFormData((prev) => ({ ...prev, format }))
            }
          />
        )}

        {currentStep === 2 && (
          <DateTimeStep
            selectedJenisId={formData.jenisPertemuanId}
            selectedDate={formData.tanggal}
            selectedJamMulai={formData.jamMulai}
            onSelectDate={(date) =>
              setFormData((prev) => ({
                ...prev,
                tanggal: date,
                // Reset jam jika tanggal berubah
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

        {currentStep === 3 && (
          <DetailsStep
            nama={formData.nama}
            email={formData.email}
            whatsapp={formData.whatsapp}
            topik={formData.topik}
            linkReferensi={formData.linkReferensi || ''}
            errors={detailsErrors}
            onChange={(field, value) => {
              setFormData((prev) => ({ ...prev, [field]: value }));
              if (detailsErrors[field as keyof DetailsFormErrors]) {
                setDetailsErrors((prev) => ({ ...prev, [field]: undefined }));
              }
            }}
          />
        )}

        {currentStep === 4 && (
          <ReviewStep
            formData={formData}
            onEditSection={(step) => setCurrentStep(step)}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmitBooking}
          />
        )}
      </div>

      {/* Bar Navigasi Tombol Bawah (Sticky di Mobile) */}
      {currentStep < 4 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 border-t border-border p-4 md:static md:bg-transparent md:border-t-0 md:p-0 md:mt-8">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="py-3 px-5 rounded-lg border border-border bg-surface hover:bg-surface-hover text-foreground font-heading font-medium text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Icon name="arrow-left" size={16} />
                <span>Kembali</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              disabled={!isStepValid()}
              onClick={handleNext}
              className="py-3 px-6 rounded-lg bg-orange hover:bg-orange-hover text-navy font-heading font-bold text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm ml-auto"
            >
              <span>Lanjut ke Langkah {currentStep + 1}</span>
              <Icon name="arrow-right" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
