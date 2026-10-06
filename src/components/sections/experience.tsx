import { Reveal } from '@/components/motion/reveal';
import { experience } from '@/content/experience';
import { ui } from '@/content/profile';

// Motorsport first, so the stacked mobile order matches the two columns from lg.
const groups = ['motorsport', 'analytics'] as const;

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <h2 className="text-3xl font-extrabold leading-none tracking-[-0.03em] md:text-4xl lg:text-5xl">{ui.experienceTitle}</h2>
        <div className="mt-10 grid grid-cols-1 gap-12 md:mt-14 lg:grid-cols-2">
          {groups.map((group) => (
            <div key={group} className="min-w-0">
              <h3 className="text-xl font-bold">{ui.experienceGroups[group]}</h3>
              <ul className="mt-4">
                {experience
                  .filter((e) => e.group === group)
                  .map((e) => (
                    <li key={`${e.company}-${e.start}`} className="border-t border-line py-6">
                      <p className="font-mono text-sm tabular-nums text-muted">
                        {e.start} - {e.end}
                      </p>
                      <h4 className="mt-2 min-w-0 break-words text-lg font-bold leading-snug">{e.title}</h4>
                      <p className="mt-1 text-muted">
                        {e.company}, {e.location}
                      </p>
                      <ul className="mt-3 max-w-[65ch] list-disc space-y-2 pl-5 marker:text-muted">
                        {e.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
