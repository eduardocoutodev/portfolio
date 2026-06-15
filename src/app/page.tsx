import AboutMe from '@/components/about-me';
import BlogSection from '@/components/blog-section';
import ContactSection from '@/components/contact-section';
import Experience from '@/components/experience';
import Hero from '@/components/hero';
import Marquee from '@/components/marquee';
import Projects from '@/components/projects';
import Skills from '@/components/skills';

export default function Home() {
  return (
    <main className="relative z-[1] flex w-full grow flex-col overflow-x-clip">
      <Hero />
      <Marquee />
      <AboutMe />
      <BlogSection />
      <Projects />
      <Skills />
      <Experience />
      <ContactSection />
    </main>
  );
}
