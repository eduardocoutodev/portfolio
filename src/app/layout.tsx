import Header from '@/components/header';
import { Toaster } from '@/components/shared/toaster';
import SmoothScroll from '@/components/smooth-scroll';
import ActiveSectionProvider from '@/context/active-section-context';
import { JSON_LD, WEBSITE_METADATA } from '@/lib/data';
import { cn } from '@/lib/utils';
import CSPostHogProvider from '@/providers/posthog';
import { Archivo, Fraunces } from 'next/font/google';
import Script from 'next/script';
import Footer from '../components/footer';
import './globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-fraunces',
});

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
});

export const metadata = WEBSITE_METADATA;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full overflow-x-hidden">
      <Script
        id="my-jsonld-info"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <CSPostHogProvider>
        <body
          className={cn(
            'flex min-h-full flex-col bg-background antialiased',
            fraunces.variable,
            archivo.variable,
          )}
        >
          <ActiveSectionProvider>
            <Header />
            {children}
            <Footer />
          </ActiveSectionProvider>
          <SmoothScroll />
          <Toaster />
          <div className="grain-overlay" aria-hidden="true"></div>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
