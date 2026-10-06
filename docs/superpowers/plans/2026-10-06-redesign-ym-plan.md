# Redesign YM Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. One task per dispatch.

**Goal:** Restage the live Pit Wall site per the approved redesign spec: floating nav, display hero, stat cards, About stage, How I work rail, staggered grids, section rhythm, Contact stage.
**Spec:** `docs/superpowers/specs/2026-10-06-redesign-ym-style.md` (approved 2026-10-06; owner answers Q1-Q5 all "yes"). Base spec `2026-10-05-portfolio-site-design.md` still binds everything the redesign spec does not name.
**Stack:** Next.js 16.3 App Router, React 19.2, TS strict, Tailwind v4 (`@tailwindcss/postcss`, tokens in `src/app/globals.css`), `motion` 14 (`motion/react`), `@phosphor-icons/react`, vitest. npm.
**Workdir:** `D:\personal-portfolio\.claude\worktrees\portfolio-build`, branch `redesign-ym`. Never push, never touch `main`.
**Roles:** Opus orchestrates and verifies. Builders and reviewers are Sonnet subagents.

## Global Constraints

- NO em dash (U+2014) or en dash (U+2013) anywhere: code, copy, comments, commit messages. A hook blocks tool calls that contain one. Use a comma, colon, full stop or plain hyphen.
- Commits: one conventional commit per task, one line, no attribution lines, no trailers.
- Load first: `andrej-karpathy-skills:karpathy-guidelines`, `ponytail:ponytail`, `design-taste-frontend`, `vercel-react-best-practices`.
- Copy lives in `src/content/*.ts`. Components hold no copy. The only content changes in this plan are in Task 3.
- Tokens only: `bg-bg`, `bg-card`, `text-fg`, `text-muted`, `border-line`, `bg-accent`, `text-accent`, `text-on-accent`, `border-accent`. No raw hex outside `globals.css`. No gradients, glows, `shadow-*`, `#000`, `#fff`. Radius: `rounded` (4 px) only.
- Motion only inside the existing `'use client'` leaves in `src/components/motion/`. Every motion respects reduced motion (`MotionConfig reducedMotion="user"`, `motion-safe:` on hover/active transforms).
- Hard bans (owner): sound, pet, scroll cue, numbered steps, serif fonts, a second accent colour, marquee, parallax, scroll listeners.
- Confidentiality (base spec 7.5) is hard: no new facts, numbers or names beyond Task 3's four lines.
- `AGENTS.md`: this Next.js differs from training data; read `node_modules/next/dist/docs/` before using any Next API you have not seen in this repo. Existing patterns (`next/image` with `fill` + `sizes`, `preload`) are safe to copy.
- Gate per task: `npm run build` exits 0 (its `prebuild` runs `npm run lint` and `npm test`). Report the last lines of its output.
- No component tests: the repo has no DOM test setup (vitest runs content tests only). UI tasks are verified by build plus the orchestrator's headless captures.

## File map

```
src/components/motion/stagger.tsx   Task 1   inView prop
src/components/motion/reveal.tsx    Task 1   y 24, duration 0.7
src/components/nav.tsx              Task 2   floating bar
src/app/globals.css                 Task 2   scroll-padding-top 5rem
src/content/types.ts, method.ts, profile.ts; tests/content.test.ts   Task 3
src/components/sections/hero.tsx, about.tsx      Task 4
src/components/sections/metrics.tsx              Task 5
src/components/sections/method.tsx, src/app/page.tsx   Task 6
src/components/sections/projects.tsx, src/components/project-card.tsx   Task 7
src/components/sections/experience.tsx, skills.tsx, education.tsx, achievements.tsx, hobbies.tsx, contact.tsx   Task 8
```

Shared class strings (used verbatim in Tasks 4, 6, 7, 8):
- Section wrapper: `mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32`
- Section h2: `text-3xl font-extrabold leading-none tracking-[-0.03em] md:text-4xl lg:text-5xl`
- h2 to first content block: `mt-10 md:mt-14`
- Stage panel: `rounded border border-line bg-card p-6 md:p-10 lg:p-14`

### Task 1: Motion primitives

**Files:** `src/components/motion/stagger.tsx`, `src/components/motion/reveal.tsx`.

- [ ] Replace `src/components/motion/stagger.tsx` with exactly:

```tsx
'use client';
import { MotionConfig, motion, stagger, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

// Motion 14 deprecates `staggerChildren`; `delayChildren: stagger(s)` gives the same 0, s, 2s, ... delays.
const container: Variants = { hidden: {}, show: { transition: { delayChildren: stagger(0.06) } } };
const item: Variants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

// inView plays the set once it scrolls into view (grids below the hero); without it the set plays
// on mount (hero). amount 0.1 matches Reveal, so tall stacked grids on phones still trigger.
// Variants reach StaggerItem through plain elements (ul, ol, li) in between.
export function Stagger({
  children,
  className,
  inView = false,
}: {
  children: ReactNode;
  className?: string;
  inView?: boolean;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial="hidden"
        animate={inView ? undefined : 'show'}
        whileInView={inView ? 'show' : undefined}
        viewport={inView ? { once: true, amount: 0.1 } : undefined}
        variants={container}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
```

- [ ] In `src/components/motion/reveal.tsx` change `initial={{ opacity: 0, y: 16 }}` to `initial={{ opacity: 0, y: 24 }}` and `duration: 0.5` to `duration: 0.7`. Nothing else.
- [ ] `npm run build` exits 0. Commit: `feat(motion): add in-view stagger, deepen reveal`

### Task 2: Floating nav

**Files:** `src/components/nav.tsx`, `src/app/globals.css`.

- [ ] In `src/components/nav.tsx` keep the imports, state, the route-change close and the Escape effect exactly as they are. Replace only the returned JSX (from `return (` to the end of the component) with:

```tsx
  return (
    // Floating bar: the header is a transparent sticky strip and only the bar takes pointer events.
    <header className="pointer-events-none sticky top-0 z-40 px-3 pt-3 md:px-6">
      <div className="pointer-events-auto relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded border border-line bg-bg/80 px-3 backdrop-blur md:px-5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex min-h-11 items-center font-mono text-sm font-medium uppercase tracking-[0.12em]"
        >
          {profile.name}
        </Link>
        <div className="flex items-center gap-2 lg:gap-8">
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {ui.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-mono text-sm text-muted transition-[color] hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="/cv.pdf"
            download={ui.cvFilename}
            className="inline-flex h-11 items-center whitespace-nowrap rounded bg-accent px-3 font-mono text-sm font-medium text-on-accent transition-[background-color] hover:bg-accent-hover motion-safe:active:scale-[0.98] sm:px-4"
          >
            {ui.cv}
          </a>
          <button
            ref={toggle}
            type="button"
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label={ui.menu}
            onClick={() => setOpen((o) => !o)}
            className="grid size-11 place-items-center rounded border border-muted transition-[color,border-color] hover:border-accent hover:text-accent motion-safe:active:scale-[0.98] lg:hidden"
          >
            {open ? <XIcon size={20} aria-hidden="true" /> : <ListIcon size={20} aria-hidden="true" />}
          </button>
        </div>
        {/* Drops under the bar instead of pushing the page down. Opaque: backdrop-blur does not nest. */}
        <nav
          id="nav-sheet"
          hidden={!open}
          className="absolute inset-x-0 top-full mt-2 rounded border border-line bg-bg lg:hidden"
        >
          <ul className="px-4">
            {ui.nav.map((item) => (
              <li key={item.href} className="border-b border-line last:border-b-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center font-mono text-base"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] In `src/app/globals.css` replace the line
  `html { scroll-behavior: smooth; scroll-padding-top: 4rem; } /* sticky nav is h-16 */`
  with
  `html { scroll-behavior: smooth; scroll-padding-top: 5rem; } /* floating nav: 12px offset + 56px bar + air */`
- [ ] `npm run build` exits 0. Commit: `feat(nav): floating contained nav bar`

### Task 3: Content for the redesign

**Files:** `src/content/types.ts`, `src/content/method.ts` (new), `src/content/profile.ts`, `tests/content.test.ts`.

- [ ] `src/content/types.ts`: append `export type MethodStep = { title: string; text: string };`
- [ ] Create `src/content/method.ts` with exactly:

```ts
import type { MethodStep } from './types';

// How I work rail (redesign spec 6.5). Every clause restates existing content; owner approved the copy 2026-10-06.
export const method: MethodStep[] = [
  {
    title: 'Measure the car',
    text: 'Static, dynamic and track characterisation first, as in the UTAC Kia Niro test plan.',
  },
  {
    title: 'Model it',
    text: 'Vehicle models built from that data: IPG CarMaker for UTAC, a 23-state optimal-control model for the thesis.',
  },
  {
    title: 'Prove the model',
    text: 'Checked against measured cornering and slalom runs; every thesis model change gated behind 8 validation scripts and 26 unit tests.',
  },
  {
    title: 'Run it trackside',
    text: 'Post-session data export and analysis fed back to driver and coach; data and strategy relayed to drivers in live sessions.',
  },
];
```

- [ ] `src/content/profile.ts`, inside `ui`: change `nowLabel: 'Now:',` to `nowLabel: 'Now',`; add `methodTitle: 'How I work',` on the line after `nowLabel`.
- [ ] `tests/content.test.ts`: add `import { method } from '../src/content/method';` after the hobbies import; add `method` to the object in `const all = JSON.stringify({ ... })` so the dash and deny-list checks cover it; add this test after the `8 roles, 2 bullets each` test:

```ts
// The rail is 4 columns at lg and 2 x 2 at md: any other count leaves a hole.
it('method rail has exactly 4 steps', () => {
  expect(method).toHaveLength(4);
});
```

- [ ] `npm test` passes, then `npm run build` exits 0. Commit: `feat(content): add How I work steps and Now label`

### Task 4: Display hero, portrait into About

**Files:** `src/components/sections/hero.tsx`, `src/components/sections/about.tsx`.

- [ ] Replace `src/components/sections/hero.tsx` with exactly:

```tsx
import { Stagger, StaggerItem } from '@/components/motion/stagger';
import { profile, ui } from '@/content/profile';

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-10 pt-10 md:px-8 md:pb-16 md:pt-20">
      <Stagger>
        <StaggerItem>
          <p data-eyebrow className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {profile.eyebrow}
          </p>
        </StaggerItem>
        {/* Outside StaggerItem on purpose: the h1 is the LCP element and never starts at opacity 0.
            Full container width: the 2-line split needs 13.93em, so it holds 2 lines from md up
            (72px in the 1088px column at xl); phones keep 30px over 3 lines (10.12em split). */}
        <h1 className="mt-4 text-balance text-3xl font-extrabold leading-[0.95] tracking-[-0.04em] md:mt-6 md:text-5xl lg:text-6xl xl:text-7xl">
          {profile.headline}
        </h1>
        <StaggerItem>
          <p className="mt-6 max-w-[52ch] text-pretty text-lg text-muted md:mt-8 md:text-xl">{profile.sub}</p>
        </StaggerItem>
        <StaggerItem className="mt-8 flex flex-wrap gap-3 md:mt-10">
          <a
            href="#projects"
            className="inline-flex h-12 items-center rounded bg-accent px-6 font-mono text-sm font-medium text-on-accent transition-[background-color] hover:bg-accent-hover motion-safe:active:scale-[0.98]"
          >
            {ui.viewProjects}
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center rounded border border-muted px-6 font-mono text-sm font-medium transition-[color,border-color] hover:border-accent hover:text-accent motion-safe:active:scale-[0.98]"
          >
            {ui.getInTouch}
          </a>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
```

- [ ] Replace `src/components/sections/about.tsx` with exactly:

```tsx
import Image from 'next/image';
import { Reveal } from '@/components/motion/reveal';
import { profile, ui } from '@/content/profile';

// Stage panel split 7 / 5 from lg: copy left; portrait, Now and availability right. One column below.
export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
      <Reveal className="rounded border border-line bg-card p-6 md:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <h2 className="text-3xl font-extrabold leading-none tracking-[-0.03em] md:text-4xl lg:text-5xl">
              {ui.aboutTitle}
            </h2>
            <div className="mt-10 flex max-w-[65ch] flex-col gap-4 md:mt-14">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-4 lg:col-span-5">
            {/* Below the fold: default lazy loading, so the hero h1 stays the LCP element. */}
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded border border-line">
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                fill
                sizes="(min-width:640px) 24rem, calc(100vw - 5rem)"
                className="object-cover"
              />
            </div>
            <div className="rounded border border-line bg-bg p-5">
              <p className="font-mono text-xs text-accent">{ui.nowLabel}</p>
              <p className="mt-2">{profile.now}</p>
            </div>
            <div className="rounded border border-line bg-bg p-5 text-muted">
              <p>{profile.availability}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] `npm run build` exits 0. Commit: `feat(hero): full-width display headline, portrait into About stage`

### Task 5: Stat cards

**Files:** `src/components/sections/metrics.tsx`.

- [ ] Replace `src/components/sections/metrics.tsx` with exactly:

```tsx
import { CountUp } from '@/components/motion/count-up';
import { Stagger, StaggerItem } from '@/components/motion/stagger';
import { profile } from '@/content/profile';

export function Metrics() {
  return (
    <Stagger inView className="mx-auto max-w-6xl px-4 md:px-8">
      {/* Three columns at every width: stacked, two of the three facts would drop below the fold on
          phones. The first card (P1) is the page's one solid accent surface besides buttons. */}
      <ul className="grid grid-cols-3 gap-2 sm:gap-4">
        {profile.metrics.map((m, i) => (
          <li key={m.label} className="min-w-0">
            <StaggerItem
              className={`h-full rounded border p-3 sm:p-6 lg:p-8 ${i === 0 ? 'border-accent bg-accent text-on-accent' : 'border-line bg-card'}`}
            >
              <p className="font-mono text-3xl font-medium leading-none tracking-[-0.04em] sm:text-5xl lg:text-7xl">
                <CountUp value={m.value} />
              </p>
              <p
                className={`mt-3 font-mono text-xs leading-snug sm:mt-6 sm:text-sm ${i === 0 ? 'text-on-accent/80' : 'text-muted'}`}
              >
                {m.label}
              </p>
            </StaggerItem>
          </li>
        ))}
      </ul>
    </Stagger>
  );
}
```

- [ ] `npm run build` exits 0. Commit: `feat(metrics): stat cards with amber P1 card`

### Task 6: How I work rail

**Files:** `src/components/sections/method.tsx` (new), `src/app/page.tsx`.

- [ ] Create `src/components/sections/method.tsx` with exactly:

```tsx
import { Reveal } from '@/components/motion/reveal';
import { Stagger, StaggerItem } from '@/components/motion/stagger';
import { method } from '@/content/method';
import { ui } from '@/content/profile';

// A rail, not cards: each step is named and the ol carries the order, so no step numbers.
export function Method() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <h2 className="text-3xl font-extrabold leading-none tracking-[-0.03em] md:text-4xl lg:text-5xl">
          {ui.methodTitle}
        </h2>
      </Reveal>
      <Stagger inView>
        <ol className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {method.map((step) => (
            <li key={step.title} className="min-w-0">
              <StaggerItem className="h-full border-t border-line pt-6">
                <h3 className="text-xl font-bold leading-tight md:text-2xl">{step.title}</h3>
                <p className="mt-3 text-muted">{step.text}</p>
              </StaggerItem>
            </li>
          ))}
        </ol>
      </Stagger>
    </section>
  );
}
```

- [ ] `src/app/page.tsx`: add `import { Method } from '@/components/sections/method';` in the alphabetical import block (between `Hobbies` and `Metrics`) and render `<Method />` on the line after `<About />`.
- [ ] `npm run build` exits 0. Commit: `feat(method): add How I work rail`

### Task 7: Projects stagger and card hover

**Files:** `src/components/sections/projects.tsx`, `src/components/project-card.tsx`.

- [ ] Replace `src/components/sections/projects.tsx` with exactly:

```tsx
import { Reveal } from '@/components/motion/reveal';
import { Stagger, StaggerItem } from '@/components/motion/stagger';
import { ProjectCard } from '@/components/project-card';
import { ui } from '@/content/profile';
import { projects } from '@/content/projects';

// Spec 7.2: array order is display order and the first three are the bento. Three cells
// (1 tall + 2) fill the 2 x 2 grid exactly, so there is no empty tile.
const bento = projects.slice(0, 3);
const more = projects.slice(3);

// Each StaggerItem is the grid cell, so it carries the span; the card inside fills it (h-full).
export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <h2 className="text-3xl font-extrabold leading-none tracking-[-0.03em] md:text-4xl lg:text-5xl">
          {ui.projectsTitle}
        </h2>
      </Reveal>
      <Stagger inView className="mt-10 grid grid-cols-1 gap-4 md:mt-14 lg:grid-cols-2 lg:grid-rows-2">
        {bento.map((p, i) => (
          <StaggerItem key={p.slug} className={i === 0 ? 'lg:row-span-2' : undefined}>
            <ProjectCard project={p} image tall={i === 0} />
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal className="mt-16">
        <h3 className="text-xl font-bold md:text-2xl">{ui.moreProjects}</h3>
      </Reveal>
      {/* One column below lg. From lg a 6-column grid: the first three cards span 2 and the last
          two span 3, so neither row has a hole and each row's cards share one height. */}
      <Stagger inView className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-6">
        {more.map((p, i) => (
          <StaggerItem key={p.slug} className={i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <ProjectCard project={p} heading="h4" />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
```

- [ ] `src/components/project-card.tsx`:
  - Remove the `className` prop (no caller passes it after this task) from the destructuring and the props type.
  - Replace the `<Link>` `className` template with the static string
    `"group flex h-full flex-col overflow-hidden rounded border border-line bg-card transition-[translate,scale,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent motion-safe:hover:-translate-y-1 motion-safe:active:scale-[0.98]"`
    (drops `lg:row-span-2`; the StaggerItem cell carries spans now).
  - Heading className becomes
    `` `mt-2 min-w-0 break-words ${tall ? 'text-2xl font-extrabold leading-tight tracking-[-0.03em] md:text-4xl' : 'text-lg font-bold leading-snug'}` ``
  - Update the comment above the component to say the grid cell (a StaggerItem in projects.tsx) carries any span and `h-full` lets the card fill it. Everything else unchanged (SIZES, cover block, copy, link row).
- [ ] `npm run build` exits 0. Commit: `feat(projects): staggered grids, deeper card hover`

### Task 8: Section rhythm and Contact stage (batch)

**Files:** the six below. Exact string replacements; nothing else in these files changes.

- [ ] `src/components/sections/experience.tsx`, `skills.tsx`, `education.tsx`, `achievements.tsx`, `hobbies.tsx`, each:
  - Section className `mx-auto max-w-6xl px-4 py-20 md:px-8` becomes `mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32` (experience keeps its `id`).
  - `<h2 className="text-2xl font-bold md:text-3xl">` becomes `<h2 className="text-3xl font-extrabold leading-none tracking-[-0.03em] md:text-4xl lg:text-5xl">`.
  - The first block after the h2 swaps `mt-8` for `mt-10` and adds `md:mt-14`:
    - experience: `mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2` becomes `mt-10 grid grid-cols-1 gap-12 md:mt-14 lg:grid-cols-2`
    - skills: `mt-8 grid grid-cols-1 gap-8` becomes `mt-10 grid grid-cols-1 gap-8 md:mt-14`
    - education: `mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2` becomes `mt-10 grid grid-cols-1 gap-4 md:mt-14 lg:grid-cols-2`
    - achievements: `<ul className="mt-8">` becomes `<ul className="mt-10 md:mt-14">`
    - hobbies: `mt-8 flex flex-wrap gap-8` becomes `mt-10 flex flex-wrap gap-8 md:mt-14`
- [ ] `src/components/sections/contact.tsx`:
  - Section className `mx-auto max-w-6xl px-4 py-20 md:px-8` becomes `mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32`.
  - `<Reveal>` becomes `<Reveal className="rounded border border-line bg-card p-6 md:p-10 lg:p-14">`.
  - h2 className becomes `text-balance text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] md:text-6xl lg:text-7xl`.
  - `<div className="mt-8 min-h-11">` becomes `<div className="mt-10 min-h-11 md:mt-12">`.
  - Footer, links list and email untouched.
- [ ] `npm run build` exits 0. Commit: `style: section rhythm, display headings, Contact stage`

## Verification (orchestrator, after Task 8)

1. `npm run build` exit 0 (lint, test, build).
2. `npm start` locally; headless captures at 1440x900 and 390x844 into the job scratch folder as `new-desktop-*.png` / `new-mobile-*.png`; light theme spot captures.
3. At 390, 768, 1024, 1440, dark and light: `scrollWidth === clientWidth`; nav bar 56 px; h1 2 lines from 768, 3 at 390; stat cards end above the fold at 1440x900 and 390x844.
4. Reduced motion emulated: no translate on reveal, stagger or card hover.
5. Rebuild `compare.html` with reference, before and after per section.
6. Final whole-branch review, then hand back. No push, no PR until told.
