'use client';

import { gsap, useGSAP } from '@/lib/gsap';
import { useSectionInView } from '@/lib/hooks';
import { useRef } from 'react';
import Reveal from './reveal';
import SectionHeading from './section-heading';

const PULL_QUOTE =
  "What keeps me hooked on this work is the moment a hard problem finally gives in — when the pieces click and a system you've been wrestling with just starts to hum.";

export default function AboutMe() {
  const { ref } = useSectionInView({
    sectionName: 'About',
  });

  const quoteRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.from('[data-quote-word]', {
        opacity: 0.12,
        stagger: 0.06,
        ease: 'none',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 80%',
          end: 'bottom 45%',
          scrub: true,
        },
      });
    },
    { scope: quoteRef },
  );

  return (
    <section id="about" ref={ref} className="section-shell scroll-mt-24 py-24 sm:py-36">
      <SectionHeading dataTestId="about-heading" index="01" eyebrow="Who I am">
        About me
      </SectionHeading>

      <p
        ref={quoteRef}
        className="max-w-5xl font-display text-3xl font-semibold leading-[1.12] tracking-[-0.02em] sm:text-5xl"
      >
        {PULL_QUOTE.split(' ').map((word, index) => (
          <span key={index} data-quote-word>
            {word}{' '}
          </span>
        ))}
      </p>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:ml-auto lg:max-w-4xl">
        <Reveal>
          <p className="leading-relaxed text-foreground/80">
            I studied Informatics Engineering in Porto and haven&apos;t stopped building since. Most
            of my time now goes into <span className="font-semibold">backend work</span> —
            distributed, event-driven systems in{' '}
            <span className="font-semibold">Java and Kotlin</span> — keeping a high-throughput
            platform fast, observable, and hard to knock over.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="leading-relaxed text-foreground/80">
            My daily tools:{' '}
            <span className="font-semibold">Spring Boot, Quarkus, Kafka, and Flink</span>, running
            on <span className="font-semibold">AWS and Kubernetes</span> (3× AWS certified). I still
            ship the occasional front-end with React, and lately I&apos;ve been having fun building
            AI agents in Java. Got an interesting{' '}
            <span className="underline decoration-flame decoration-2 underline-offset-4">
              backend problem
            </span>
            ? I&apos;d love to hear about it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
