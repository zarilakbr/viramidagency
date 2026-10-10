/**
 * @file src/features/booking/components/StepIndicator.tsx
 * Indikator progres 4 langkah pada wizard booking ViramidAgency.
 * Standar: Indikator langkah, progres, dan tanda centang menggunakan oranye.
 */

import React from 'react';
import { Icon } from '../../../components/ui/Icon';

export interface StepItem {
  number: number;
  label: string;
  sublabel: string;
}

const STEPS: StepItem[] = [
  { number: 1, label: 'Jenis', sublabel: 'Layanan & Format' },
  { number: 2, label: 'Waktu', sublabel: 'Tanggal & Jam' },
  { number: 3, label: 'Data Diri', sublabel: 'Kontak & Topik' },
  { number: 4, label: 'Konfirmasi', sublabel: 'Ringkasan Jadwal' },
];

interface StepIndicatorProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
  maxAccessibleStep?: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onStepClick,
  maxAccessibleStep = 4,
}) => {
  return (
    <nav
      aria-label="Progres Tahapan Booking"
      className="w-full pb-6 mb-8 border-b border-border"
    >
      <ol className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
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
                className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
                  isCurrent
                    ? 'border-orange bg-orange/10 ring-1 ring-orange shadow-sm'
                    : isCompleted
                    ? 'border-border bg-surface hover:border-orange/50 cursor-pointer'
                    : 'border-border/60 bg-surface/40 opacity-60 cursor-not-allowed'
                }`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {/* Step Icon / Number Pill */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                    isCurrent
                      ? 'bg-orange text-navy-900'
                      : isCompleted
                      ? 'bg-orange text-navy-900'
                      : 'bg-surface border border-border text-muted'
                  }`}
                >
                  {isCompleted ? <Icon name="check" size={14} strokeWidth={2.5} /> : step.number}
                </div>

                {/* Step Labels */}
                <div className="flex flex-col min-w-0">
                  <span
                    className={`font-heading font-semibold text-xs truncate ${
                      isCurrent
                        ? 'text-orange'
                        : isCompleted
                        ? 'text-cream'
                        : 'text-muted'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-[11px] font-mono text-muted/80 truncate hidden sm:inline">
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
