/**
 * @file src/features/booking/components/Field.tsx
 * Komponen form input baku dengan label, teks panduan, validasi error, dan aksesibilitas penuh.
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
    w-full px-4 py-3 rounded-xl text-sm bg-navy-900 border transition-colors duration-200
    text-cream placeholder:text-muted/50
    focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange
    ${isError ? 'border-error focus:border-error focus:ring-error' : 'border-border hover:border-orange/60'}
    ${className}
  `;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-xs font-mono font-medium text-cream tracking-wide flex items-center gap-1"
        >
          <span>{label}</span>
          {required && <span className="text-orange" aria-hidden="true">*</span>}
        </label>
        {hint && !error && (
          <span id={`${id}-hint`} className="text-[11px] font-mono text-muted">
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
          className="text-xs text-error font-mono flex items-center gap-1.5 mt-0.5"
        >
          <Icon name="alert-circle" size={13} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
