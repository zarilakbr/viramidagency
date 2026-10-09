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
 * - Tinggi baku 44px (h-11)
 * - Transisi warna 200ms tanpa efek membal
 * - Border 1px, tanpa shadow
 * - Outline cyan 2px saat focus-visible
 */
export const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'primary',
    children,
    className = '',
  } = props;

  const baseClasses =
    'h-11 px-6 rounded-md font-medium text-sm inline-flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer select-none whitespace-nowrap shrink-0 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-orange text-background font-semibold hover:bg-orange-hover border border-orange active:bg-orange-hover',
    ghost:
      'bg-transparent text-foreground border border-border hover:border-orange hover:text-foreground active:bg-surface',
    outline:
      'bg-surface text-foreground border border-border hover:border-orange hover:bg-surface-hover active:bg-surface',
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
