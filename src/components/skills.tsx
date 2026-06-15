'use client';

import { skillsData } from '@/lib/data';
import { gsap, useGSAP } from '@/lib/gsap';
import { useSectionInView } from '@/lib/hooks';
import { useRef } from 'react';
import SectionHeading from './section-heading';

export default function Skills() {
  const { ref } = useSectionInView({
    sectionName: 'Skills',
    useInViewThreshold: 0.5,
  });

  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.from('[data-skill]', {
        y: 32,
        opacity: 0,
        stagger: 0.04,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
        // Clear inline styles when done so a late ScrollTrigger.refresh()
        // (e.g. triggered by lazy-loaded images) can't revert the reveal.
        onComplete() {
          gsap.set(this.targets(), { clearProps: 'opacity,transform' });
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="skills"
      ref={(node) => {
        ref(node);
        sectionRef.current = node;
      }}
      className="section-shell scroll-mt-24 py-24 sm:py-36"
    >
      <SectionHeading dataTestId="skills-heading" index="04" eyebrow="Toolbox">
        My Skills
      </SectionHeading>

      <ul className="flex max-w-5xl flex-wrap gap-2">
        {skillsData.map((skill, index) => (
          <li
            key={index}
            data-skill
            className="cursor-default border border-foreground px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-200 hover:bg-foreground hover:text-background sm:text-sm"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
