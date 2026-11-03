'use client';

import posthog from 'posthog-js';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function ErrorFallback({ error, retry }: { error: unknown; retry: () => void }) {
  const reported = useRef<{ error: unknown } | null>(null);

  useEffect(() => {
    if (reported.current && reported.current.error === error) return;
    reported.current = { error };
    posthog.captureException(error, { source: 'react_error_boundary' });
  }, [error]);

  return (
    <main className="min-dh-screen-without-nav flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p>Please try loading this page again.</p>
      <button className="underline" onClick={retry}>
        Try again
      </button>
      <Link className="underline" href="/">
        Go home
      </Link>
    </main>
  );
}
