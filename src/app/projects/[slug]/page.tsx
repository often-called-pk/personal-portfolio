import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { profile, ui } from '@/content/profile';
import { projects } from '@/content/projects';
import type { Project } from '@/content/types';

type Props = { params: Promise<{ slug: string }> };

// Unknown slugs are a 404, never rendered on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} | ${profile.name}`, description: p.summary } : {};
}

// Frame width: the container is max-w-6xl (1152px) with px-8 from md, px-4 below.
const SIZES = '(min-width:1152px) 1088px, (min-width:768px) calc(100vw - 4rem), calc(100vw - 2rem)';

// No-break space + middle dot + space: a wrapped meta row keeps each dot on the line of the part before it.
const SEP = String.fromCodePoint(0xa0, 0xb7) + ' ';

// Label rail + content, the same two-column row as the Skills section. The minmax(0,1fr)
// track lets the content shrink, so only break-words has to deal with long tokens.
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-3 py-8 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="max-w-[65ch] break-words">{children}</div>
    </section>
  );
}

// Same hover and press motion as ProjectCard; only translate, scale and border-color
// transition, so the focus ring is never faded in.
function Adjacent({ project, label, next = false }: { project: Project; label: string; next?: boolean }) {
  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        className={`flex h-full flex-col rounded border border-line bg-card p-5 transition-[translate,scale,border-color] duration-200 hover:border-accent motion-safe:hover:-translate-y-[2px] motion-safe:active:scale-[0.98]${next ? ' md:text-right' : ''}`}
      >
        <span className={`flex items-center gap-2 font-mono text-xs text-muted${next ? ' md:justify-end' : ''}`}>
          {next ? null : <ArrowLeftIcon size={16} aria-hidden="true" />}
          {label}
          {next ? <ArrowRightIcon size={16} aria-hidden="true" /> : null}
        </span>
        <span className="mt-2 min-w-0 break-words font-bold leading-snug">{project.title}</span>
      </Link>
    </li>
  );
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const project = projects[i];
  const n = projects.length;
  const meta = [project.year, project.context, project.role, project.tools.join(', ')].join(SEP);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-4 md:px-8 md:pt-8">
      <Link
        href="/#projects"
        className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-muted transition-[color] hover:text-fg"
      >
        <ArrowLeftIcon size={16} aria-hidden="true" />
        {ui.allProjects}
      </Link>
      <header className="mt-4 md:mt-8">
        <h1 className="break-words text-balance text-3xl font-extrabold tracking-[-0.035em] md:text-4xl lg:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-[65ch] text-pretty text-base text-muted md:mt-6 md:text-lg">{project.summary}</p>
        <p className="mt-6 font-mono text-sm tabular-nums text-muted">{meta}</p>
      </header>
      <div className="mt-10 divide-y divide-line border-y border-line md:mt-14">
        <Block title={ui.overviewTitle}>
          <p>{project.overview}</p>
        </Block>
        <Block title={ui.contributionsTitle}>
          <ul className="list-disc space-y-3 pl-5 marker:text-muted">
            {project.contributions.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Block>
        <Block title={ui.resultTitle}>
          <p>{project.result}</p>
        </Block>
        <Block title={ui.toolsTitle}>
          <ul className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <li key={tool} className="rounded border border-line px-2 py-1 font-mono text-sm">
                {tool}
              </li>
            ))}
          </ul>
        </Block>
      </div>
      <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
        {project.images.length ? (
          <div className="space-y-10">
            {project.images.map((img, k) => (
              <figure key={img.src}>
                {/* The plots are axis-labelled: contain, never crop. Ratios run from 1.2:1 to 2.5:1
                    and 16:9 is the middle, so no image is letterboxed hard in either direction.
                    4:3 below md keeps the squarest plot from shrinking to a thumbnail on phones.
                    alt is empty on purpose: the figcaption below already names the figure. */}
                <div className="relative aspect-[4/3] rounded border border-line bg-card md:aspect-video">
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes={SIZES}
                    fetchPriority={k === 0 ? 'high' : undefined}
                    className="object-contain p-3"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-muted">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        ) : null}
        {project.links.length ? (
          <ul className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded border border-muted px-6 font-mono text-sm font-medium transition-[color,border-color] hover:border-accent hover:text-accent motion-safe:active:scale-[0.98]"
                >
                  {link.label}
                  <ArrowUpRightIcon size={20} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Adjacent project={projects[(i - 1 + n) % n]} label={ui.prevProject} />
          <Adjacent project={projects[(i + 1) % n]} label={ui.nextProject} next />
        </ul>
      </div>
    </main>
  );
}
