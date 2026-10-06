import { Reveal } from '@/components/motion/reveal';
import { ProjectCard } from '@/components/project-card';
import { ui } from '@/content/profile';
import { projects } from '@/content/projects';

// Spec 7.2: array order is display order and the first three are the bento. Three cells
// (1 tall + 2) fill the 2 x 2 grid exactly, so there is no empty tile.
const bento = projects.slice(0, 3);
const more = projects.slice(3);

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <Reveal>
        <h2 className="text-2xl font-bold md:text-3xl">{ui.projectsTitle}</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:grid-rows-2">
          {bento.map((p, i) => (
            <ProjectCard key={p.slug} project={p} image tall={i === 0} highPriority={i === 0} />
          ))}
        </div>
      </Reveal>
      <Reveal className="mt-16">
        <h3 className="text-xl font-bold">{ui.moreProjects}</h3>
        {/* One column below lg. From lg a 6-column grid: the first three cards span 2 and the last
            two span 3, so neither row has a hole and each row's cards share one height. */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-6">
          {more.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              heading="h4"
              className={i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
