'use client';

import { useActiveSectionContext } from '@/context/active-section-context';
import { contactInformation, links } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
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
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  const mobileLinkVars = {
    initial: {
      y: '30vh',
      transition: {
        duration: 0.5,
        ease: [0.37, 0, 0.63, 1],
      },
    },
    open: {
      y: 0,
      transition: {
        ease: [0, 0.55, 0.45, 1],
        duration: 0.7,
      },
    },
  };

  return (
    <header className="z-[100]" data-testid="mobile-menu-container">
      <div className="fixed left-0 right-0 top-0 z-[105] flex h-14 items-center justify-between border-b border-foreground/15 bg-background/85 px-5 backdrop-blur-md">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.18em]"
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
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.5 } }} // Delay the exit to match the menu closing
            >
              <button
                onClick={() => setIsOpen(false)}
                data-testid="close-mobile-menu-button"
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center border border-background/40 text-background"
              >
                <X />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }} // Delay the exit to match the menu opening
            >
              <button
                onClick={() => setIsOpen(true)}
                data-testid="open-mobile-menu-button"
                aria-label="Open menu"
                className="inline-flex h-10 w-10 items-center justify-center border border-foreground bg-background text-foreground"
              >
                <Menu />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed left-0 top-0 z-[108] h-screen w-full origin-top bg-foreground text-background"
            data-testid="mobile-menu-expanded"
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: 1,
              transition: {
                duration: 0.5,
                ease: [0.12, 0, 0.39, 0],
              },
            }}
            exit={{
              scaleY: 0,
              transition: {
                delay: 0.5,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            <nav className="flex h-full flex-col justify-between px-6 pb-10 pt-24">
              <motion.ul
                className="flex flex-col gap-1"
                data-testid="mobile-menu-expanded-options-container"
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
              >
                {links.map(({ name, hash, href }, index) => (
                  <div key={hash} className="overflow-hidden">
                    <motion.li key={hash} className="relative" variants={mobileLinkVars}>
                      <Link
                        href={href}
                        className={cn(
                          'flex items-baseline gap-3 py-1 font-display text-5xl font-light uppercase leading-none text-background/80 transition-colors hover:text-background',
                          activeSection === name && 'text-flame',
                        )}
                        onClick={() => {
                          setActive(name);
                          setTimeOfLastClick(Date.now());
                          setIsOpen(false);
                        }}
                      >
                        <span className="font-sans text-xs tracking-widest text-flame">
                          0{index + 1}
                        </span>
                        {name}
                      </Link>
                    </motion.li>
                  </div>
                ))}
              </motion.ul>

              <motion.div
                className="flex flex-col gap-2 text-xs uppercase tracking-wider text-background/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.8 } }}
                exit={{ opacity: 0 }}
              >
                <a href={`mailto:${contactInformation.businessEmail}`}>
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
