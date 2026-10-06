import { About } from '@/components/sections/about';
import { Achievements } from '@/components/sections/achievements';
import { Contact, Footer } from '@/components/sections/contact';
import { Education } from '@/components/sections/education';
import { Experience } from '@/components/sections/experience';
import { Hero } from '@/components/sections/hero';
import { Hobbies } from '@/components/sections/hobbies';
import { Method } from '@/components/sections/method';
import { Metrics } from '@/components/sections/metrics';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Metrics />
        <About />
        <Method />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Achievements />
        <Hobbies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
