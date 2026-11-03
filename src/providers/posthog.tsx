'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

interface CSPostHogProviderProps {
  children: React.ReactNode;
}

export default function CSPostHogProvider({ children }: CSPostHogProviderProps) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
