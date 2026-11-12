import TrackedLink from '@/components/tracked-link';
import { backendProjectsData, contactInformation, experiencesData, projectsData } from '@/lib/data';
import { workFocuses } from '@/lib/work';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ focus: string }> };

export const generateStaticParams = () => workFocuses.map(({ slug }) => ({ focus: slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { focus } = await params;
  const work = workFocuses.find(({ slug }) => slug === focus);
  if (!work) return {};

  const title = `${work.label} — Selected work`;
  return {
    title,
    description: work.description,
    alternates: { canonical: `/work/${work.slug}` },
    openGraph: {
      title: `${title} | Eduardo Couto`,
      description: work.description,
      url: `/work/${work.slug}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description: work.description },
  };
}

export default async function WorkPage({ params }: Props) {
  const { focus } = await params;
  const work = workFocuses.find(({ slug }) => slug === focus);
  if (!work) notFound();

  const projects =
    work.slug === 'web'
      ? projectsData
      : backendProjectsData.filter(({ category }) => category === work.slug);
  const experience = experiencesData.find(({ title }) => title === work.experienceTitle);
  const linkClass =
    'inline-flex min-h-11 items-center gap-2 underline decoration-flame underline-offset-4 hover:text-flame focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame';

  return (
    <main className="section-shell relative z-[1] grow pb-24 pt-28 sm:pt-36">
      <Link href="/#projects" className={`${linkClass} mb-10 text-sm`}>
        <ArrowLeft aria-hidden="true" className="h-4 w-4" /> All projects
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <p className="mb-5 text-lg font-semibold" id="work-focus-label">
            What do you need to build?
          </p>
          <nav
            aria-labelledby="work-focus-label"
            className="flex flex-col border-t border-foreground"
          >
            {workFocuses.map(({ slug, label }) => (
              <Link
                key={slug}
                href={`/work/${slug}`}
                aria-current={slug === work.slug ? 'page' : undefined}
                className="flex min-h-16 items-center justify-between gap-4 border-b border-foreground/20 px-4 py-4 text-lg font-semibold transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-flame aria-[current=page]:bg-foreground aria-[current=page]:text-background"
              >
                {label}
                <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 text-flame" />
              </Link>
            ))}
          </nav>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A focused look at my work. Each view has its own link to share with your team.
          </p>
        </div>

        <div>
          <h1 className="max-w-3xl text-balance font-display text-5xl font-extrabold lowercase leading-[0.95] tracking-[-0.03em] [font-stretch:90%] sm:text-7xl">
            {work.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/75">
            {work.description}
          </p>

          <section aria-labelledby="work-projects" className="mt-12">
            <h2 id="work-projects" className="mb-4 text-xl font-bold">
              {work.slug === 'web'
                ? 'Client work & open source'
                : 'Personal projects & experiments'}
            </h2>
            <ul className="border-t border-foreground">
              {projects.map((project) => (
                <li key={project.title} className="border-b border-foreground/20 py-6">
                  <h3 className="text-2xl font-bold tracking-tight">
                    <TrackedLink
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                      eventName="CHECKED_PROJECT"
                      eventProperties={{
                        property: `Checked Project ${project.title}`,
                        project_name: project.title,
                        project_category: work.slug,
                        destination: project.href,
                        source: 'work_guide',
                      }}
                    >
                      {project.title}
                      <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0" />
                    </TrackedLink>
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-foreground/75">
                    {project.description}
                  </p>
                  <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    {project.tags.map((tag) => (
                      <li key={tag} className="font-mono text-xs text-muted-foreground">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          {experience && (
            <section
              aria-labelledby="work-experience"
              className="mt-12 border-l-2 border-flame pl-6"
            >
              <h2 id="work-experience" className="text-xl font-bold">
                Experience behind the work
              </h2>
              <p className="mt-4 font-semibold">
                {experience.title}
                {experience.company && ` at ${experience.company.name}`}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{experience.date}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-foreground/75">
                {experience.description}
              </p>
              <Link href="/#experience" className={`${linkClass} mt-4 text-sm`}>
                See my full experience
              </Link>
            </section>
          )}

          {work.slug === 'ai' && (
            <aside className="mt-10">
              <p className="font-semibold">From my engineering notebook</p>
              <Link href="/blog/automating-the-boring-part-of-studying" className={linkClass}>
                How I automated my AWS study review loop
              </Link>
            </aside>
          )}

          <section aria-labelledby="work-contact" className="mt-12 border-t border-foreground pt-8">
            <h2 id="work-contact" className="text-3xl font-bold tracking-tight">
              Working on something similar?
            </h2>
            <p className="mt-3 text-foreground/75">
              Tell me about your team, your project, or the problem you want to solve.
            </p>
            <div className="mt-5 flex flex-col items-start gap-3">
              <TrackedLink
                href={`mailto:${contactInformation.businessEmail}?subject=${encodeURIComponent(`Let's talk about ${work.label.toLowerCase()}`)}`}
                className={`${linkClass} font-semibold`}
                eventName="EMAIL_CONTACT_CLICKED"
                eventProperties={{ source: 'work_guide', focus: work.slug }}
              >
                Email me about {work.label.toLowerCase()}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </TrackedLink>
              <Link href="/#contact" className={`${linkClass} text-sm`}>
                Prefer a contact form?
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
