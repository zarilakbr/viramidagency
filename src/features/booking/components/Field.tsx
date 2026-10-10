/**
 * @file src/features/booking/components/Field.tsx
 * Komponen form input baku dengan label, teks panduan, validasi error, dan aksesibilitas penuh.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 */

import React from 'react';
import { Icon } from '../../../components/ui/Icon';

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  as?: 'input' | 'textarea';
  rows?: number;
  required?: boolean;
}

export const Field: React.FC<FieldProps> = ({
  label,
  id,
  error,
  hint,
  as = 'input',
  rows = 3,
  required = false,
  className = '',
  ...props
}) => {
  const isError = Boolean(error);
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  const baseInputStyles = `
    w-full px-4 py-3 rounded-xl text-sm bg-[#04344C] border transition-all duration-200
    text-[#B0EDF9] placeholder:text-[#78B9CA]/60
    focus:outline-none focus:border-[#B0EDF9] focus:ring-1 focus:ring-[#B0EDF9]
    ${isError ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-[#165A7E] hover:border-[#B0EDF9]'}
    ${className}
  `;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-xs font-mono font-medium text-[#B0EDF9] tracking-wide flex items-center gap-1"
        >
          <span>{label}</span>
          {required && <span className="text-[#B0EDF9]" aria-hidden="true">*</span>}
        </label>
        {hint && !error && (
          <span id={`${id}-hint`} className="text-[11px] font-mono text-[#78B9CA]">
            {hint}
          </span>
        )}
      </div>

      {as === 'textarea' ? (
        <textarea
          id={id}
          rows={rows}
          required={required}
          aria-invalid={isError}
          aria-describedby={describedBy}
          className={baseInputStyles}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          required={required}
          aria-invalid={isError}
          aria-describedby={describedBy}
          className={baseInputStyles}
          {...props}
        />
      )}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs text-red-300 font-mono flex items-center gap-1.5 mt-0.5"
        >
          <Icon name="alert-circle" size={13} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
