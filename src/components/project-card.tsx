import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { ui } from '@/content/profile';
import type { Project } from '@/content/types';

// Rendered width of a bento cell: the container is max-w-6xl with 2 columns from lg, 1 below.
const SIZES =
  '(min-width:1152px) 536px, (min-width:1024px) calc((100vw - 5rem) / 2), (min-width:768px) calc(100vw - 4rem), calc(100vw - 2rem)';

// Whole card is the link, so nothing inside it is interactive. Only translate, scale and
// border-color transition: listing outline-color would fade the focus ring in.
export function ProjectCard({
  project,
  image = false,
  tall = false,
  highPriority = false,
  heading: Heading = 'h3',
}: {
  project: Project;
  image?: boolean;
  tall?: boolean;
  highPriority?: boolean;
  heading?: 'h3' | 'h4';
}) {
  const cover = image ? project.cover : undefined;
  const copy = tall ? 'text-base' : 'text-sm';
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex flex-col overflow-hidden rounded border border-line bg-card transition-[translate,scale,border-color] duration-200 hover:border-accent motion-safe:hover:-translate-y-[2px] motion-safe:active:scale-[0.98]${tall ? ' lg:row-span-2' : ''}`}
    >
      {cover ? (
        // The covers are axis-labelled plots and a dashboard: contain, never crop. The tall card
        // keeps its aspect below lg and soaks up the spare row height from lg, so the plot sits
        // centred in a plate; the 2:1 frames next to it keep that spare height down.
        <div
          className={`relative border-b border-line bg-bg ${tall ? 'aspect-[6/5] max-h-[26rem] lg:aspect-auto lg:max-h-none lg:min-h-80 lg:flex-1' : 'aspect-video lg:aspect-[2/1]'}`}
        >
          {/* The bento sits below the fold, so no preload: a head preload would compete with
              the hero LCP image. fetchPriority only raises it once the browser fetches it. */}
          <Image
            src={cover}
            alt=""
            fill
            sizes={SIZES}
            fetchPriority={highPriority ? 'high' : undefined}
            className="object-contain p-3"
          />
        </div>
      ) : null}
      <div className={`flex flex-col p-5 ${tall ? 'md:p-8' : 'md:p-6'}${tall && cover ? '' : ' flex-1'}`}>
        <p className="font-mono text-xs text-accent">{project.category}</p>
        <Heading
          className={`mt-2 min-w-0 break-words font-bold leading-snug ${tall ? 'text-xl md:text-3xl' : 'text-lg'}`}
        >
          {project.title}
        </Heading>
        <p className="mt-2 font-mono text-xs text-muted">
          {project.context} <span className="whitespace-nowrap">&middot; {project.year}</span>
        </p>
        <p className={`mt-1 ${copy}`}>{project.role}</p>
        <p className={`mt-3 text-muted ${copy}`}>{project.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-5 font-mono text-sm text-accent group-hover:underline group-hover:underline-offset-4">
          {ui.viewProject}
          <ArrowUpRightIcon size={16} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
