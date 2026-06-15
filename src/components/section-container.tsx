'use client';

import { useSectionInView } from '@/lib/hooks';
import { SectionName } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
  children: React.ReactNode;
  sectionName: SectionName;
  id?: string;
  className?: string;
  useInViewThreshold?: number;
  singlePage?: boolean; // Fixes and section on header as always being active
}

export default function SectionContainer({
  children,
  sectionName,
  id,
  className,
  useInViewThreshold = 0.5,
  singlePage = false,
  ...props
}: SectionContainerProps) {
  const { ref } = useSectionInView({
    sectionName,
    useInViewThreshold,
    singlePage,
  });

  return (
    <section id={id} ref={ref} className={cn('section-shell scroll-mt-24', className)} {...props}>
      {children}
    </section>
  );
}
