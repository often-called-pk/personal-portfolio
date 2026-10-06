import { Reveal } from '@/components/motion/reveal';
import { education } from '@/content/education';
import { ui } from '@/content/profile';

export function Education() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <Reveal>
        <h2 className="text-2xl font-bold md:text-3xl">{ui.educationTitle}</h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {education.map((e) => (
            <li key={e.school} className="rounded border border-line bg-card p-6">
              <p className="font-mono text-sm tabular-nums text-muted">
                {e.start} - {e.end}
              </p>
              <h3 className="mt-3 min-w-0 break-words text-lg font-bold leading-snug">{e.school}</h3>
              <p className="mt-1 font-semibold">{e.degree}</p>
              <div className="mt-4 flex flex-col gap-3 text-muted">
                {e.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
