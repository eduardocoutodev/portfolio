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

      tl.from('[data-hero-meta]', { opacity: 0, y: -12, duration: 0.6 })
        .from('[data-hero-line]', { yPercent: 115, duration: 1.1, stagger: 0.12 }, '-=0.2')
        .from('[data-hero-card]', { opacity: 0, scale: 0.96, duration: 0.8 }, '-=0.8')
        .from('[data-hero-fade]', { y: 32, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.6');
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
      className="section-shell relative flex min-h-svh scroll-mt-[9999px] flex-col justify-between pb-12 pt-20 sm:pt-24"
    >
      {/* Meta strip — Swiss info row */}
      <div className="grid grid-cols-2 border-y border-foreground/15 sm:grid-cols-4" data-hero-meta>
        {[
          ['Role', 'Backend Engineer'],
          ['Stack', 'Java · Kotlin'],
          ['Base', 'Porto, PT 41.14°N'],
          ['Status', '● Available'],
        ].map(([k, v], i) => (
          <div
            key={k}
            className="border-foreground/15 px-1 py-3 sm:px-4 [&:not(:last-child)]:border-r"
          >
            <p className="label mb-1">{k}</p>
            <p className={`font-mono text-xs sm:text-sm ${i === 3 ? 'text-flame' : ''}`}>{v}</p>
          </div>
        ))}
      </div>

      {/* Headline + portrait */}
      <div className="grid grid-cols-1 items-end gap-8 py-8 sm:py-10 lg:grid-cols-[1fr_auto]">
        <h1 className="font-display text-[clamp(3.25rem,13vw,12rem)] font-extrabold lowercase leading-[0.84] tracking-[-0.045em] [font-stretch:90%]">
          <span className="block overflow-hidden">
            <span className="block" data-hero-line>
              eduardo
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="block" data-hero-line>
              couto<span className="text-flame">.</span>
            </span>
          </span>
        </h1>

        {/* Portrait — an ID card on mobile, a tall figure on desktop */}
        <figure className="flex items-stretch gap-4 lg:block lg:w-44 lg:shrink-0" data-hero-card>
          <div className="aspect-[4/5] w-1/2 max-w-[200px] shrink-0 overflow-hidden border border-foreground lg:w-full lg:max-w-none">
            <Image
              src={EduardoImage}
              alt="Eduardo Couto Portrait"
              quality={90}
              priority
              className="h-full w-full object-cover object-[47%_8%] contrast-[1.05] grayscale"
            />
          </div>

          {/* Descriptor column — mobile only, fills the horizontal space */}
          <figcaption className="flex flex-1 flex-col justify-between border-b border-foreground/15 pb-1 lg:hidden">
            <div className="flex flex-col gap-3">
              <div>
                <p className="label mb-1">Currently</p>
                <p className="font-mono text-sm">Backend @ Blip</p>
              </div>
              <div>
                <p className="label mb-1">Certs</p>
                <p className="font-mono text-sm">3× AWS</p>
              </div>
              <div>
                <p className="label mb-1">Focus</p>
                <p className="font-mono text-sm">Distributed systems</p>
              </div>
            </div>
            <p className="label">
              <span className="text-flame">/</span> Porto, PT
            </p>
          </figcaption>

          {/* Caption — desktop only */}
          <figcaption className="label mt-2 hidden justify-between lg:flex">
            <span>Eduardo Couto</span>
            <span className="text-flame">2026</span>
          </figcaption>
        </figure>
      </div>

      {/* Intro + actions */}
      <div className="grid gap-8 border-t border-foreground/15 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <p
          className="max-w-xl text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg"
          data-testid="hero-message"
          data-hero-fade
        >
          Hello, I&apos;m Eduardo — a <span className="font-semibold">backend engineer</span> with{' '}
          <span className="font-semibold">{carrerYears} years</span> of experience building{' '}
          <em>distributed, event-driven systems</em> in{' '}
          <span className="underline decoration-flame decoration-2 underline-offset-4">
            Java and Kotlin
          </span>
          . These days I keep a high-throughput platform fast and reliable at Blip.
        </p>

        <div className="flex flex-wrap items-center gap-2" data-hero-fade>
          <Link
            className="group inline-flex items-center gap-1.5 bg-foreground px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider text-background transition-colors hover:bg-flame"
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
            className="group inline-flex items-center gap-1.5 border border-foreground px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background"
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

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={linkedin}
            aria-label="LinkedIn"
            className="inline-flex h-11 w-11 items-center justify-center border border-foreground transition-colors hover:bg-foreground hover:text-background"
            onClick={() => {
              posthog.capture('CHECKED_LINKEDIN', { property: 'Checked Linkedin' });
            }}
          >
            <Linkedin size={17} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={github}
            aria-label="GitHub"
            className="inline-flex h-11 w-11 items-center justify-center border border-foreground transition-colors hover:bg-foreground hover:text-background"
            onClick={() => {
              posthog.capture('CHECKED_GITHUB', { property: 'Checked Github' });
            }}
          >
            <Github size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
