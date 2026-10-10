/**
 * @file src/components/ui/Container.tsx
 * Komponen tunggal Container untuk seluruh seksi website.
 * Standar:
 * - Lebar maksimum: 1200px (max-w-[1200px])
 * - Padding horizontal: 32px di desktop/tablet (px-8)
 * - Padding horizontal: 16px di mobile (px-4)
 */

import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={`w-full max-w-[1200px] mx-auto px-4 sm:px-8 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
