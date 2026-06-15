import { Experience } from '@/domain/experience';
import antiRecursoImage from '@/public/antirecurso.webp';
import aquapharmaImage from '@/public/aquapharma.webp';
import delfimMaiaImage from '@/public/delfim_maia.webp';
import orunImage from '@/public/orun.webp';
import { BookOpenCheck, Clover, GraduationCap, Laptop2, PersonStanding } from 'lucide-react';
import { Metadata } from 'next';
import { StaticImageData } from 'next/image';
import React from 'react';

export const contactInformation = {
  personalEmail: 'ecouto93@gmail.com',
  businessEmail: 'contacts@eduardocouto.dev',
  linkedin: 'https://www.linkedin.com/in/eduardo-ribeiro-couto/',
  github: 'https://github.com/eduardocoutodev',
} as const;

export const baseUrl = 'https://eduardocouto.dev/';

export const WEBSITE_METADATA: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: '%s | Eduardo Couto - Backend Software Engineer',
    default: 'Eduardo Couto - Backend Software Engineer | Java & Kotlin',
  },
  description:
    'Eduardo Couto: Backend software engineer with 4 years building distributed, event-driven systems in Java and Kotlin. Spring Boot, Quarkus, Kafka, and Apache Flink on AWS (3× certified) and Kubernetes. Based in Porto, Portugal, working worldwide.',
  applicationName: 'Eduardo Couto - Backend Software Engineer Portfolio',
  creator: 'Eduardo Couto',
  publisher: 'Eduardo Couto',
  authors: [
    {
      name: 'Eduardo Couto',
      url: 'https://www.linkedin.com/in/eduardo-ribeiro-couto/',
    },
  ],
  category: 'technology',
  keywords: [
    'Eduardo Couto',
    'Backend Software Engineer',
    'Backend Developer',
    'Java Developer',
    'Kotlin Developer',
    'Spring Boot',
    'Apache Kafka',
    'Apache Flink',
    'Distributed Systems',
    'Event-driven architecture',
    'AWS Certified',
    'Kubernetes',
    'Microservices',
    'Porto',
    'Portugal',
  ],
  generator: 'Next.js, Tailwind CSS, TypeScript, ESLint, Prettier, Jest, and Husky',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Eduardo Couto - Backend Software Engineer',
    title: 'Eduardo Couto - Backend Software Engineer | Java & Kotlin',
    description:
      'Backend software engineer building distributed, event-driven systems in Java and Kotlin. Spring Boot, Kafka, Flink, AWS, and Kubernetes. Based in Porto, Portugal.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eduardo Couto - Backend Software Engineer | Java & Kotlin',
    description:
      'Backend software engineer building distributed, event-driven systems in Java and Kotlin. Spring Boot, Kafka, Flink, AWS, and Kubernetes. Based in Porto, Portugal.',
  },
  alternates: {
    canonical: baseUrl,
  },
};

export const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Eduardo Couto',
  jobTitle: 'Backend Software Engineer',
  description:
    'Backend software engineer with 4 years building distributed, event-driven systems in Java and Kotlin on AWS and Kubernetes.',
  url: baseUrl,
  image: `${baseUrl}eduardo_couto.jpg`,
  email: 'mailto:contacts@eduardocouto.dev',
  sameAs: [
    'https://www.linkedin.com/in/eduardo-ribeiro-couto/',
    'https://github.com/eduardocoutodev',
  ],
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
export const links = [
  {
    name: 'Home',
    hash: '#home',
    href: '/',
  },
  {
    name: 'About',
    hash: '#about',
    href: '/#about',
  },
  {
    name: 'Blog',
    hash: '#blog',
    href: '/blog',
  },
  {
    name: 'Projects',
    hash: '#projects',
    href: '/#projects',
  },
  {
    name: 'Skills',
    hash: '#skills',
    href: '/#skills',
  },
  {
    name: 'Experience',
    hash: '#experience',
    href: '/#experience',
  },
  {
    name: 'Contact',
    hash: '#contact',
    href: '/#contact',
  },
] as const;

export const experiencesData: Experience[] = [
  {
    title: 'Backend Developer',
    location: 'Porto, Portugal 🇵🇹',
    company: {
      name: 'Blip.pt',
      website: 'https://www.blip.pt',
    },
    description:
      'I build the backend of a high-throughput betting platform — Java 21, Spring Boot, Kafka, and Apache Flink on AWS and Kubernetes. Along the way I shipped a production AI chatbot with Spring AI on Bedrock, led the move to structured logging with Grafana dashboards for the on-call team, and made disaster recovery a lot less scary with automated Flink savepoints.',
    icon: React.createElement(Clover),
    date: 'Sep 2024 - Present',
    skills: ['Java 21', 'Spring Boot', 'Kafka', 'Apache Flink', 'AWS', 'Kubernetes'],
  },
  {
    title: 'Full-Stack Software Developer',
    location: 'Porto, Portugal 🇵🇹',
    company: {
      name: 'Critical Techworks',
      website: 'https://www.criticaltechworks.com',
    },
    description:
      'Owned a fleet of Java microservices and led their migration to Quarkus. Rebuilt the deployment story by moving Jenkins pipelines to GitHub Actions, and kept the AWS infrastructure with Terraform.',
    icon: React.createElement(Laptop2),
    date: 'Sep 2022 - Sep 2024',
    skills: ['Java', 'Quarkus', 'Angular', 'AWS', 'Terraform', 'GitHub Actions'],
  },
  {
    title: 'Freelancer Developer',
    location: 'Porto, Portugal 🇵🇹',
    description:
      'Websites and e-commerce built end-to-end for real clients — React, Next.js, TypeScript, Stripe, and Shopify. Small team (of one), real users, no excuses.',
    icon: React.createElement(Laptop2),
    date: '2020 - Present',
    skills: ['React', 'Next.js', 'TypeScript', 'Stripe', 'Shopify'],
  },
  {
    title: 'Software Developer Intern',
    location: 'Porto, Portugal 🇵🇹',
    company: {
      name: 'Critical Techworks',
      website: 'https://www.criticaltechworks.com',
    },
    description:
      'Cut backend response times with query optimization and caching, sped up the Angular front-end, and got my first real taste of what production actually means.',
    icon: React.createElement(BookOpenCheck),
    date: 'Feb 2022 - Sep 2022',
    skills: ['Java', 'Angular', 'EclipseLink'],
  },
  {
    title: 'IT Department Coordinator',
    location: 'Porto, Portugal 🇵🇹',
    company: {
      name: 'NEI-ISEP',
      website: 'https://www.nei-isep.org',
    },
    description:
      "Ran the student association's IT department: mentored the dev team, modernized the stack, and kept projects moving while juggling a degree.",
    icon: React.createElement(PersonStanding),
    date: '2022',
    skills: ['React', 'Next.js', 'TypeScript', 'WordPress'],
  },
  {
    title: 'Graduated Informatics Engineering Degree',
    location: 'Porto, Portugal 🇵🇹',
    company: {
      name: 'ISEP',
      website: 'https://isep.ipp.pt',
    },
    description:
      'Software engineering, databases, algorithms, and computer networks. Final project: a social network built with Java, C#, and React.',
    icon: React.createElement(GraduationCap),
    date: '2019 - 2022',
    skills: ['Java', 'React', 'C#', 'C'],
  },
] as const;

export interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl: StaticImageData;
  href: string;
}

export const projectsData: Project[] = [
  {
    title: 'Aquapharma',
    description:
      'Implemented and deployed a responsive website using NextJs and Tailwind to showcase a health company portfolio and facilitate user contact submissions.',
    tags: ['React', 'Next.js', 'Tailwind'],
    imageUrl: aquapharmaImage,
    href: 'https://aquapharma.net',
  },
  {
    title: 'Delfim Maia',
    description:
      'Freelancing Project for a Lawyer Company. Website provides i18n and CMS for the client.',
    tags: ['Astro', 'React', 'Builder.io', 'Tailwind'],
    imageUrl: delfimMaiaImage,
    href: 'https://www.delfimmaia.pt',
  },
  {
    title: 'AntiRecurso',
    description:
      'Open source learning platform. Responsible for graphical representation of the students grades and dark mode support.',
    tags: ['React', 'Next.js', 'Tailwind', 'Prisma', 'PostgreSQL'],
    imageUrl: antiRecursoImage,
    href: 'https://antirecurso.nei-isep.org',
  },
  {
    title: 'Orun',
    description:
      'E-Commerce Website integrated with Shopify and i18n support. It has features like payments and newsletter.',
    tags: ['React', 'Next.js', 'Shopify', 'GraphQL', 'Builder.io', 'MailChimp'],
    imageUrl: orunImage,
    href: 'https://orun-clothes-shop-eduardocoutodev.vercel.app/pt',
  },
] as const;

export const skillsData = [
  'Java',
  'Kotlin',
  'Spring Boot',
  'Quarkus',
  'Apache Kafka',
  'Apache Flink',
  'AWS',
  'Kubernetes',
  'Docker',
  'Terraform',
  'AWS CDK',
  'PostgreSQL',
  'GitHub Actions',
  'ArgoCD',
  'Grafana',
  'Go',
  'Python',
  'TypeScript',
  'Node.js',
  'React',
  'Next.js',
] as const;

export interface BackendProject {
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export const backendProjectsData: BackendProject[] = [
  {
    title: 'http-server-from-scratch',
    description:
      'An HTTP/1.1 server written from scratch in Kotlin on raw TCP sockets, with coroutine-based concurrent request handling. No frameworks — just the protocol.',
    tags: ['Kotlin', 'Coroutines', 'Java NIO'],
    href: 'https://github.com/eduardocoutodev/http-server-from-scratch',
  },
  {
    title: 'llm-agent-java',
    description:
      'A minimal agentic coding assistant in Java: give it a prompt and it loops Read, Write, and Bash tool calls through an LLM until the task is done.',
    tags: ['Java', 'LLM', 'OpenRouter'],
    href: 'https://github.com/eduardocoutodev/llm-agent-java',
  },
  {
    title: 'spotify-stalker',
    description:
      "A small Go API that lets anyone peek at — and mess with — whatever I'm listening to on Spotify. Built for fun, kept for the laughs.",
    tags: ['Go', 'REST', 'Spotify API'],
    href: 'https://github.com/eduardocoutodev/spotify-stalker',
  },
  {
    title: 'real-time-notification-system',
    description:
      'An event-driven proof of concept for real-time notifications — Kafka in the middle, Quarkus behind, WebSockets out front.',
    tags: ['Quarkus', 'Kafka', 'WebSockets', 'Angular'],
    href: 'https://github.com/eduardocoutodev/Simple-Real-Time-Notification-System',
  },
  {
    title: 'cdk-go-lambdas-api',
    description:
      'A serverless user-registration API on AWS Lambda, with every piece of infrastructure defined as code using the AWS CDK in Go.',
    tags: ['Go', 'AWS Lambda', 'AWS CDK'],
    href: 'https://github.com/eduardocoutodev/cdk-go-lambdas-api',
  },
] as const;
