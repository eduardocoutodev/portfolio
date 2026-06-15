'use client';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import Lenis from 'lenis';
import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      anchors: true,
      duration: 1.1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Honor a hash present on initial load (e.g. /#projects)
    if (window.location.hash) {
      lenis.scrollTo(window.location.hash, { immediate: true });
    }

    const onHashChange = () => {
      if (window.location.hash) {
        lenis.scrollTo(window.location.hash);
      }
    };
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
