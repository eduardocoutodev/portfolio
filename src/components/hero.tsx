'use client';

import { useActiveSectionContext } from '@/context/active-section-context';
import { contactInformation } from '@/lib/data';
import { gsap, useGSAP } from '@/lib/gsap';
import { useSectionInView } from '@/lib/hooks';
import EduardoImage from '@/public/eduardo_couto.jpg';
import { ArrowDownToLine, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import posthog from 'posthog-js';
import { useRef } from 'react';

export default function Hero() {
  const { ref } = useSectionInView({
    sectionName: 'Home',
    useInViewThreshold: 0.5,
  });

  const containerRef = useRef<HTMLElement | null>(null);

  const { setActive, setTimeOfLastClick } = useActiveSectionContext();

  const begginingYearOfCarrer = 2022;
  const carrerYears = new Date().getFullYear() - begginingYearOfCarrer;
  const { linkedin, github } = contactInformation;

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('[data-hero-line]', {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.14,
        delay: 0.15,
      })
        .from('[data-hero-portrait]', { scale: 0, rotate: -12, duration: 0.9 }, '-=0.9')
        .from('[data-hero-fade]', { y: 40, opacity: 0, duration: 0.9, stagger: 0.1 }, '-=0.7');
    },
    { scope: containerRef },
  );

  return (
    <section
      id="home"
      ref={(node) => {
        ref(node);
        containerRef.current = node;
      }}
      className="section-shell relative flex min-h-svh scroll-mt-[9999px] flex-col justify-end gap-10 pb-10 pt-28 sm:gap-14 sm:pb-12"
    >
      <div className="flex items-center justify-between" data-hero-fade>
        <p className="label">Porto, Portugal 🇵🇹 — 41.14° N</p>
        <p className="label hidden sm:block">Backend Software Engineer · 3× AWS Certified</p>
      </div>

      <h1 className="font-display text-[clamp(3.5rem,14.5vw,14.5rem)] font-light uppercase leading-[0.86] tracking-[-0.02em]">
        <span className="block overflow-hidden">
          <span className="block" data-hero-line>
            Eduardo
          </span>
        </span>
        <span className="block overflow-hidden">
          <span className="flex items-center gap-[0.08em] pl-[0.35em]" data-hero-line>
            <span
              className="inline-block h-[0.62em] w-[1.15em] shrink-0 overflow-hidden rounded-full border border-foreground"
              data-hero-portrait
            >
              <Image
                src={EduardoImage}
                alt="Eduardo Couto Portrait"
                quality={90}
                priority
                className="h-full w-full scale-125 object-cover object-[47%_0%]"
              />
            </span>
            Couto
            <sup className="-translate-y-[0.8em] font-sans text-[0.14em] font-medium text-flame">
              (DEV)
            </sup>
          </span>
        </span>
      </h1>

      <div className="flex flex-col justify-between gap-8 border-t border-foreground/20 pt-8 sm:flex-row sm:items-end">
        <p
          className="max-w-xl text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg"
          data-testid="hero-message"
          data-hero-fade
        >
          Hello, I&apos;m Eduardo — a <span className="font-semibold">backend engineer</span> with{' '}
          <span className="font-semibold">{carrerYears} years</span> of experience building{' '}
          <em className="font-display">distributed, event-driven systems</em> in{' '}
          <span className="underline decoration-flame decoration-2 underline-offset-4">
            Java and Kotlin
          </span>
          . These days I keep a high-throughput platform fast and reliable at Blip.
        </p>

        <div className="flex flex-wrap items-center gap-3" data-hero-fade>
          <Link
            className="group inline-flex items-center gap-1 bg-foreground px-6 py-3 text-sm font-medium uppercase tracking-wider text-background transition-colors hover:bg-flame"
            href="#contact"
            onClick={() => {
              setActive('Contact');
              setTimeOfLastClick(Date.now());
              posthog.capture('CLICKED_CONTACT_HERO', { property: 'Clicked Contact Hero' });
            }}
          >
            Contact me
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          <a
            className="group inline-flex items-center gap-1 border border-foreground px-6 py-3 text-sm font-medium uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background"
            href="/eduardo_couto_resume.pdf"
            download
            data-testid="download-cv-trigger"
            onClick={() => {
              posthog.capture('DOWNLOAD_CV', { property: 'Download CV' });
            }}
          >
            Download CV
            <ArrowDownToLine className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>

          <div className="flex items-center gap-2">
            <a
              target="_blank"
              href={linkedin}
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground transition-colors hover:bg-foreground hover:text-background"
              onClick={() => {
                posthog.capture('CHECKED_LINKEDIN', { property: 'Checked Linkedin' });
              }}
            >
              <Linkedin size={18} />
            </a>
            <a
              target="_blank"
              href={github}
              aria-label="GitHub"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground transition-colors hover:bg-foreground hover:text-background"
              onClick={() => {
                posthog.capture('CHECKED_GITHUB', { property: 'Checked Github' });
              }}
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
