# Portfolio site spec

2026-10-05, grilled 2026-10-06. Owner Prashant Kumar. Status: approved.
Style: caveman + ponytail. Facts only. "Skip" = YAGNI, add later if needed.

## 1. Job

Recruiter (automotive / ADAS / mechatronics / robotics / AI) shortlists Prashant in 30 s, then finds depth for interview. Mobile first. LCP < 2.5 s. Three strongest facts above fold. One click to project detail or CV.
Not: blog, lead-gen, publication list.

## 2. Look

Direction B "Pit Wall" (mock https://claude.ai/artifact/VHW5aVP6SpAPgNduNQnKWx). Refs: portfolio-ym-ten.vercel.app (dark minimal), portfolio.mariecheron.com (card anatomy, detail structure).
Dials: variance 7, motion 6, density 5.

Tokens (dark default / light via prefers-color-scheme):
| token | dark | light |
|---|---|---|
| bg | #0C0D10 | #F5F5F2 |
| card | #15171B | #FFFFFF |
| fg | #F2F2F0 | #141518 |
| muted | #9A9A94 | #5F6068 |
| line | #24262B | #DCDCD6 |
| accent | #E0A040 | #9A6214 |
| on-accent | #0C0D10 | #FFFFFF |

Rules: one accent everywhere. No neon, glow, gradients, pure #000/#fff. Radius 4px locked. Shadows tinted to bg. No manual theme toggle.

Type: Archivo 400/600/700/800 (headings + body). JetBrains Mono 400/500 (nav, eyebrow, numbers, tags, dates, meta). next/font/google, swap. Hero h1 `text-4xl md:text-5xl lg:text-6xl`, tracking -0.035em, max 2 lines. h2 `text-2xl md:text-3xl`. Body 16px / 1.55 / max 65ch. `tabular-nums` on mono digits.

Motion (dial 6): hero stagger on load (60 ms). Sections `whileInView` fade-up once, amount 0.3. Metric count-up once. Card hover `-translate-y-[2px]` 200 ms, active `scale-[0.98]`. All gated by `useReducedMotion`. Banned: scroll listeners, marquee, parallax, custom cursor, infinite loops, scroll cues.

## 3. Stack

Next.js 16 App Router, TS strict, React 19. Tailwind v4 (`@tailwindcss/postcss`), tokens in `@theme`, light override under `@media (prefers-color-scheme: light)`. Motion (`motion/react`) only in `'use client'` leaves. `@phosphor-icons/react` regular weight, one family, no hand SVG. `next/image`; hero + first bento `priority`. npm.
Skip: CMS, DB, API routes, form backend, analytics, i18n.

## 4. Routes

| route | type | content |
|---|---|---|
| `/` | static | 10 sections, anchor nav |
| `/projects/[slug]` | static, generateStaticParams | 8 pages |
| `/cv.pdf` | public file | McLaren-grad tex, headline swapped to site line, `---` rewritten, compiled with MiKTeX pdflatex (`%LOCALAPPDATA%\Programs\MiKTeX\miktex\bin\x64\pdflatex.exe`) |
| OG image | `opengraph-image.tsx` | name + headline on Pit Wall tokens |

## 5. Home sections (order fixed)

Nav: sticky, max 72 px, one line at lg. Mono uppercase name left. Anchors About / Projects / Experience / Skills / Contact. "Download CV" accent button right. Mobile: name + CV + hamburger sheet.

1. **Hero**. 2-col at lg. Left: eyebrow "MSc Automotive Mechatronics, Cranfield" (only eyebrow on page). h1 "Vehicle dynamics, control and telemetry, proven trackside." Sub (20 words): "Thesis on active aero in lap-time simulation with Zenvo. Three seasons of race engineering across Indian F4 and British GT." CTAs: "View projects" (accent), "Get in touch" (ghost). Right: profile photo 4:5, 4 px radius. Placeholder until photo: `model_aeroMapSurface.png`. Nothing under CTAs.
2. **Metric strip**. 3 cells, hairline dividers, mono. `P1` UTAC Challenge 2026, Chief Engineer / `30` interns trained on vehicle systems / `3` seasons trackside, F4 and British GT. Count-up once.
3. **About**. 80-100 words, 2 paras: origin (EEE, Baja SAE, analytics years, pivot to motorsport), now. Mono "Now:" line. One line: graduate visa to Jan 2029, full UK licence, open to relocation.
4. **Projects**. h2 "Selected projects". Bento: 1 featured (2 rows) + 2 standard. Then "More projects" grid, 3 col lg / 1 col mobile, remaining 5. Card anatomy (Marie): mono category label (Thesis / Competition / Personal / Coursework), title, context · year, role line, 1-2 sentence summary, "View project" link. Bento cells carry images. Grid cards image-free OK.
5. **Experience**. h2 "Experience". 2 cols at lg: "Motorsport", "Analytics and product". Entry: dates (mono), role, company + location, 2 bullets. 8 roles. Mobile stacks, Motorsport first. No accordions.
6. **Skills**. h2 "Skills". 5 labelled rows, mono pills (4 px, hairline, no fill).
7. **Education**. h2 "Education". 2 cards: Cranfield MSc 2025-26 (thesis line, modules line), Manipal B.Tech EEE 2016-20 (Baja SAE line).
8. **Achievements**. h2 "Achievements". 4-row hairline list, year mono: UTAC 2026 overall winners / Indian F4 2024 selection by written exam / VP Motorsports Society of Cranfield / Student Ambassador Cranfield.
9. **Hobbies**. h2 "Off the clock". One row, Phosphor icon + label: Race weekends, Gaming, Badminton, Running.
10. **Contact**. h2 "Let's talk about the next car." Email rendered client-side (JS) as mailto + copy button, not in HTML source. LinkedIn, GitHub, Download CV. Footer: name, year, "Built with Next.js". No locale / weather / version strips.

Layout families: 9 distinct, none repeat. Eyebrows: 1 (cap 4). CTA intents: projects x1, contact x1, CV x2 (nav + contact).

## 6. Project detail page

Back link. h1. One-liner. Meta row mono: year · context · role · tools. h2 blocks: Overview / Key contributions (bullets) / Result / Tools and skills (tag row). Gallery 1-3 images, one-line functional captions. Links row: repo / live / report where exist. Prev / next project. Page, not modal.

## 7. Content

### 7.1 Profile
Prashant Kumar. Milton Keynes, UK. pk2559896@gmail.com. linkedin.com/in/prashantkr97. github.com/often-called-pk.

### 7.2 Projects (order = display; first 3 = bento)
| slug | title | year | category / context | tools | images |
|---|---|---|---|---|---|
| active-aero-lap-time | Implementable active aerodynamics in minimum lap time simulation | 2026 | Thesis, Zenvo Automotive | MATLAB, CasADi, IPOPT, Simulink | res_cumDelta_barcelona.png, model_aeroMapSurface.png, aeroActuator_BCN_ARWd_fullLap.png (D:\IRP\MLTP_AA_ATD\solutions\report\figs) |
| utac-2026-kia-niro | UTAC Challenge 2026: Kia Niro EV state estimation | 2026 | Competition, Cranfield GDP, Chief Engineer, 9-person team, overall winners | IPG CarMaker, Simulink, Python, CAN, EKF, RLS | D:\GDP\efficiency_map.png; event JPGs pending consent |
| indian-f4-telemetry-platform | Indian F4 telemetry platform (indianf4championship.com) | 2024-26 | Personal, used to train 30 interns | Flask, PostgreSQL, Plotly, Docker, nginx, Azure | D:\Job-Hunt\CV\latest\indianf4championship dashboard.png |
| indian-f4-2025-dashboard | Indian F4 2025 telemetry dashboard | 2025 | Personal, serverless rebuild | React, TypeScript, Vite, shadcn/ui, AWS Lambda, S3, API Gateway | D:\Python Projects\IndianF42025Webapp-complete (frontend/images/*.png, backend/arch.excalidraw.png) |
| racepaceoracle | RacePaceOracle | 2025 | Personal, F1 analysis platform | React, Vite, Tailwind, FastF1, Python | capture: run D:\Python Projects\racepaceoracle frontend |
| fullmodelsim-python | FullModelSim: 23-state vehicle model and solver in Python | 2026 | Personal, port of thesis solver | Python, CasADi, IPOPT, PySide6, PyInstaller | capture: run D:\IRP\FullModelSim_Python GUI |
| active-aero-controller-codegen | Active-aero controller with verified C code generation | 2026 | Coursework, Embedded Vehicle Control Systems | Simulink, Simulink Coder, C | optional Simulink export, else none |
| arduino-can-cruise-control | Embedded cruise control on Arduino over CAN | 2026 | Coursework, Embedded Systems | Simulink, Embedded Coder, Arduino, MCP2515 | user rig photo, else none |

Folded: LQG sensor-mount (Skills), F1 race-outcome ML (one clause), F4 2024 Python analysis (link from telemetry page).

### 7.3 Experience (8)
Motorsport: Tyre Performance Engineer, Race Car Consultants (May 2026-present) / Junior Mechanic and Data, SVG Motorsport (Apr 2026-present) / Graduate Race Engineer, Indian F4 (Aug-Sep 2025) / Graduate Junior Mechanic, Indian F4 (Aug-Nov 2024).
Analytics and product: Analyst, Programmatic and Financial Ops, Publicis Global Delivery (Apr 2023-Sep 2025) / Product Development Manager, Purpuligo Technologies (Feb-Jul 2025) / Senior Business Analyst, Merkle Sokrati (Jul 2022-Feb 2023) / Business Analyst, Merkle Sokrati (Nov 2020-Jun 2022).
Bullets verbatim from `D:\Job-Hunt\.claude\skills\ats-resume\references\candidate-facts.md`, 2 per role, numbers only where stated there.

### 7.4 Skills (5 groups)
- Vehicle dynamics and control: minimum lap time optimal control (CasADi, IPOPT), Pacejka tyre models, aero maps, IPG CarMaker, model-to-measurement correlation, LQR/LQG, dSPACE HIL (lab).
- Racing data and electronics: Marelli WinTAX4, AiM RaceStudio3, MoTeC i2 Pro, ECUMaster ADU, CAN bus, GPS and data loggers, tyre allocation.
- Software: MATLAB, Simulink, Simulink Coder, Python (NumPy, pandas, Plotly, Flask, FastAPI), C, SQL, PostgreSQL, Git, Linux, Docker, nginx, Azure, Excel VBA.
- Electrical and hands-on: wiring harness, sensor integration, KiCad, corner weights, alignment, ride heights, pit stops, manual lathe and mill.
- Languages: English (C2), Hindi (native).

### 7.5 Confidentiality (hard)
Never: lap times in seconds, vehicle params, tyre supplier names, actuator slew rates, driver names tied to data, Zenvo tyre/aero plots with labelled axes, VI WorldSim data, ChassisSim material, teammate photos without consent, AWS pre-signed URLs, racepaceoracle `client_secret_*.json`, track map with corner speeds (until cleared).
OK: percent gains 0.24-0.43 %, config counts, circuit names, the 3 listed thesis plots.
Never claim: TypeScript beyond 2025 dashboard, Kubernetes, Kafka, Scrum, mech CAD, CNC, welding, FEA, EtherCAT, French, CI/CD for F4 analytics v2, Staub/Cerreto PDFs.

## 8. Data model

```ts
// src/content/types.ts
export type Link = { label: string; href: string };
export type Project = {
  slug: string; title: string; summary: string; year: string;
  category: 'Thesis' | 'Competition' | 'Personal' | 'Coursework';
  context: string; role: string; tools: string[]; featured: boolean;
  cover?: string; images: { src: string; caption: string }[];
  overview: string; contributions: string[]; result: string; links: Link[];
};
export type Experience = {
  group: 'motorsport' | 'analytics'; company: string; title: string;
  location: string; start: string; end: string; bullets: string[];
};
export type Education = { school: string; degree: string; start: string; end: string; lines: string[] };
export type SkillGroup = { label: string; items: string[] };
export type Achievement = { year: string; text: string };
export type Hobby = { icon: string; label: string };
export type Profile = {
  name: string; headline: string; eyebrow: string; sub: string; email: string;
  links: Link[]; about: string[]; now: string; metrics: { value: string; label: string }[];
};
```
One file per type in `src/content/`. Components hold no copy.

## 9. Files

```
src/app/layout.tsx               fonts, metadata
src/app/page.tsx                 10 sections
src/app/opengraph-image.tsx
src/app/projects/[slug]/page.tsx
src/app/globals.css              @import "tailwindcss"; @theme; light override
src/components/nav.tsx           client
src/components/sections/*.tsx    one per section, server
src/components/motion/*.tsx      reveal, count-up, stagger (client)
src/components/email.tsx         client, builds mailto at runtime
src/content/*.ts
public/images/projects/<slug>/
public/cv.pdf
tests/content.test.ts            vitest
```

## 10. Gates

- `npm run build` zero type + lint errors.
- `npm test` (vitest, one file): slugs unique; every cover / images[].src exists under public/; no U+2014 / U+2013 in content strings; hero sub <= 20 words; exactly 1 eyebrow.
- Manual pre-merge: Lighthouse mobile >= 90 x4. Both themes. Keyboard tab, visible focus. 375 / 768 / 1024 / 1440, no horizontal scroll. design-taste-frontend section 14 pre-flight ticked in PR.

## 11. Delivery

- Repo `often-called-pk/personal-portfolio`, public, via gh. Default `main`.
- Branch `worktree-portfolio-build`. Draft PR to main. User merges.
- Vercel: user imports repo once in dashboard. Project name `prashantkumar` (fallback `prashant-kumar`, `prashantkr`). Push to main deploys.
- Process: Opus orchestrates, Sonnet builds, Fable fixes only. Code under karpathy-guidelines + ponytail. One runnable check per non-trivial logic. No em dash anywhere.
- Copy: I draft from folders, user fact-checks in PR.
- Screenshots: orchestrator captures RacePaceOracle + FullModelSim; user supplies Arduino rig photo; image-free cards OK outside bento.

## 12. Owed by user (non-blocking)

1. Profile photo, portrait, >= 1200 px tall.
2. Consent for UTAC event photos, or car-only crop.
3. Arduino CAN rig photo (optional).

## 13. Skip

Blog, contact form, analytics, custom domain, i18n, CMS, theme toggle, filter tabs (add past 12 projects), experience accordions, motion beyond section 2.
