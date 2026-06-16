import PageContainer from '@/components/page-containter';
import SectionContainer from '@/components/section-container';
import { Badge } from '@/components/shared/badge';
import { baseUrl } from '@/lib/data';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { CustomMDX } from '@/mdx-components';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';

export const generateStaticParams = () => {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const post = getPostBySlug(params.slug);
  if (!post)
    return { title: 'Post Not Found', description: 'The post you are looking for does not exist' };

  const { title, description, date, tags } = post.meta;
  const url = `/blog/${params.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: 'Eduardo Couto - Backend Software Engineer',
      publishedTime: new Date(date).toISOString(),
      authors: ['Eduardo Couto'],
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { content, meta } = post;
  const { title, date, tags, description } = meta;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: new Date(date).toISOString(),
    dateModified: new Date(date).toISOString(),
    author: { '@type': 'Person', name: 'Eduardo Couto', url: baseUrl },
    publisher: { '@type': 'Person', name: 'Eduardo Couto', url: baseUrl },
    image: `${baseUrl}eduardo_couto.jpg`,
    url: `${baseUrl}blog/${params.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${baseUrl}blog/${params.slug}` },
    keywords: tags?.join(', '),
  };

  return (
    <PageContainer className="items-start justify-start sm:items-center sm:pt-24">
      <Script
        id="blog-post-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <SectionContainer singlePage sectionName={'Blog'} className="w-full space-y-4 text-left">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-zinc-500 transition-colors hover:text-inherit dark:text-zinc-400 hover:dark:text-zinc-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Link>

        <article className="space-y-4">
          <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h1>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <time className="block text-sm text-zinc-500 dark:text-zinc-400">{date}</time>

            <ul className="flex flex-row flex-wrap items-center gap-2">
              {tags?.length > 0
                ? tags?.map((tag, index) => {
                    return <Badge key={index}>{tag}</Badge>;
                  })
                : null}
            </ul>
          </div>

          <CustomMDX source={content} />
        </article>
      </SectionContainer>
    </PageContainer>
  );
}
