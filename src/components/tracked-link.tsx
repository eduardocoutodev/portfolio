'use client';

import Link from 'next/link';
import posthog from 'posthog-js';
import { ComponentPropsWithoutRef } from 'react';

type TrackedLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, 'onClick'> & {
  eventName: string;
  eventProperties: Record<string, string>;
};

export default function TrackedLink({ eventName, eventProperties, ...props }: TrackedLinkProps) {
  return <Link {...props} onClick={() => posthog.capture(eventName, eventProperties)} />;
}
