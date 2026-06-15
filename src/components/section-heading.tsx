import { cn } from '@/lib/utils';
import React from 'react';

interface SectionHeadingProps {
  children: React.ReactNode;
  dataTestId: string;
  className?: string;
  index?: string;
  eyebrow?: string;
}

export default function SectionHeading({
  children,
  className,
  dataTestId,
  index,
  eyebrow,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-10 flex flex-col gap-4 sm:mb-14', className)}>
      {(index || eyebrow) && (
        <p className="label flex items-center gap-3">
          {index && <span className="text-flame">({index})</span>}
          {eyebrow}
          <span className="h-px grow bg-foreground/20"></span>
        </p>
      )}
      <h2
        className="font-display text-5xl font-extrabold lowercase leading-[0.9] tracking-[-0.03em] [font-stretch:90%] sm:text-7xl"
        data-testid={dataTestId}
      >
        {children}
      </h2>
    </div>
  );
}
