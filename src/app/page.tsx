import { About } from '@/components/sections/about';
import { Hero } from '@/components/sections/hero';
import { Metrics } from '@/components/sections/metrics';

export default function Home() {
  return (
    <main>
      <Hero />
      <Metrics />
      <About />
    </main>
  );
}
