import { Reveal } from '@/components/motion/reveal';
import { profile, ui } from '@/content/profile';

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <Reveal>
        <h2 className="text-2xl font-bold md:text-3xl">{ui.aboutTitle}</h2>
        <div className="mt-6 flex max-w-[65ch] flex-col gap-4">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="mt-4 font-mono text-sm">
            <span className="text-accent">{ui.nowLabel}</span> {profile.now}
          </p>
          <p className="text-muted">{profile.availability}</p>
        </div>
      </Reveal>
    </section>
  );
}
