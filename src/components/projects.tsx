'use client';

import { BackendProject, backendProjectsData, Project, projectsData } from '@/lib/data';
import { gsap, useGSAP } from '@/lib/gsap';
import { useSectionInView } from '@/lib/hooks';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import posthog from 'posthog-js';
import { useRef, useState } from 'react';
import Reveal from './reveal';
import SectionHeading from './section-heading';

export default function Projects() {
  const { ref } = useSectionInView({
    sectionName: 'Projects',
    useInViewThreshold: 0.3,
  });

  const sectionRef = useRef<HTMLElement | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewTrackRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc>();
  const yTo = useRef<gsap.QuickToFunc>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.set(previewRef.current, { xPercent: -50, yPercent: -50, scale: 0.85, opacity: 0 });
      xTo.current = gsap.quickTo(previewRef.current, 'x', { duration: 0.5, ease: 'power3' });
      yTo.current = gsap.quickTo(previewRef.current, 'y', { duration: 0.5, ease: 'power3' });

      gsap.from('[data-project-row]', {
        y: 56,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
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

  const showPreview = (index: number) => {
    setActiveIndex(index);
    gsap.to(previewTrackRef.current, {
      yPercent: (-index * 100) / projectsData.length,
      duration: 0.45,
      ease: 'power3.out',
    });
    gsap.to(previewRef.current, { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' });
  };

  const hidePreview = () => {
    setActiveIndex(null);
    gsap.to(previewRef.current, { scale: 0.85, opacity: 0, duration: 0.3, ease: 'power3.in' });
  };

  return (
    <section
      id="projects"
      ref={(node) => {
        ref(node);
        sectionRef.current = node;
      }}
      className="section-shell scroll-mt-24 py-24 sm:py-32"
    >
      <SectionHeading dataTestId="projects-heading" index="03" eyebrow="Selected work">
        My projects
      </SectionHeading>

      <p className="label mb-2 flex items-center gap-3">
        <span className="text-flame">(A)</span>
        Live &amp; deployed — full-stack
        <span className="h-px grow bg-foreground/20"></span>
      </p>

      <ul
        className="border-t border-foreground"
        onMouseMove={(event) => {
          xTo.current?.(event.clientX);
          yTo.current?.(event.clientY);
        }}
        onMouseLeave={hidePreview}
      >
        {projectsData.map((project, index) => (
          <ProjectRow
            key={project.title}
            project={project}
            index={index}
            isDimmed={activeIndex !== null && activeIndex !== index}
            onEnter={() => showPreview(index)}
          />
        ))}
      </ul>

      <p className="label mb-2 mt-16 flex items-center gap-3">
        <span className="text-flame">(B)</span>
        Backend &amp; systems — open source
        <span className="h-px grow bg-foreground/20"></span>
      </p>

      <ul className="border-t border-foreground">
        {backendProjectsData.map((project, index) => (
          <BackendProjectRow key={project.title} project={project} index={index} />
        ))}
      </ul>

      {/* Floating preview that follows the cursor (pointer devices only) */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-60 w-96 overflow-hidden border border-foreground lg:block"
        aria-hidden="true"
      >
        <div ref={previewTrackRef}>
          {projectsData.map((project) => (
            <Image
              key={project.title}
              src={project.imageUrl}
              alt=""
              quality={90}
              className="h-60 w-96 object-cover object-top grayscale"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface BackendProjectRowProps {
  project: BackendProject;
  index: number;
}

function BackendProjectRow({ project, index }: BackendProjectRowProps) {
  const { title, description, tags, href } = project;

  return (
    <li className="border-b border-foreground/20">
      <Reveal delay={index * 0.06}>
        <a
          href={href}
          target="_blank"
          className="group block px-4 py-6 transition-colors duration-200 hover:bg-foreground hover:text-background sm:-mx-6 sm:px-6 sm:py-7"
          onClick={() => {
            posthog.capture('CHECKED_PROJECT', { property: `Checked Project ${title}` });
          }}
        >
          <div className="grid items-baseline gap-3 sm:grid-cols-[3.5rem_1fr_auto]">
            <span className="label text-flame">0{index + 1}</span>

            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-3">
                <h3 className="font-display text-2xl font-extrabold lowercase leading-none tracking-[-0.02em] [font-stretch:90%] sm:text-3xl">
                  {title}
                </h3>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-flame opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </span>

              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground group-hover:text-background/70 sm:text-[0.95rem]">
                {description}
              </p>
            </div>

            <ul className="flex max-w-xs flex-wrap gap-x-3 gap-y-1 sm:justify-end">
              {tags.map((tag) => (
                <li key={tag} className="label whitespace-nowrap group-hover:text-background/60">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </a>
      </Reveal>
    </li>
  );
}

interface ProjectRowProps {
  project: Project;
  index: number;
  isDimmed: boolean;
  onEnter: () => void;
}

function ProjectRow({ project, index, isDimmed, onEnter }: ProjectRowProps) {
  const { title, description, tags, imageUrl, href } = project;

  return (
    <li data-project-row className="border-b border-foreground/20" onMouseEnter={onEnter}>
      <a
        href={href}
        target="_blank"
        className={`group block py-8 transition-opacity duration-300 sm:py-9 ${
          isDimmed ? 'opacity-30' : 'opacity-100'
        }`}
        onClick={() => {
          posthog.capture('CHECKED_PROJECT', { property: `Checked Project ${title}` });
        }}
      >
        <div className="grid items-baseline gap-4 sm:grid-cols-[3.5rem_1fr_auto]">
          <span className="label text-flame">0{index + 1}</span>

          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center gap-3">
              <h3 className="font-display text-3xl font-extrabold lowercase leading-none tracking-[-0.03em] transition-transform duration-300 [font-stretch:90%] group-hover:translate-x-2 sm:text-5xl">
                {title}
              </h3>
              <ArrowUpRight className="h-6 w-6 shrink-0 text-flame opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
            </span>

            <div className="overflow-hidden border border-foreground/20 lg:hidden">
              <Image
                src={imageUrl}
                alt={title}
                quality={90}
                className="aspect-[16/9] w-full max-w-xl object-cover object-top grayscale"
              />
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
              {description}
            </p>
          </div>

          <ul className="flex max-w-xs flex-wrap gap-x-3 gap-y-1 sm:justify-end">
            {tags.map((tag) => (
              <li key={tag} className="label whitespace-nowrap">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </a>
    </li>
  );
}
