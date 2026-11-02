import { Experience } from '@/domain/experience';
import antiRecursoImage from '@/public/antirecurso.webp';
import aquapharmaImage from '@/public/aquapharma.webp';
import delfimMaiaImage from '@/public/delfim_maia.webp';
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
    template: '%s | Eduardo Couto - Software Engineer',
    default: 'Eduardo Couto - Software Engineer | Backend Systems & AI Applications',
  },
  description:
    'Eduardo Couto: Software engineer building backend systems and customer-facing AI applications. Java, TypeScript, Spring Boot, Spring AI, MCP, and AWS. Based in Porto, Portugal; interested in remote roles across Europe.',
  applicationName: 'Eduardo Couto - Software Engineer Portfolio',
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
    'Software Engineer',
    'Backend Developer',
    'Java Developer',
    'Kotlin Developer',
    'AI Engineer',
    'TypeScript',
    'Spring AI',
    'Model Context Protocol',
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
    siteName: 'Eduardo Couto - Software Engineer',
    title: 'Eduardo Couto - Software Engineer | Backend Systems & AI Applications',
    description:
      'Software engineer building backend systems and AI applications with Java, TypeScript, Spring Boot, Spring AI, MCP, and AWS. Based in Porto, Portugal.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eduardo Couto - Software Engineer | Backend Systems & AI Applications',
    description:
      'Software engineer building backend systems and AI applications with Java, TypeScript, Spring Boot, Spring AI, MCP, and AWS. Based in Porto, Portugal.',
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
    title: 'Software Engineer',
    location: 'Porto, Portugal 🇵🇹',
    company: {
      name: 'Blip.pt',
      website: 'https://www.blip.pt',
    },
    description:
      'Built and support a customer-facing AI application in production. Implemented MCP integrations, LLM orchestration, conversation state, agentic workflows, evaluations, and guardrails. Built an LLM observability and feedback tool with TypeScript, React, and Hono, adopted by engineering, QA, and product teams. Refined prompts and MCP tool descriptions to reduce response latency from approximately 15 to 10 seconds on a fixed evaluation set. Improved response consistency through deterministic application logic validated with automated evaluations, including adversarial inputs.',
    icon: React.createElement(Clover),
    date: 'May 2026 - Present',
    skills: ['Java 25', 'Spring Boot', 'Spring AI', 'MCP', 'TypeScript', 'React', 'Hono'],
  },
  {
    title: 'Associate Software Engineer',
    location: 'Porto, Portugal 🇵🇹',
    company: {
      name: 'Blip.pt',
      website: 'https://www.blip.pt',
    },
    description:
      'Maintained core sportsbook services in Java and Kotlin, and designed and operated Apache Flink streaming pipelines. Led technical initiatives from requirements through delivery. Improved integration testing with Testcontainers and automated releases. Operated AWS workloads, supported on-call incidents, and created troubleshooting and onboarding documentation.',
    icon: React.createElement(Clover),
    date: 'Sep 2024 - Apr 2026',
    skills: ['Java 21', 'Kotlin', 'Kafka', 'Apache Flink', 'AWS', 'Kubernetes', 'Testcontainers'],
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
      'Built and deployed a responsive company website with Next.js and Tailwind, presenting its services and handling contact submissions.',
    tags: ['React', 'Next.js', 'Tailwind'],
    imageUrl: aquapharmaImage,
    href: 'https://aquapharma.net',
  },
  {
    title: 'Delfim Maia',
    description:
      'Built a multilingual law firm website with Astro and React, integrating a CMS so the client can manage its content.',
    tags: ['Astro', 'React', 'Builder.io', 'Tailwind'],
    imageUrl: delfimMaiaImage,
    href: 'https://www.delfimmaia.pt',
  },
  {
    title: 'AntiRecurso',
    description:
      'Contributed grade visualization and dark mode to an open-source exam-preparation platform for ISEP students.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    imageUrl: antiRecursoImage,
    href: 'https://github.com/Nucleo-Estudantes-Informatica-ISEP/antirecurso',
  },
] as const;

export const skillsData = [
  'Java',
  'TypeScript',
  'Spring Boot',
  'Spring AI',
  'MCP',
  'LLM evaluations',
  'Hono',
  'Kotlin',
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
  'Node.js',
  'React',
  'Next.js',
] as const;

export interface BackendProject {
  category: 'ai' | 'backend';
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export const backendProjectsData: BackendProject[] = [
  {
    title: 'Java AI Coding Agent',
    category: 'ai',
    description:
      'An experimental coding assistant that turns natural-language requests into file reads, writes, and shell commands. Built an iterative tool-calling loop with conversation context and an execution limit.',
    tags: ['Java', 'OpenRouter', 'OpenAI Java SDK'],
    href: 'https://github.com/eduardocoutodev/llm-agent-java',
  },
  {
    title: 'Hacker News AI Assistant',
    category: 'ai',
    description:
      'An experimental conversational backend for exploring Hacker News. Uses Spring AI tool calling to search stories, retrieve discussions, and look up user profiles, with PostgreSQL-backed conversation history and structured responses.',
    tags: ['Java', 'Spring Boot', 'Spring AI', 'PostgreSQL'],
    href: 'https://github.com/eduardocoutodev/hnchatbot',
  },
  {
    title: 'HTTP Server from Scratch',
    category: 'backend',
    description:
      'An educational HTTP/1.1 server built with low-level sockets and no HTTP framework. Implements request parsing, routing, file upload and retrieval, and coroutine-based concurrent connection handling.',
    tags: ['Kotlin', 'Java NIO', 'Coroutines', 'Docker'],
    href: 'https://github.com/eduardocoutodev/http-server-from-scratch',
  },
  {
    title: 'Real-Time Notification System',
    category: 'backend',
    description:
      'An event-driven proof of concept connecting Quarkus producer and consumer services through Kafka. Delivers notifications to an Angular frontend over WebSockets, with Docker Compose for local execution.',
    tags: ['Java', 'Quarkus', 'Kafka', 'WebSockets'],
    href: 'https://github.com/eduardocoutodev/Simple-Real-Time-Notification-System',
  },
  {
    title: 'Serverless Go API',
    category: 'backend',
    description:
      'A user-registration API on AWS Lambda with DynamoDB storage. Defines API Gateway, Lambda functions, database resources, and access permissions as code using the AWS CDK in Go.',
    tags: ['Go', 'AWS Lambda', 'DynamoDB', 'AWS CDK'],
    href: 'https://github.com/eduardocoutodev/cdk-go-lambdas-api',
  },
] as const;
