'use client';

import { gsap, useGSAP } from '@/lib/gsap';
import { useSectionInView } from '@/lib/hooks';
import { useRef } from 'react';
import Reveal from './reveal';
import SectionHeading from './section-heading';

const PULL_QUOTE =
  'My favorite part of programming is the problem-solving aspect — the feeling of finally figuring out a solution to a complex problem.';

export default function AboutMe() {
  const { ref } = useSectionInView({
    sectionName: 'About',
    useInViewThreshold: 0.5,
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
        className="max-w-5xl font-display text-3xl font-light leading-[1.15] sm:text-5xl"
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
            After graduating with a degree in{' '}
            <span className="font-semibold">Informatics Engineering</span>, I decided to pursue my
            passion for software development. I have gained extensive experience in{' '}
            <span className="font-semibold">full-stack development</span> through various roles and
            projects.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="leading-relaxed text-foreground/80">
            My core stack includes{' '}
            <span className="font-semibold">Java, React, Angular, Quarkus, and Node.js</span>. I am
            also proficient in <span className="font-semibold">AWS, Terraform, and Kubernetes</span>{' '}
            — and always learning. I am currently open to{' '}
            <span className="underline decoration-flame decoration-2 underline-offset-4">
              collaboration and new projects
            </span>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
