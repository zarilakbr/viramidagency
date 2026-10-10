/**
 * @file src/features/booking/components/StepIndicator.tsx
 * Indikator progres 2 langkah ringkas pada wizard booking ViramidAgency.
 * Desain modern berkontras tinggi dengan penanda visual oranye.
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
      className="w-full pb-6 mb-8 border-b border-[#2A2A6E]"
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
                    ? 'border-orange bg-orange/15 ring-2 ring-orange shadow-md shadow-orange/20 scale-[1.01]'
                    : isCompleted
                    ? 'border-[#2A2A6E] bg-[#181850] hover:border-orange/60 cursor-pointer'
                    : 'border-[#2A2A6E]/40 bg-[#121240]/40 opacity-50 cursor-not-allowed'
                }`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {/* Step Icon / Number Pill */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                    isCurrent || isCompleted
                      ? 'bg-orange text-navy-900 shadow-sm'
                      : 'bg-[#121240] border border-[#2A2A6E] text-muted'
                  }`}
                >
                  {isCompleted ? <Icon name="check" size={15} strokeWidth={2.5} /> : step.number}
                </div>

                {/* Step Labels */}
                <div className="flex flex-col min-w-0">
                  <span
                    className={`font-heading font-bold text-xs sm:text-sm truncate ${
                      isCurrent
                        ? 'text-orange'
                        : isCompleted
                        ? 'text-cream'
                        : 'text-muted'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-[11px] font-mono text-muted/80 truncate">
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
