import Image from 'next/image';
import { Stagger, StaggerItem } from '@/components/motion/stagger';
import { profile, ui } from '@/content/profile';

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-8 pt-6 md:gap-12 md:px-8 md:pb-16 md:pt-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
      <Stagger className="min-w-0">
        <StaggerItem>
          <p data-eyebrow className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {profile.eyebrow}
          </p>
        </StaggerItem>
        {/* Outside StaggerItem on purpose: the h1 is the LCP text and never starts at opacity 0.
            Size follows the column it sits in so it holds 2 lines from md up (3 on phones): the
            2-line split needs 13.93em, the 3-line split 10.12em, so lg (narrow column) uses 4xl. */}
        <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-[-0.035em] md:mt-4 md:text-5xl lg:text-4xl xl:text-5xl">
          {profile.headline}
        </h1>
        <StaggerItem>
          <p className="mt-4 max-w-[52ch] text-pretty text-base text-muted md:mt-6 md:text-lg">{profile.sub}</p>
        </StaggerItem>
        <StaggerItem className="mt-6 flex flex-wrap gap-3 md:mt-8">
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
      {/* Static: the photo is the LCP image, so no opacity animation. `preload` is the Next 16 name
          for the old `priority`; it alone starts the request at Low, `fetchPriority` lifts it to High.
          Size: w-40 (160 x 200) below md so the metric strip stays near the fold on phones, then
          up to max-w-sm (384 x 480) below lg, and the 20rem grid column at lg. */}
      <div className="relative aspect-[4/5] w-40 max-w-sm overflow-hidden rounded border border-line md:w-full">
        <Image
          src={profile.photo.src}
          alt={profile.photo.alt}
          fill
          preload
          fetchPriority="high"
          sizes="(min-width:1024px) 20rem, (min-width:768px) 24rem, 10rem"
          className="object-cover"
        />
      </div>
    </section>
  );
}
