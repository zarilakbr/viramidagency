/**
 * @file src/features/booking/components/Field.tsx
 * Komponen form input baku dengan label, teks panduan, validasi error, dan aksesibilitas penuh.
 */

import React from 'react';

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
    w-full px-4 py-3 rounded-lg text-sm bg-surface border transition-colors duration-200
    text-foreground placeholder:text-muted/50
    focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan
    ${isError ? 'border-orange focus:border-orange focus:ring-orange' : 'border-border hover:border-muted/60'}
    ${className}
  `;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-xs font-mono font-medium text-foreground tracking-wide flex items-center gap-1"
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
          className="text-xs text-orange font-mono flex items-center gap-1.5 mt-0.5"
        >
          <span className="w-1 h-1 rounded-full bg-orange" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
