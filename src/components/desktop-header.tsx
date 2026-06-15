'use client';
import { useActiveSectionContext } from '@/context/active-section-context';
import { links } from '@/lib/data';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DesktopHeader() {
  const { activeSection, setActive, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <motion.header
      className="fixed left-0 top-0 z-[999] w-full border-b border-foreground bg-background/90 backdrop-blur-md"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav className="section-shell flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-mono text-xs font-semibold uppercase tracking-[0.18em]"
          onClick={() => {
            setActive('Home');
            setTimeOfLastClick(Date.now());
          }}
        >
          Eduardo Couto<span className="text-flame">.</span>
        </Link>

        <ul
          className="flex items-center gap-1 lg:gap-2"
          data-testid="desktop-menu-options-container"
        >
          {links.map(({ name, hash, href }) => (
            <li key={hash} className="relative">
              <Link
                href={href}
                className={cn(
                  'relative flex items-center px-2.5 py-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground lg:px-3',
                  activeSection === name && 'text-foreground',
                )}
                onClick={() => {
                  setActive(name);
                  setTimeOfLastClick(Date.now());
                }}
              >
                {name}
                {activeSection === name ? (
                  <motion.span
                    className="absolute inset-x-2.5 -bottom-px h-0.5 bg-flame lg:inset-x-3"
                    layoutId="activeSection"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  ></motion.span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
