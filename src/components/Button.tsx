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

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'primary',
    children,
    className = '',
  } = props;

  const baseClasses =
    'h-12 px-7 rounded-full font-medium text-sm inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#22D3C5] focus-visible:outline-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-[#F97316] text-[#24133f] font-semibold hover:bg-[#FDBA4D] shadow-md shadow-[#F97316]/20 hover:shadow-[#F97316]/30',
    ghost:
      'bg-transparent text-[#F4F3FF] border border-[#5a3c8e] hover:border-[#F97316] hover:bg-[#412a6a]/40 hover:text-[#F4F3FF]',
    outline:
      'bg-[#412a6a] text-[#F4F3FF] border border-[#5a3c8e] hover:border-[#F97316] hover:bg-[#412a6a]/80 shadow-sm',
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
