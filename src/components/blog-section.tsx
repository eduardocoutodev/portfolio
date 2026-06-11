import { getAllPosts } from '@/lib/mdx';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BlogCard } from './blog-card';
import Reveal from './reveal';
import SectionContainer from './section-container';
import SectionHeading from './section-heading';

const MAX_NUMBER_BLOGS_TO_SHOW = 3;

export default function BlogSection() {
  const posts = getAllPosts().slice(0, MAX_NUMBER_BLOGS_TO_SHOW);

  return (
    <SectionContainer sectionName={'Blog'} id="blog" className="py-24 sm:py-36">
      <SectionHeading dataTestId="blog-heading" index="02" eyebrow="Writing">
        <Link href="/blog" className="transition-colors hover:text-flame">
          Blog
        </Link>
      </SectionHeading>

      <div>
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.08}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 border border-foreground px-6 py-3 text-sm font-medium uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background"
        >
          View all posts
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </SectionContainer>
  );
}
