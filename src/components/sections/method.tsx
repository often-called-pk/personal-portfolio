import { Reveal } from '@/components/motion/reveal';
import { Stagger, StaggerItem } from '@/components/motion/stagger';
import { method } from '@/content/method';
import { ui } from '@/content/profile';

// A rail, not cards: each step is named and the ol carries the order, so no step numbers.
export function Method() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <h2 className="text-3xl font-extrabold leading-none tracking-[-0.03em] md:text-4xl lg:text-5xl">
          {ui.methodTitle}
        </h2>
      </Reveal>
      <Stagger inView>
        <ol className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {method.map((step) => (
            <li key={step.title} className="min-w-0">
              <StaggerItem className="h-full border-t border-line pt-6">
                <h3 className="text-xl font-bold leading-tight md:text-2xl">{step.title}</h3>
                <p className="mt-3 text-muted">{step.text}</p>
              </StaggerItem>
            </li>
          ))}
        </ol>
      </Stagger>
    </section>
  );
}
