import { baseUrl, contactInformation } from '@/lib/data';

/**
 * Stable @id values used to wire the JSON-LD nodes into a single connected graph.
 * Crawlers (Googlebot) merge nodes that share an @id across script tags / pages,
 * so referencing `{ '@id': PERSON_ID }` lets every page point back to the same
 * Person/WebSite entity instead of redefining disconnected islands.
 */
export const PERSON_ID = `${baseUrl}#person`;
export const WEBSITE_ID = `${baseUrl}#website`;

const PERSON_DESCRIPTION =
  'Backend software engineer with 4 years building distributed, event-driven systems in Java and Kotlin on AWS and Kubernetes.';

export const personNode = {
  '@type': 'Person',
  '@id': PERSON_ID,
  url: baseUrl,
  name: 'Eduardo Couto',
  givenName: 'Eduardo',
  familyName: 'Couto',
  jobTitle: 'Backend Software Engineer',
  description: PERSON_DESCRIPTION,
  image: {
    '@type': 'ImageObject',
    '@id': `${baseUrl}#person-image`,
    url: `${baseUrl}eduardo_couto.jpg`,
    caption: 'Eduardo Couto',
  },
  email: `mailto:${contactInformation.businessEmail}`,
  sameAs: [contactInformation.linkedin, contactInformation.github],
  knowsAbout: [
    'Java',
    'Kotlin',
    'Spring Boot',
    'Quarkus',
    'Apache Kafka',
    'Apache Flink',
    'Distributed Systems',
    'Event-driven architecture',
    'AWS',
    'Kubernetes',
    'Terraform',
  ],
  knowsLanguage: ['Portuguese', 'English'],
  worksFor: {
    '@type': 'Organization',
    name: 'Blip',
    url: 'https://www.blip.pt',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Instituto Superior de Engenharia do Porto (ISEP)',
    url: 'https://isep.ipp.pt',
  },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'AWS Certified Developer – Associate',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'Amazon Web Services' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'AWS Certified Solutions Architect – Associate',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'Amazon Web Services' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'AWS Certified Cloud Practitioner',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'Amazon Web Services' },
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Porto',
    addressCountry: 'PT',
  },
};

export const websiteNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: baseUrl,
  name: 'Eduardo Couto',
  alternateName: 'Eduardo Couto - Backend Software Engineer',
  description: PERSON_DESCRIPTION,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
  author: { '@id': PERSON_ID },
};

/**
 * Site-wide identity graph injected once in the root layout, so the Person and
 * WebSite entities are present on every page for any @id reference to resolve.
 */
export const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [websiteNode, personNode],
};

/**
 * Home page is a ProfilePage about the Person — mirrors the article's
 * recommendation for "about"-style pages on personal sites.
 */
export const homePageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${baseUrl}#webpage`,
      url: baseUrl,
      name: 'Eduardo Couto - Backend Software Engineer | Java & Kotlin',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PERSON_ID },
      mainEntity: { '@id': PERSON_ID },
      inLanguage: 'en',
    },
  ],
};

const blogUrl = `${baseUrl}blog`;

export function buildBlogIndexJsonLd(lastModified: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${blogUrl}#webpage`,
        url: blogUrl,
        name: 'Blog',
        description:
          'Notes on backend engineering, distributed systems, Java & Kotlin, and the tools behind them — by Eduardo Couto.',
        isPartOf: { '@id': WEBSITE_ID },
        inLanguage: 'en',
        breadcrumb: { '@id': `${blogUrl}#breadcrumb` },
      },
      {
        '@type': 'Blog',
        '@id': `${blogUrl}#blog`,
        mainEntityOfPage: { '@id': `${blogUrl}#webpage` },
        isPartOf: { '@id': WEBSITE_ID },
        name: 'Eduardo Couto — Blog',
        description:
          'Notes on backend engineering, distributed systems, Java & Kotlin, and the tools behind them.',
        dateModified: lastModified,
        publisher: { '@id': PERSON_ID },
        author: { '@id': PERSON_ID },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${blogUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: blogUrl },
        ],
      },
    ],
  };
}

interface BlogPostJsonLdInput {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export function buildBlogPostJsonLd({ slug, title, description, date, tags }: BlogPostJsonLdInput) {
  const postUrl = `${blogUrl}/${slug}`;
  const publishedDate = new Date(date).toISOString();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${postUrl}#webpage`,
        url: postUrl,
        name: title,
        isPartOf: { '@id': WEBSITE_ID },
        inLanguage: 'en',
        breadcrumb: { '@id': `${postUrl}#breadcrumb` },
      },
      {
        '@type': 'BlogPosting',
        '@id': `${postUrl}#blogposting`,
        url: postUrl,
        mainEntityOfPage: { '@id': `${postUrl}#webpage` },
        isPartOf: { '@id': `${blogUrl}#blog` },
        headline: title,
        description,
        keywords: tags?.join(', '),
        datePublished: publishedDate,
        dateModified: publishedDate,
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        image: {
          '@type': 'ImageObject',
          '@id': `${postUrl}#image`,
          url: `${baseUrl}eduardo_couto.jpg`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${postUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: blogUrl },
          { '@type': 'ListItem', position: 3, name: title, item: postUrl },
        ],
      },
    ],
  };
}
