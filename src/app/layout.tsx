import Header from '@/components/header';
import { Toaster } from '@/components/shared/toaster';
import SmoothScroll from '@/components/smooth-scroll';
import ActiveSectionProvider from '@/context/active-section-context';
import { WEBSITE_METADATA } from '@/lib/data';
import { siteJsonLd } from '@/lib/json-ld';
import { cn } from '@/lib/utils';
import CSPostHogProvider from '@/providers/posthog';
import localFont from 'next/font/local';
import Script from 'next/script';
import Footer from '../components/footer';
import './globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

const archivo = localFont({
  src: './fonts/Archivo-Variable.ttf',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-archivo',
});

const splineMono = localFont({
  src: './fonts/SplineSansMono-Variable.ttf',
  weight: '300 700',
  style: 'normal',
  display: 'swap',
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
