import { useActiveSectionContext } from '@/context/active-section-context';
import { ScreenSize } from '@/domain/screen-size';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { SectionName } from './types';

interface SectionInViewProps {
  sectionName: SectionName;
  triggerOnce?: boolean;
  singlePage?: boolean; // Fixes and section on header as always being active
}

export function useSectionInView({
  sectionName,
  singlePage = false,
  triggerOnce = false,
}: SectionInViewProps) {
  const { setActive, timeOfLastClick } = useActiveSectionContext();
  const { ref, inView } = useInView({
    // Activate whichever section crosses the vertical center of the viewport.
    // A fractional threshold mis-fires: sections taller than the viewport can
    // never reach it, and two adjacent sections can both satisfy it at once,
    // leaving the active item stuck on the wrong section.
    rootMargin: '-50% 0px -50% 0px',
    triggerOnce,
  });

  useEffect(() => {
    // Single page always is active and have precedence
    if (singlePage || (inView && Date.now() - timeOfLastClick > 1000)) {
      setActive(sectionName);
    }
  }, [inView, setActive, timeOfLastClick, sectionName, singlePage]);

  return { ref, inView };
}

export function useScreenSize() {
  const [windowSize, setWindowSize] = useState<ScreenSize>({
    width: null,
    height: null,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    const handleResize = () => {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}
