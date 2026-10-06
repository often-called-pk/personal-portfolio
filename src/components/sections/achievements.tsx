import { Reveal } from '@/components/motion/reveal';
import { achievements } from '@/content/achievements';
import { ui } from '@/content/profile';

export function Achievements() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <h2 className="text-3xl font-extrabold leading-none tracking-[-0.03em] md:text-4xl lg:text-5xl">{ui.achievementsTitle}</h2>
        {/* One rule above each row and none below the last, so the list is not boxed in. */}
        <ul className="mt-10 md:mt-14">
          {achievements.map((a) => (
            <li key={a.text} className="flex items-baseline gap-4 border-t border-line py-4">
              <span className="w-20 shrink-0 font-mono text-sm tabular-nums text-muted">{a.year}</span>
              <span className="min-w-0 break-words">{a.text}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
