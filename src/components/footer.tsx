import { contactInformation } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { linkedin, github, businessEmail } = contactInformation;

  return (
    <footer className="relative z-[1] w-full border-t border-foreground bg-background">
      <a
        href={`mailto:${businessEmail}`}
        className="group block overflow-hidden border-b border-foreground py-6 sm:py-8"
        aria-label={`Email ${businessEmail}`}
      >
        <div className="flex w-max animate-marquee whitespace-nowrap font-display text-5xl font-extrabold lowercase leading-none tracking-[-0.03em] transition-colors [font-stretch:90%] group-hover:text-flame sm:text-8xl">
          <span className="pr-4">
            let&apos;s work together — let&apos;s work together — let&apos;s work together —{' '}
          </span>
          <span className="pr-4" aria-hidden="true">
            let&apos;s work together — let&apos;s work together — let&apos;s work together —{' '}
          </span>
        </div>
      </a>

      <div className="section-shell flex flex-col items-start justify-between gap-4 py-8 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground lg:flex-row lg:items-center">
        <section className="flex flex-col gap-2 sm:flex-row sm:gap-6">
          <span>Based in Porto, Portugal 🇵🇹</span>
          <span>Working Worldwide 🌍</span>
        </section>

        <section className="flex gap-6">
          <a target="_blank" href={linkedin} className="transition-colors hover:text-flame">
            LinkedIn
          </a>
          <a target="_blank" href={github} className="transition-colors hover:text-flame">
            GitHub
          </a>
        </section>

        <section>
          <a href="/" className="group transition-colors hover:text-foreground">
            © {currentYear}{' '}
            <span className="underline-offset-4 group-hover:underline">Eduardo Couto.</span> All
            rights reserved.
          </a>
        </section>
      </div>
    </footer>
  );
}
