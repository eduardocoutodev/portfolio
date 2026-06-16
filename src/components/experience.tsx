'use client';

import { experiencesData } from '@/lib/data';
import { useSectionInView } from '@/lib/hooks';
import Reveal from './reveal';
import SectionHeading from './section-heading';

export default function Experience() {
  const { ref } = useSectionInView({
    sectionName: 'Experience',
  });

  return (
    <section id="experience" ref={ref} className="section-shell scroll-mt-24 py-24 sm:py-36">
      <SectionHeading dataTestId="experience-heading" index="05" eyebrow="Career">
        My Experience
      </SectionHeading>

      <ol className="border-t border-foreground">
        {experiencesData.map(
          ({ title, company, location, date, description, icon, skills }, index) => (
            <li key={index} className="border-b border-foreground/20">
              <Reveal className="grid gap-4 py-8 sm:grid-cols-[14rem_1fr] sm:gap-8 sm:py-10">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-foreground text-flame [&>svg]:h-4 [&>svg]:w-4">
                    {icon}
                  </span>
                  <p className="label pt-2.5">{date}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] [font-stretch:90%] sm:text-3xl">
                    {title}
                  </h3>

                  <p className="inline-flex flex-wrap gap-1 text-sm text-muted-foreground">
                    <span>{location}</span>
                    {company && (
                      <>
                        @
                        <a
                          className="underline decoration-flame decoration-2 underline-offset-4 transition-colors hover:text-flame"
                          target="_blank"
                          href={company.website}
                        >
                          {company.name}
                        </a>
                      </>
                    )}
                  </p>

                  <p className="max-w-2xl leading-relaxed text-foreground/80">{description}</p>

                  <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    {skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="label whitespace-nowrap">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ),
        )}
      </ol>
    </section>
  );
}
