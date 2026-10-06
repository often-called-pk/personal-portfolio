# Redesign spec: Pit Wall restaged toward the YM reference

2026-10-06. Owner Prashant Kumar. Status: approved 2026-10-06 (section 12 all yes), built on `redesign-ym`; build rulings in section 13.
Style: caveman + ponytail. Facts only. Base: `2026-10-05-portfolio-site-design.md`; every rule not named here stands.
Branch `redesign-ym` from main 5aa14ff. Evidence: 42 section screenshots + `compare.html` in the job scratch folder.

## 1. Audit finding that changes the brief

- Reference (portfolio-ym-ten.vercel.app, captured 2026-10-06 at 1440x900 and 390x844) is light, not dark. Paper `#EFE9DD`, bands `#E7E0D1` / `#D8D0BF`, ink `#17130C`, muted `#5C5445`, line `#CFC7B5`, two accents (vermilion `#D8451F`, teal `#147A66`), dark bands `#17130C`. Zero `prefers-color-scheme` rules.
- Type: Newsreader serif display (h1 clamp 54-176 px, line-height 0.88), Space Grotesk body 15 px / 1.7, Space Mono labels 10-13 px uppercase, tracking 0.14-0.24em.
- Surfaces: raised "stages" radius 42-46 px holding cards radius 26-30 px, gradient fills, radial glows, layered shadows, pill buttons, cards tilted 0.5-2 deg.
- Subpages switch language: `projects.html` comic book (Bangers, red/blue/yellow halftone), `work-experience.html` Swiss dossier (Barlow Condensed, lime/blue). Three looks, one site.
- Owner read "dark minimal technical" does not match. Text read also off: 4 stat cards, not 3; Work and Project are separate pages; "LOOP" is music loop/shuffle; nav links hidden below 900 px, no menu.
- Differentiation: a near-clone of another engineer's portfolio would read as copied.
- Proposal: keep Pit Wall identity (tokens, Archivo + JetBrains Mono, 4 px, dark default). Borrow composition, rhythm, scale contrast, motion vocabulary. Q1 confirms.

## 2. Design read

Reading this as: redesign (preserve) of a vehicle-dynamics engineer portfolio for motorsport and automotive recruiters, dark technical language, leaning toward Exaggerated Minimalism (display-scale Archivo, one amber accent) set in the reference's stage-and-card rhythm.
ui-ux-pro-max 2.13.0: style search for the reference returned Bento Box Grid, Nature Distilled (terracotta + cream, "wellness, artisan"), Editorial Grid / Magazine; the reference is that hybrid. Style search for ours returned Exaggerated Minimalism (oversized type, single accent). Design-system run (`--variance 7 --motion 6 --density 4`) returned Minimalism & Swiss, Archivo pairing, Stagger List 0.06 s; its blue accent `#2563EB` rejected (colour lock). UX rule "Motion Sensitivity" (High): no scroll-jacking, no parallax.

## 3. Dials

| | variance | motion | density |
|---|---|---|---|
| reference, measured | 8 | 9 | 4 |
| current build, measured | 5 | 4 | 5 |
| target | 7 | 6 | 4 |

Current build under-delivers base spec 7/6/5: same h2 rhythm in all 10 sections, 16 px reveals, 2 px hovers, h1 capped at 48 px by the photo column.

## 4. Tokens

Values unchanged (`src/app/globals.css`). New usages only.

| token | dark | light | new usage |
|---|---|---|---|
| bg | #0C0D10 | #F5F5F2 | cards inside a stage |
| card | #15171B | #FFFFFF | stage panels (About, Contact), stat cards |
| fg | #F2F2F0 | #141518 | |
| muted | #9A9A94 | #5F6068 | stat labels, step text |
| line | #24262B | #DCDCD6 | stage borders, method rail |
| accent | #E0A040 | #9A6214 | P1 stat card fill: only solid accent surface besides buttons |
| on-accent | #0C0D10 | #FFFFFF | P1 card value and label, full strength (/80 failed AA in light) |

- Accent stays amber. Reference treatment borrowed once: accent as a solid surface (its orange stat card) = our P1 card. Hue not better: vermilion + teal = two accents (breaks colour lock); amber already AA (on-accent 8.6:1 dark, 5.1:1 light).
- Radius 4 px locked (`rounded`). No gradients, glows, shadows, tilt (Q4).

## 5. Type scale (Archivo + JetBrains Mono, weights unchanged)

| role | classes | px base / md / lg / xl |
|---|---|---|
| h1 hero | `text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[0.95] tracking-[-0.04em] text-balance` | 30 / 48 / 60 / 72 |
| h2 section | `text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-[-0.03em]` | 30 / 36 / 48 |
| h2 contact | `text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-[-0.04em] text-balance` | 36 / 60 / 72 |
| h3 step | `text-xl md:text-2xl font-bold leading-tight` | 20 / 24 |
| stat value | `font-mono font-medium text-3xl sm:text-5xl lg:text-7xl leading-none tracking-[-0.04em]` | 30 / 48 (sm) / 72 |
| lead | `text-lg md:text-xl text-muted max-w-[52ch] text-pretty` | 18 / 20 |
| card label | `font-mono text-xs text-accent`, no uppercase, no tracking (not an eyebrow) | 12 |

Body 16 px / 1.55 / 65ch and the single hero eyebrow unchanged. h1 to body goes 3:1 to 4.5:1 (reference 11:1); weight and tracking carry it, no serif.

## 6. Sections

Order: hero, metrics, about, method (new, Q3), projects, experience, skills, education, achievements, hobbies, contact. Anchors and nav labels unchanged.
Wrapper, every section except hero and metrics: `mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32` (was `py-20`). h2 to content `mt-10 md:mt-14` (was `mt-8`).
Stage (written `{stage}` below) = `rounded border border-line bg-card p-6 md:p-10 lg:p-14`. About and Contact only, never adjacent.

| section | reference | ours now | change |
|---|---|---|---|
| nav | floating pill, splits into 2 tilted pills after 48 px, music + pet toggles | full-width sticky bar | adjust: floating contained bar |
| hero | 100vh, serif name 176 px, 3 pill CTAs, faded car render, HUD chips, scroll cue | 2-col, h1 48 px, photo placeholder | adjust: full-width h1, photo to About (Q2) |
| marquee | italic skills ticker, infinite | none | skip |
| metrics | 4 tilted gradient cards, serif 88 px numbers | 3 hairline mono cells, 36 px | replace: 3 flat cards, P1 amber |
| about | 12-col stage, 4 floating cards, organic photo, orbit rings | one text column | replace: stage, 7/5 split, photo + 2 cards |
| method | stage, 4 numbered tilted cards over faded render | none | add: 4-step rail (Q3) |
| image band | dark band, italic serif over parallax render | none | skip until a cleared trackside photo exists |
| writing | LinkedIn embed carousel | none | skip: base spec has no blog |
| projects | not on home; comic subpage | bento 1+2, grid 3+2 | keep layout; scale, hover, stagger |
| experience, skills | Swiss subpage; 6 middle-dot text columns | 2 columns; label rail + pills | keep; wrapper + h2 |
| education, achievements, hobbies | none | cards, list, icon row | keep; wrapper + h2 |
| contact | inverted dark footer, mono kicker, pill CTAs | h2 30 px, email, buttons | adjust: stage + closing h2 72 px |

### 6.1 Nav `src/components/nav.tsx`
- `<header>`: `pointer-events-none sticky top-0 z-40 px-2 pt-3 sm:px-3 md:px-6`.
- Bar (replaces inner div): `pointer-events-auto relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded border border-line bg-bg/90 px-2 backdrop-blur sm:px-3 md:px-5`. Phone padding `px-2` keeps the name on one line from 360 px; `/90` keeps muted links AA over white plots.
- Sheet moves inside the bar: `absolute inset-x-0 top-full mt-2 rounded border border-line bg-bg lg:hidden`. Links, CV button, toggle, Escape logic unchanged.
- `globals.css`: `scroll-padding-top: 5rem`. Header 68 px total, under the 72 px cap. No scroll-state morph.

### 6.2 Hero `src/components/sections/hero.tsx`
- One column: `mx-auto max-w-6xl px-4 pb-10 pt-10 md:px-8 md:pb-16 md:pt-20`. Drop grid, photo, `next/image` import (photo moves to About).
- h1 per section 5, `mt-4 md:mt-6`, static (LCP text, never opacity 0). 2-line split needs 13.93em: fits from md (1088 px column at 72 px = 1003 px). Phones keep 30 px, 3 lines.
- Sub: lead class, `mt-6 md:mt-8`, static like the h1 (it is the larger text block, so the LCP element, on most phones). CTAs unchanged, `mt-8 md:mt-10`. Hero keeps 4 text elements.
- Manifesto-type hero: stat cards are the first-viewport visual. Taste 4.8 wants a real image: later image band, Q2.
- If Q2 = keep photo: skip all but sub + spacing; h1 stays `xl:text-5xl`; About renders no photo.

### 6.3 Metrics `src/components/sections/metrics.tsx`
- `<Stagger inView className="mx-auto max-w-6xl px-4 md:px-8">` around `<ul className="grid grid-cols-3 gap-2 sm:gap-4">`; each `<li className="min-w-0">` holds a `<StaggerItem>` that is the card.
- Card (on the StaggerItem, so the whole card moves): `h-full rounded border p-3 sm:p-6 lg:p-8`, plus i = 0 `border-accent bg-accent text-on-accent`, else `border-line bg-card`.
- Value: stat class + `<CountUp>`. Label: `mt-3 break-words font-mono text-xs leading-snug sm:mt-6 sm:text-sm`, plus i = 0 `text-on-accent`, else `text-muted`.
- Three columns at every width (base-spec phone fold rule stays).

### 6.4 About `src/components/sections/about.tsx`
- Wrapper, then `<Reveal className="{stage}">` holding `grid gap-10 lg:grid-cols-12 lg:gap-12`.
- Left `lg:col-span-7`: h2, paragraphs `mt-10 flex max-w-[65ch] flex-col gap-4 md:mt-14`, then `mt-8 grid gap-4 sm:grid-cols-2` with card `rounded border border-line bg-bg p-5` (card label `ui.nowLabel` + `<p className="mt-2">` `profile.now`) and a second card, same box, `text-muted`, `profile.availability`.
- Right `lg:col-span-5`: portrait only, frame `relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded border border-line`, `<Image fill sizes="(min-width:640px) 24rem, calc(100vw - 5rem)" className="object-cover">` (lazy).
- Mobile: one column, same order (portrait last). Forced label edit: `ui.nowLabel` 'Now:' to 'Now'.

### 6.5 Method (new, Q3)
- Files: `src/content/method.ts` exports `method: MethodStep[]`; `types.ts` adds `export type MethodStep = { title: string; text: string };`; `ui.methodTitle: 'How I work'`; `src/components/sections/method.tsx` (server); `page.tsx` renders `<Method />` after `<About />`. No nav entry.
- Layout: wrapper; `<Reveal>` h2; `<Stagger inView>` around `<ol role="list" className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">` (role keeps list semantics in Safari); each li holds `<StaggerItem className="h-full border-t border-line pt-6">` with h3 step + `<p className="mt-3 text-muted">`. Rail, not cards, no numbers.
- Draft copy, each clause from existing content (source in brackets); owner fact-checks:
  1. Measure the car: "Static, dynamic and track characterisation first, as in the UTAC Kia Niro test plan." [utac contributions 1]
  2. Model it: "Vehicle models built from that data: IPG CarMaker for UTAC, a 23-state optimal-control model for the thesis." [utac contributions 2, fullmodelsim overview]
  3. Prove the model: "Checked against measured cornering and slalom runs; every thesis model change gated behind 8 validation scripts and 26 unit tests." [utac contributions 2, active-aero contributions 4]
  4. Run it trackside: "Post-session data export and analysis fed back to driver and coach; data and strategy relayed to drivers in live sessions." [SVG bullet 1, Indian F4 2025 bullet 1]
- Test: `method` has exactly 4 steps; add `method` to the dash-check JSON.

### 6.6 Projects `projects.tsx`, `project-card.tsx`
- h2 scale; "More projects" h3 `text-xl md:text-2xl font-bold`.
- Both grids become `<Stagger inView className="{current grid classes}">`; each card sits in a `<StaggerItem>` carrying its span (`lg:row-span-2` first bento cell; `lg:col-span-2` / `lg:col-span-3` in the more grid). ProjectCard drops `lg:row-span-2` and its now unused `className` prop, adds `h-full`.
- ProjectCard hover: `duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-1` (was 2 px, 200 ms). Tall title `text-2xl md:text-4xl font-extrabold tracking-[-0.03em]`.

### 6.7 Experience, skills, education, achievements, hobbies
Wrapper + h2 class only. Layouts stay: already distinct families.

### 6.8 Contact `contact.tsx`
- Wrapper, then `<Reveal className="{stage}">`; h2 contact class; email row `mt-10 md:mt-12`; buttons and footer unchanged.
- No inverted band: one theme per page (reference flips to dark twice).

## 7. Motion (dial 6, Motion 14, no new dependency)

- Load: hero `Stagger` 0.06 s unchanged; h1 static.
- `stagger.tsx`: add `inView?: boolean`. True: `initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}`; false: `animate="show"` (today). Same variants, 0.06 s apart. Variants reach `StaggerItem` through plain `ul` / `li`.
- `reveal.tsx`: `y: 24` (was 16), `duration: 0.7` (was 0.5); ease `[0.16, 1, 0.3, 1]`, once, amount 0.1 kept.
- Hover: cards lift 4 px in 300 ms, border to accent; buttons keep `active:scale-[0.98]`. Count-up kept.
- Reduced motion: `MotionConfig reducedMotion="user"` + `motion-safe:` kept on everything new.
- Jobs: stagger = reading order of a set; reveal = section entry; hover = affordance. Nothing else moves.

## 8. Files

| file | change |
|---|---|
| `src/app/globals.css` | `scroll-padding-top: 5rem` |
| `src/app/page.tsx` | `<Method />` after `<About />` |
| `src/components/nav.tsx` | floating bar, sheet inside bar |
| `src/components/sections/hero.tsx` | one column, display h1, photo out |
| `src/components/sections/metrics.tsx` | stat cards |
| `src/components/sections/about.tsx` | stage, photo, 2 cards |
| `src/components/sections/method.tsx` | new |
| `src/components/sections/projects.tsx`, `src/components/project-card.tsx` | stagger, hover, scale |
| `src/components/sections/{experience,skills,education,achievements,hobbies}.tsx` | wrapper + h2 |
| `src/components/sections/contact.tsx` | stage, closing h2 |
| `src/app/projects/[slug]/page.tsx` | prev / next hover matches the cards |
| `src/components/motion/stagger.tsx`, `reveal.tsx` | `inView`; y, duration |
| `src/content/method.ts`, `types.ts`, `profile.ts` | steps, `MethodStep`, `methodTitle`, `nowLabel` |
| `tests/content.test.ts` | method length 4, method in dash check |

## 9. Untouched

Token values, fonts, all existing copy except `ui.nowLabel`, routes, anchors, detail page layout (only its prev / next hover changed), `layout.tsx`, `not-found.tsx`, `opengraph-image.tsx`, `icon.tsx`, `email.tsx`, `count-up.tsx`, `next.config.ts`, `public/`, cv.pdf, base 7.5 confidentiality, dual theme via `prefers-color-scheme`, no theme toggle.

## 10. Reference does X, we do not

| reference does | we do not, because |
|---|---|
| "SCROLL" cue with animated line | scroll cues banned (taste 9.F) |
| numbered eyebrows: "00 / Human in the loop", "04" before Writing, "01 /" to "04 /" step labels | numbering banned (9.F); our steps are named, `ol` gives order |
| pulsing dot before the hero eyebrow | decorative dots banned (9.F) |
| middle dot as default separator (eyebrow, chips, marquee, skills, footer) | max 1 per line (9.F); skills stay pills |
| infinite italic skills marquee | base spec bans marquee |
| em dashes across its copy | banned (9.G, owner rule) |
| eyebrow above most sections | 1 eyebrow per page, test-enforced |
| "//" HUD chips floating on the hero render | labels on images banned (9.F); they overlap copy at 390 |
| gradient cards, radial glows, layered shadows, tilted cards | Pit Wall: flat, 4 px, no glow |
| dark image band and dark footer inside a light page | one theme per page (4.11) |
| Lenis smooth-scroll, parallax, cards floating on loops | Motion Sensitivity (ui-ux-pro-max, High); loops unmotivated |
| lofi track that starts on first click or key; "PET ON" Three.js companion | audio surprise; pet and its speech bubbles cover copy in our captures; no content value |
| 3 px scroll progress bar | decoration |
| LinkedIn embed carousel | third-party cookie walls render inside the page |
| no menu below 900 px | we keep the hamburger sheet |
| cream + espresso palette, Newsreader serif display | taste 4.1 / 4.2 defaults flagged; differentiation |
| comic projects page, Swiss work page | one visual language site-wide |

## 11. Acceptance

Gates unchanged: `npm run lint`, `npm test`, `npm run build` zero errors; Lighthouse mobile >= 90 x4; keyboard tab with visible focus; both themes; 375 / 768 / 1024 / 1440 no horizontal scroll; design-taste 14 pre-flight in PR.
New checks (headless captures at 390x844 and 1440x900, dark and light):
1. h1 = 2 lines from 768 px, 3 lines at 390 and 375.
2. Stat cards fully above the fold: bottom < 900 px at 1440x900, < 844 px at 390x844.
3. LCP element = static hero text (h1, or the sub on most phones), painted at first paint. Phones about 880 px tall and up may pick the About paragraph after hydration (accepted).
4. Nav one line at 1024, bar 56 px, header 68 px; sheet opens under the bar, Escape closes, focus returns to toggle.
5. `grep -rE "gradient|shadow-|rounded-(sm|md|lg|xl|2xl|3xl|full)" src` = 0 hits.
6. One accent-filled surface on `/` (P1 card) besides buttons.
7. `prefers-reduced-motion: reduce`: no transform on reveal, stagger or hover.
8. `git diff main --stat -- src/content` lists only `method.ts`, `types.ts`, `profile.ts`.
9. No U+2014 / U+2013 in any changed file.

## 12. Open questions (answered 2026-10-06: all yes; the four How I work lines approved as written)

1. Theme: reference is light cream + serif. Keep Pit Wall dark/amber/Archivo, borrow composition only? Recommend yes. A light-cream version needs its own spec and an explicit override of taste 4.1 / 4.2.
2. Hero photo: move the portrait into About, give the h1 the full width at 72 px? Recommend yes: bigger type, LCP becomes text, the placeholder leaves the hero. Else photo stays, h1 stays 48 px.
3. "How I work" rail with the 4 lines in 6.5? Recommend yes, after your fact-check. Else skip; 10 sections stay.
4. Radius: keep 4 px everywhere? Recommend yes (identity, differentiation). Else 16 px cards + pill buttons like the reference: token change across 12 files.
5. Nav: floating contained bar? Recommend yes. Else keep the full-width sticky bar.

## 13. Build rulings (2026-10-06, already folded into sections 4 to 6)

- Nav phone padding `px-2` (name wrapped at 360 px with `px-3`); bar `bg-bg/90` (muted links 3.8:1 over white plots at /80).
- About cards under the copy, portrait alone on the right (empty band at lg, mismatched widths at 768).
- P1 label full `text-on-accent` (3.9:1 in light at /80); stat labels `break-words` (overflow at 320 px).
- Method `ol role="list"` (Safari list semantics). Detail page hover matches the cards (4 px, 300 ms).
- Hero sub static (LCP on most phones; it was JS-gated). Stat card classes on the StaggerItem; ProjectCard `className` prop removed.
- Accepted: 4 h1 lines and a wrapped name at 320 px only.
