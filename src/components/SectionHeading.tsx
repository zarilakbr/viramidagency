import React from 'react';
import { motion } from 'motion/react';

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  title,
  subtitle,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`mb-12 md:mb-16 text-left ${className}`}
    >
      <div className="flex items-baseline gap-4 md:gap-6">
        <span
          className="font-heading font-light text-3xl md:text-5xl text-[#7a59ab] select-none tracking-tight"
          aria-hidden="true"
        >
          {number}
        </span>
        <h2 className="font-heading font-bold text-3xl md:text-5xl text-[#F4F3FF] tracking-tight">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-3 text-sm md:text-base text-[#B8A9D4] max-w-2xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
