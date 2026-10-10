import React from 'react';

type ButtonBaseProps = {
  variant?: 'primary' | 'ghost' | 'outline';
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
    href?: undefined;
  };

type ButtonAsAnchor = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/**
 * Komponen Tombol Baku ViramidAgency.
 * - Font Judul/Tombol: Gastilo
 * - Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9
 */
export const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'primary',
    children,
    className = '',
  } = props;

  const baseClasses =
    'h-11 px-6 rounded-full font-heading font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer select-none whitespace-nowrap shrink-0 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-[#B0EDF9] text-[#04344C] hover:bg-[#C8F4FC] border border-[#B0EDF9] active:bg-[#B0EDF9] shadow-sm',
    ghost:
      'bg-transparent text-[#B0EDF9] border border-[#165A7E] hover:border-[#B0EDF9] hover:text-[#B0EDF9] active:bg-[#074563]',
    outline:
      'bg-[#074563] text-[#B0EDF9] border border-[#165A7E] hover:border-[#B0EDF9] hover:bg-[#0B567C] active:bg-[#074563]',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (props.as === 'a') {
    const { as: _as, variant: _v, className: _c, children: _ch, ...anchorProps } = props;
    return (
      <a className={combinedClasses} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { as: _as, variant: _v, className: _c, children: _ch, ...buttonProps } = props;
  return (
    <button className={combinedClasses} {...buttonProps}>
      {children}
    </button>
  );
};
