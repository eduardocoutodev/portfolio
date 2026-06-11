import { Post } from '@/lib/mdx';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function BlogCard({ post }: { post: Post }) {
  const { title, date, tags, description, readingTime } = post.meta;

  return (
    <article className="group border-t border-foreground/20 last:border-b">
      <Link
        href={`/blog/${post.slug}`}
        className="grid gap-2 py-8 sm:grid-cols-[14rem_1fr] sm:gap-8"
      >
        <div className="flex flex-col gap-1">
          <time dateTime={date} className="label">
            {date}
          </time>
          <span className="label text-foreground/50">{readingTime} read</span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="inline-flex items-start gap-3">
            <h2 className="font-display text-2xl font-light leading-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
              {title}
            </h2>
            <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-flame opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
          </span>

          <p className="line-clamp-3 max-w-2xl leading-relaxed text-muted-foreground">
            {description}
          </p>

          {tags?.length > 0 && (
            <ul className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1">
              {tags.map((tag, index) => (
                <li key={index} className="label whitespace-nowrap">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Link>
    </article>
  );
}
