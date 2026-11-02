'use client';

import { useActiveSectionContext } from '@/context/active-section-context';
import { contactInformation, links } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import posthog from 'posthog-js';
import { useEffect, useState } from 'react';

export default function MobileHeader() {
  const { activeSection, setActive, setTimeOfLastClick } = useActiveSectionContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (isOpen) {
      html.style.overflow = 'hidden';
    } else {
      html.style.overflow = '';
    }
    return () => {
      html.style.overflow = '';
    };
  }, [isOpen]);

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.04,
        staggerDirection: 1,
      },
    },
  };

  const mobileLinkVars = {
    initial: {
      opacity: 0,
      y: 12,
      transition: {
        duration: 0.15,
        ease: [0.37, 0, 0.63, 1],
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0, 0.55, 0.45, 1],
        duration: 0.2,
      },
    },
  };

  return (
    <header className="z-[100]" data-testid="mobile-menu-container">
      <div className="fixed left-0 right-0 top-0 z-[105] flex h-14 items-center justify-between border-b border-foreground bg-background/90 px-5 backdrop-blur-md">
        <Link
          href="/"
          className="font-mono text-xs font-semibold uppercase tracking-[0.18em]"
          onClick={() => {
            setActive('Home');
            setTimeOfLastClick(Date.now());
            setIsOpen(false);
          }}
        >
          Eduardo Couto<span className="text-flame">.</span>
        </Link>
      </div>

      <div className="fixed right-3 top-2 z-[110]">
        <button
          onClick={() => setIsOpen((open) => !open)}
          data-testid={isOpen ? 'close-mobile-menu-button' : 'open-mobile-menu-button'}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center border',
            isOpen
              ? 'border-background/40 text-background'
              : 'border-foreground bg-background text-foreground',
          )}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed left-0 top-0 z-[108] h-screen w-full bg-foreground text-background"
            data-testid="mobile-menu-expanded"
            variants={{
              initial: {
                clipPath: 'inset(0 0 100% 0)',
                transition: { duration: 0.25, when: 'afterChildren' },
              },
              open: {
                clipPath: 'inset(0 0 0% 0)',
                transition: { duration: 0.25, when: 'beforeChildren' },
              },
            }}
            initial="initial"
            animate="open"
            exit="initial"
          >
            <nav className="flex h-full flex-col justify-between px-6 pb-10 pt-24">
              <motion.ul
                className="flex flex-col gap-1"
                data-testid="mobile-menu-expanded-options-container"
                variants={containerVars}
              >
                {links.map(({ name, hash, href }, index) => (
                  <motion.li
                    key={hash}
                    className="relative overflow-hidden"
                    variants={mobileLinkVars}
                  >
                    <Link
                      href={href}
                      className={cn(
                        'flex items-baseline gap-3 py-1 font-display text-5xl font-extrabold lowercase leading-none tracking-[-0.02em] text-background/80 transition-colors [font-stretch:90%] hover:text-background',
                        activeSection === name && 'text-flame',
                      )}
                      onClick={() => {
                        posthog.capture('NAVIGATED_SECTION', {
                          section: name,
                          source: 'mobile_menu',
                        });
                        setActive(name);
                        setTimeOfLastClick(Date.now());
                        setIsOpen(false);
                      }}
                    >
                      <span className="font-mono text-xs tracking-widest text-flame">
                        0{index + 1}
                      </span>
                      {name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className="flex flex-col gap-2 font-mono text-xs uppercase tracking-wider text-background/60"
                variants={{
                  initial: { opacity: 0, transition: { duration: 0.15 } },
                  open: { opacity: 1, transition: { duration: 0.2 } },
                }}
              >
                <a
                  href={`mailto:${contactInformation.businessEmail}`}
                  onClick={() =>
                    posthog.capture('EMAIL_CONTACT_CLICKED', { source: 'mobile_menu' })
                  }
                >
                  {contactInformation.businessEmail}
                </a>
                <span>Porto, Portugal 🇵🇹</span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
