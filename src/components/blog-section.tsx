import { getAllPosts } from '@/lib/mdx';
import { ArrowRight } from 'lucide-react';
import { BlogCard } from './blog-card';
import Reveal from './reveal';
import SectionContainer from './section-container';
import SectionHeading from './section-heading';
import TrackedLink from './tracked-link';

const MAX_NUMBER_BLOGS_TO_SHOW = 3;

export default function BlogSection() {
  const posts = getAllPosts().slice(0, MAX_NUMBER_BLOGS_TO_SHOW);

  return (
    <SectionContainer sectionName={'Blog'} id="blog" className="py-24 sm:py-36">
      <SectionHeading dataTestId="blog-heading" index="02" eyebrow="Writing">
        <TrackedLink
          eventName="NAVIGATED_SECTION"
          eventProperties={{ section: 'Blog', source: 'home_blog_heading' }}
          href="/blog"
          className="transition-colors hover:text-flame"
        >
          Blog
        </TrackedLink>
      </SectionHeading>

      <div className="border-t border-foreground">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.08}>
            <BlogCard post={post} source="home" />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <TrackedLink
          eventName="NAVIGATED_SECTION"
          eventProperties={{ section: 'Blog', source: 'home_blog_cta' }}
          href="/blog"
          className="group inline-flex items-center gap-2 border border-foreground px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background"
        >
          View all posts
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </TrackedLink>
      </Reveal>
    </SectionContainer>
  );
}
