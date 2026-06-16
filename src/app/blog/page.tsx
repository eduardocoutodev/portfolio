import { BlogCard } from '@/components/blog-card';
import PageContainer from '@/components/page-containter';
import SectionContainer from '@/components/section-container';
import SectionHeading from '@/components/section-heading';
import { getAllPosts } from '@/lib/mdx';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Notes on backend engineering, distributed systems, Java & Kotlin, and the tools behind them — by Eduardo Couto.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    title: 'Blog | Eduardo Couto',
    description:
      'Notes on backend engineering, distributed systems, Java & Kotlin, and the tools behind them.',
    url: '/blog',
    siteName: 'Eduardo Couto - Backend Software Engineer',
  },
};

export default async function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageContainer className="items-start justify-start sm:items-center sm:pt-24">
      <SectionContainer
        singlePage
        sectionName={'Blog'}
        className="w-full max-w-4xl space-y-4 text-left"
      >
        <Link
          href="/"
          className="inline-flex items-center text-sm text-zinc-500 transition-colors hover:text-inherit dark:text-zinc-400 hover:dark:text-zinc-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div>
          <SectionHeading dataTestId="about-blog" className="my-2 text-left">
            Blog
          </SectionHeading>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            My thoughts on software development, web technologies, and more.
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
