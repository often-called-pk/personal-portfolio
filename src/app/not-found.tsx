import type { Metadata } from 'next';
import Link from 'next/link';
import { profile, ui } from '@/content/profile';

export const metadata: Metadata = { title: `${ui.notFoundTitle} | ${profile.name}` };

// Server component. It renders inside the root layout, so the nav is already above it. Same
// container, h1 scale and primary button as the rest of the site, in place of Next's default 404.
export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-24">
      <h1 className="text-balance text-3xl font-extrabold tracking-[-0.035em] md:text-4xl lg:text-5xl">
        {ui.notFoundTitle}
      </h1>
      <p className="mt-4 max-w-[65ch] text-pretty text-base text-muted md:mt-6 md:text-lg">{ui.notFoundText}</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center rounded bg-accent px-6 font-mono text-sm font-medium text-on-accent transition-[background-color] hover:bg-accent-hover motion-safe:active:scale-[0.98] md:mt-10"
      >
        {ui.notFoundHome}
      </Link>
    </main>
  );
}
