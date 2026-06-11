'use client';

import { contactInformation } from '@/lib/data';
import { useSectionInView } from '@/lib/hooks';
import Reveal from './reveal';
import ContactSectionForm from './contact-section-form';

export default function ContactSection() {
  const { ref } = useSectionInView({
    sectionName: 'Contact',
    useInViewThreshold: 0.3,
  });

  return (
    <section ref={ref} id="contact" className="scroll-mt-24 bg-foreground text-background">
      <div className="section-shell py-24 sm:py-32">
        <Reveal>
          <p className="label flex items-center gap-3 text-background/60">
            <span className="text-flame">(06)</span>
            Get in touch
            <span className="h-px grow bg-background/20"></span>
          </p>
        </Reveal>

        <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="flex flex-col gap-8">
              <h2
                className="font-display text-5xl font-light leading-[0.95] tracking-tight sm:text-7xl"
                data-testid="contact-heading"
              >
                Contact Me
              </h2>
              <p className="max-w-md leading-relaxed text-background/70">
                Got a project in mind, a role to fill, or just want to talk shop? My inbox is open —
                email me directly or use the form.
              </p>
              <a
                target="_blank"
                href={`mailto:${contactInformation.businessEmail}`}
                className="break-all font-display text-2xl font-light italic underline decoration-flame decoration-2 underline-offset-8 transition-colors hover:text-flame sm:text-4xl"
              >
                {contactInformation.businessEmail}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ContactSectionForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
