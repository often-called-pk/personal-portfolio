import { Stagger, StaggerItem } from '@/components/motion/stagger';
import { profile, ui } from '@/content/profile';

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-10 pt-10 md:px-8 md:pb-16 md:pt-20">
      <Stagger>
        <StaggerItem>
          <p data-eyebrow className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {profile.eyebrow}
          </p>
        </StaggerItem>
        {/* The h1 and the sub sit outside StaggerItem on purpose: they are the LCP candidates (the sub is the larger text block on most phones), so neither starts at opacity 0. Full container width: the 2-line split needs 13.93em, so the h1 holds 2 lines from md up (72px in the 1088px column at xl); phones keep 30px over 3 lines (10.12em split). */}
        <h1 className="mt-4 text-balance text-3xl font-extrabold leading-[0.95] tracking-[-0.04em] md:mt-6 md:text-5xl lg:text-6xl xl:text-7xl">
          {profile.headline}
        </h1>
        <p className="mt-6 max-w-[52ch] text-pretty text-lg text-muted md:mt-8 md:text-xl">{profile.sub}</p>
        <StaggerItem className="mt-8 flex flex-wrap gap-3 md:mt-10">
          <a
            href="#projects"
            className="inline-flex h-12 items-center rounded bg-accent px-6 font-mono text-sm font-medium text-on-accent transition-[background-color] hover:bg-accent-hover motion-safe:active:scale-[0.98]"
          >
            {ui.viewProjects}
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center rounded border border-muted px-6 font-mono text-sm font-medium transition-[color,border-color] hover:border-accent hover:text-accent motion-safe:active:scale-[0.98]"
          >
            {ui.getInTouch}
          </a>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
