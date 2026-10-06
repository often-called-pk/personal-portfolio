import type { Icon } from '@phosphor-icons/react';
import {
  FlagCheckeredIcon,
  GameControllerIcon,
  PersonSimpleRunIcon,
  RacquetIcon,
} from '@phosphor-icons/react/ssr';
import { Reveal } from '@/components/motion/reveal';
import { hobbies } from '@/content/hobbies';
import { ui } from '@/content/profile';

// Keyed by the icon name stored in src/content/hobbies.ts.
const icons: Record<string, Icon> = {
  FlagCheckered: FlagCheckeredIcon,
  GameController: GameControllerIcon,
  Racquet: RacquetIcon,
  PersonSimpleRun: PersonSimpleRunIcon,
};

export function Hobbies() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <h2 className="text-3xl font-extrabold leading-none tracking-[-0.03em] md:text-4xl lg:text-5xl">{ui.hobbiesTitle}</h2>
        <ul className="mt-10 flex flex-wrap gap-8 md:mt-14">
          {hobbies.map((h) => {
            const HobbyIcon = icons[h.icon];
            return (
              <li key={h.label} className="flex items-center gap-3">
                {HobbyIcon ? <HobbyIcon size={24} aria-hidden="true" className="text-accent" /> : null}
                <span>{h.label}</span>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
