'use client';

import { ENV_VARS } from '@/lib/environment';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

interface CSPostHogProviderProps {
  children: React.ReactNode;
}

const { NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST, NEXT_PUBLIC_NODE_ENV } = ENV_VARS;

if (typeof window !== 'undefined' && NEXT_PUBLIC_NODE_ENV === 'production') {
  posthog.init(NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: 'history_change',
    person_profiles: 'identified_only',
  });
}

export default function CSPostHogProvider({ children }: CSPostHogProviderProps) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
