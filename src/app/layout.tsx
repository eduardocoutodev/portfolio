import Header from '@/components/header';
import { Toaster } from '@/components/shared/toaster';
import SmoothScroll from '@/components/smooth-scroll';
import ActiveSectionProvider from '@/context/active-section-context';
import { WEBSITE_METADATA } from '@/lib/data';
import { siteJsonLd } from '@/lib/json-ld';
import { cn } from '@/lib/utils';
import CSPostHogProvider from '@/providers/posthog';
import { Archivo, Spline_Sans_Mono } from 'next/font/google';
import Script from 'next/script';
import Footer from '../components/footer';
import './globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-archivo',
});

const splineMono = Spline_Sans_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-spline-mono',
});

export const metadata = WEBSITE_METADATA;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full overflow-x-hidden">
      <Script
        id="site-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />
      <CSPostHogProvider>
        <body
          className={cn(
            'flex min-h-full flex-col bg-background antialiased',
            archivo.variable,
            splineMono.variable,
          )}
        >
          <div className="grid-lines" aria-hidden="true"></div>
          <ActiveSectionProvider>
            <Header />
            {children}
            <Footer />
          </ActiveSectionProvider>
          <SmoothScroll />
          <Toaster />
        </body>
      </CSPostHogProvider>
    </html>
  );
}
