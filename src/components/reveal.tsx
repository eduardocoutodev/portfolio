'use client';

import { gsap, useGSAP } from '@/lib/gsap';
import { useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Fades & slides its children up once they scroll into view.
 * Content stays visible without JS (gsap.from only hides after hydration).
 */
export default function Reveal({ children, className, delay = 0, y = 48 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current, {
        y,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          once: true,
        },
        // Clear inline styles when done so a late ScrollTrigger.refresh()
        // (e.g. triggered by lazy-loaded images) can't revert the reveal.
        onComplete() {
          gsap.set(this.targets(), { clearProps: 'opacity,transform' });
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
