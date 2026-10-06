import { Reveal } from '@/components/motion/reveal';
import { experience } from '@/content/experience';
import { ui } from '@/content/profile';

// Motorsport first, so the stacked mobile order matches the two columns from lg.
const groups = ['motorsport', 'analytics'] as const;

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <Reveal>
        <h2 className="text-2xl font-bold md:text-3xl">{ui.experienceTitle}</h2>
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
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
                      <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-muted">
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
