import { Reveal } from '@/components/motion/reveal';
import { ui } from '@/content/profile';
import { skills } from '@/content/skills';

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <h2 className="text-3xl font-extrabold leading-none tracking-[-0.03em] md:text-4xl lg:text-5xl">{ui.skillsTitle}</h2>
        <dl className="mt-10 grid grid-cols-1 gap-8 md:mt-14">
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
