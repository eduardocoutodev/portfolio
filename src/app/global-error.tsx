'use client';

import ErrorFallback from './error';
import './globals.css';

export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="en">
      <body>
        <ErrorFallback error={error} retry={retry} />
      </body>
    </html>
  );
}
