/**
 * @file src/features/booking/components/StepIndicator.tsx
 * Indikator progres 2 langkah ringkas pada wizard booking ViramidAgency.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
 */

import React from 'react';
import { Icon } from '../../../components/ui/Icon';

export interface StepItem {
  number: number;
  label: string;
  sublabel: string;
}

const STEPS: StepItem[] = [
  { number: 1, label: 'Langkah 1: Pilih Jadwal', sublabel: 'Sesi Pertemuan & Waktu' },
  { number: 2, label: 'Langkah 2: Data Kontak', sublabel: 'Kebutuhan & Konfirmasi' },
];

interface StepIndicatorProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
  maxAccessibleStep?: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onStepClick,
  maxAccessibleStep = 2,
}) => {
  return (
    <nav
      aria-label="Progres Tahapan Booking"
      className="w-full pb-6 mb-8 border-b border-[#165A7E]"
    >
      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
        {STEPS.map((step) => {
          const isCurrent = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          const isClickable = Boolean(onStepClick && step.number <= maxAccessibleStep);

          return (
            <li key={step.number} className="w-full">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick?.(step.number)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center gap-3.5 ${
                  isCurrent
                    ? 'border-[#B0EDF9] bg-[#074563] ring-1 ring-[#B0EDF9] shadow-md scale-[1.01]'
                    : isCompleted
                    ? 'border-[#165A7E] bg-[#04344C] hover:border-[#B0EDF9] cursor-pointer'
                    : 'border-[#165A7E]/40 bg-[#04344C]/40 opacity-50 cursor-not-allowed'
                }`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {/* Step Icon / Number Pill */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                    isCurrent || isCompleted
                      ? 'bg-[#B0EDF9] text-[#04344C] shadow-sm'
                      : 'bg-[#04344C] border border-[#165A7E] text-[#78B9CA]'
                  }`}
                >
                  {isCompleted ? <Icon name="check" size={15} strokeWidth={2.5} /> : step.number}
                </div>

                {/* Step Labels */}
                <div className="flex flex-col min-w-0">
                  <span
                    className={`font-heading font-bold text-xs sm:text-sm truncate ${
                      isCurrent
                        ? 'text-[#B0EDF9]'
                        : isCompleted
                        ? 'text-[#B0EDF9]/90'
                        : 'text-[#78B9CA]'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-[11px] font-mono text-[#78B9CA] truncate">
                    {step.sublabel}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
