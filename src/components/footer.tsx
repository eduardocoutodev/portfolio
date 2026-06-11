import { contactInformation } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { linkedin, github, businessEmail } = contactInformation;

  return (
    <footer className="w-full bg-foreground text-background">
      <a
        href={`mailto:${businessEmail}`}
        className="group block overflow-hidden border-y border-background/20 py-6 sm:py-8"
        aria-label={`Email ${businessEmail}`}
      >
        <div className="flex w-max animate-marquee whitespace-nowrap font-display text-5xl font-light uppercase leading-none tracking-tight transition-colors group-hover:text-flame sm:text-8xl">
          <span className="pr-4">
            Let&apos;s work together ✦ Let&apos;s work together ✦ Let&apos;s work together ✦{' '}
          </span>
          <span className="pr-4" aria-hidden="true">
            Let&apos;s work together ✦ Let&apos;s work together ✦ Let&apos;s work together ✦{' '}
          </span>
        </div>
      </a>

      <div className="section-shell flex flex-col items-start justify-between gap-4 py-8 text-xs uppercase tracking-wider text-background/60 lg:flex-row lg:items-center">
        <section className="flex flex-col gap-2 sm:flex-row sm:gap-6">
          <span>Based in Porto, Portugal 🇵🇹</span>
          <span>Working Worldwide 🌍</span>
        </section>

        <section className="flex gap-6">
          <a target="_blank" href={linkedin} className="transition-colors hover:text-background">
            LinkedIn
          </a>
          <a target="_blank" href={github} className="transition-colors hover:text-background">
            GitHub
          </a>
        </section>

        <section>
          <a href="/" className="group transition-colors hover:text-background">
            © {currentYear}{' '}
            <span className="underline-offset-4 group-hover:underline">Eduardo Couto.</span> All
            rights reserved.
          </a>
        </section>
      </div>
    </footer>
  );
}
