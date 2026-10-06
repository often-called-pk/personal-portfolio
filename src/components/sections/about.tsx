import Image from 'next/image';
import { Reveal } from '@/components/motion/reveal';
import { profile, ui } from '@/content/profile';

// Stage panel split 7 / 5 from lg: copy with the Now and availability cards left, portrait right. One column below.
export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
      <Reveal className="rounded border border-line bg-card p-6 md:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <h2 className="text-3xl font-extrabold leading-none tracking-[-0.03em] md:text-4xl lg:text-5xl">
              {ui.aboutTitle}
            </h2>
            <div className="mt-10 flex max-w-[65ch] flex-col gap-4 md:mt-14">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded border border-line bg-bg p-5">
                <p className="font-mono text-xs text-accent">{ui.nowLabel}</p>
                <p className="mt-2">{profile.now}</p>
              </div>
              <div className="rounded border border-line bg-bg p-5 text-muted">
                <p>{profile.availability}</p>
              </div>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-5">
            {/* Below the fold: default lazy loading, so the hero h1 stays the LCP element. */}
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded border border-line lg:ml-auto">
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                fill
                sizes="(min-width:640px) 24rem, calc(100vw - 5rem)"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
