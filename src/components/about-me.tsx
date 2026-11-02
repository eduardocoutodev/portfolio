'use client';

import { gsap, useGSAP } from '@/lib/gsap';
import { useSectionInView } from '@/lib/hooks';
import { useRef } from 'react';
import Reveal from './reveal';
import SectionHeading from './section-heading';

const PULL_QUOTE =
  "What keeps me hooked on this work is the moment a hard problem finally gives in — when the pieces click and a system you've been wrestling with finally starts to work.";

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
            I&apos;m a software engineer based in Porto, building backend systems and AI
            applications. I built a customer-facing AI application using{' '}
            <span className="font-semibold">Java, Spring Boot, and Spring AI</span>, and continue to
            support it in production. My work spans MCP integrations, LLM orchestration,
            conversation state, automated evaluations, and guardrails.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="leading-relaxed text-foreground/80">
            I also build across the stack with{' '}
            <span className="font-semibold">TypeScript, React, and Hono</span>. I created an LLM
            observability and feedback tool used by engineering, QA, and product teams. Alongside AI
            delivery, I bring experience with Kafka, Flink, AWS, and Kubernetes. I&apos;m interested
            in <span className="font-semibold">backend and AI engineering opportunities</span>,
            particularly remote roles across Europe.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
