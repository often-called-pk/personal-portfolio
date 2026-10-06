import { Reveal } from '@/components/motion/reveal';
import { ui } from '@/content/profile';
import { skills } from '@/content/skills';

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <Reveal>
        <h2 className="text-2xl font-bold md:text-3xl">{ui.skillsTitle}</h2>
        <dl className="mt-8 grid grid-cols-1 gap-8">
          {skills.map((group) => (
            <div key={group.label} className="grid grid-cols-1 gap-3 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8">
              <dt className="font-semibold">{group.label}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded border border-line px-2 py-1 font-mono text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
