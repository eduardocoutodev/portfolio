import { ENV_VARS } from '@/lib/environment';
import posthog from 'posthog-js';

const { NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST, NEXT_PUBLIC_NODE_ENV } = ENV_VARS;

if (NEXT_PUBLIC_NODE_ENV === 'production') {
  posthog.init(NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: 'history_change',
    capture_pageleave: true,
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
    capture_performance: { web_vitals: true, network_timing: false },
    person_profiles: 'identified_only',
    session_recording: { maskAllInputs: true },
  });
}
