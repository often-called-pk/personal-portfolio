# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development (recommended) or superpowers:executing-plans. Steps use `- [ ]`.

**Goal:** Pit Wall portfolio for Prashant Kumar: static Next.js site, 10 home sections, 8 project pages, cv.pdf, draft PR.
**Architecture:** All pages static. Copy lives in `src/content/*.ts`; server components render it; motion only in 3 client leaves + nav + email.
**Tech stack:** Next.js 16 App Router, React 19, TS strict, Tailwind v4, motion, @phosphor-icons/react, vitest. npm.
**Spec:** `docs/superpowers/specs/2026-10-05-portfolio-site-design.md` (final, do not re-open). Builder reads spec section named per task.
**Roles:** Opus orchestrates + runs Task 5 and Task 12. Builders = Sonnet subagents, one per task. Fable fixes only.
**Workdir:** `D:\personal-portfolio\.claude\worktrees\portfolio-build`, branch `worktree-portfolio-build`. Never cd to repo root, never touch main.

## Global Constraints

- NO em dash (U+2014) or en dash (U+2013) anywhere: code, copy, comments, commits, PR text, alt text. Hook blocks tool calls containing one. Use comma, colon, full stop, plain hyphen. Need the char in code: `String.fromCodePoint(0x2014)`.
- Commits: conventional (`feat:`, `chore:`, `docs:`, `test:`), one line, no attribution, no trailers.
- Every builder loads before coding: `andrej-karpathy-skills:karpathy-guidelines`, `ponytail:ponytail`. UI tasks also: `design-taste-frontend`, `vercel-react-best-practices`. `example-skills:webapp-testing` skipped: needs Python Playwright, not installed.
- Components hold no copy. All strings from `src/content/`.
- Tokens only (`bg-bg`, `text-fg`, `text-muted`, `border-line`, `bg-card`, `bg-accent`, `text-on-accent`). No raw hex outside globals.css. No gradients, glow, `#000`, `#fff`. Radius: `rounded` (4px) only.
- Icons: Phosphor regular. Server files import from `@phosphor-icons/react/dist/ssr`; client files from `@phosphor-icons/react`.
- Never pass the `profile` object (or `profile.email`) as a prop from server to client component. Client files import what they need.
- Confidentiality (spec 7.5, hard): never lap times in seconds, vehicle params, tyre supplier names, actuator slew rates (only "60 deg/s assumed" + "under half that" OK; never the delivered rate), driver names tied to data, Zenvo tyre/aero plots with labelled axes (only the 3 listed thesis plots), VI WorldSim, ChassisSim, teammate photos, AWS pre-signed URLs, `client_secret_*.json`, track maps with corner speeds. OK: 0.24-0.43 %, config counts, circuit names.
- Never claim: TypeScript beyond 2025 dashboard, Kubernetes, Kafka, Scrum, mech CAD, CNC, welding, FEA, EtherCAT, French, CI/CD for F4 analytics v2, Staub/Cerreto PDFs, MoTeC M1 Tune, ECUMaster PMU.

## Review Focus

1. Email leaks into prerendered HTML or RSC payload via a server prop. Expect 0 hits. Pinned: Task 11 step 3.
2. Slow hydration hides LCP. h1 and hero photo never start at opacity 0. Pinned: Task 7 rule.
3. `/projects/does-not-exist` must 404, not 500. Pinned: `dynamicParams = false` Task 9, curl in Task 11.
4. Project with no cover and no images renders card + detail without empty gallery box. Pinned: Task 8/9 conditionals; codegen + arduino entries exercise it at build.
5. Long title or tool list at 375 px causes horizontal scroll. `min-w-0 break-words` on card text, `flex-wrap` on tag rows. Pinned: Task 11 manual check.

## File map

```
src/app/layout.tsx  page.tsx  globals.css  opengraph-image.tsx  projects/[slug]/page.tsx
src/components/nav.tsx (client)  email.tsx (client)
src/components/motion/reveal.tsx  count-up.tsx  stagger.tsx (client)
src/components/sections/hero metrics about projects experience skills education achievements hobbies contact (.tsx, server)
src/components/project-card.tsx (server, shared by bento + grid)
src/content/types profile projects experience education skills achievements hobbies (.ts)
public/images/projects/<slug>/*   public/cv.pdf   tests/content.test.ts
```

---

## Phase 0: Setup

### Task 1: Scaffold

**Skills:** karpathy-guidelines, ponytail. **Files:** whole scaffold, `package.json`.

- [ ] Scaffold OUTSIDE the worktree (worktree root holds `README.md` and the ignored `.superpowers/` ledger dir; create-next-app rejects both; never move or delete `.superpowers/`): `npx create-next-app@latest C:/Users/ASUS/AppData/Local/Temp/pk-scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes --skip-install --disable-git`. CLI rejects a flag: drop that flag only, note it in report.
- [ ] Copy into worktree, skipping `.git`, `node_modules`, `README.md`: `cd C:/Users/ASUS/AppData/Local/Temp/pk-scaffold && tar cf - --exclude=.git --exclude=node_modules --exclude=README.md . | (cd D:/personal-portfolio/.claude/worktrees/portfolio-build && tar xf -)`. Our `README.md` stays.
- [ ] `.gitignore`: scaffold version replaces ours; append any of our old lines it lacks (`.remember/`, `*.log`, `.vercel/`). `package.json` `"name": "personal-portfolio"`. Then `npm install` in worktree.
- [ ] `npm i motion @phosphor-icons/react` and `npm i -D vitest`. Add script `"test": "vitest run"`.
- [ ] Boilerplate out: delete `public/*.svg`; `src/app/page.tsx` -> `export default function Home() { return <main /> }`; `globals.css` -> only `@import "tailwindcss";`. Keep `AGENTS.md`/`CLAUDE.md` if generated (Next 16 docs pointer).
- [ ] Verify: `npm run build` exit 0; `npm run lint` exit 0; `cat package.json | grep -E '"next"|"react"'` shows next 16.x, react 19.x.
- [ ] Commit: `chore: scaffold next.js app with motion, phosphor, vitest`

## Phase 1: Tokens, fonts, layout, OG

### Task 2: Theme + layout + profile + OG

**Skills:** karpathy-guidelines, ponytail, design-taste-frontend, vercel-react-best-practices. **Spec:** 2, 3, 7.1, 8.
**Files:** create `src/content/types.ts`, `src/content/profile.ts`, `src/app/opengraph-image.tsx`; modify `src/app/globals.css`, `src/app/layout.tsx`.
**Produces:** all types (below), `profile: Profile`, `ui` (UI strings), CSS tokens `--color-{bg,card,fg,muted,line,accent,on-accent}`, `font-sans` (Archivo), `font-mono` (JetBrains Mono).

- [ ] `types.ts`: spec section 8 verbatim, plus two Profile fields: `availability: string; photo: { src: string; alt: string };` (visa line and hero image need a home; components hold no copy).
- [ ] `profile.ts` (`export const profile: Profile`):
  - name `Prashant Kumar`; email `pk2559896@gmail.com`; eyebrow `MSc Automotive Mechatronics, Cranfield`
  - headline `Vehicle dynamics, control and telemetry, proven trackside.`
  - sub `Thesis on active aero in lap-time simulation with Zenvo. Three seasons of race engineering across Indian F4 and British GT.` (20 words)
  - links: LinkedIn `https://www.linkedin.com/in/prashantkr97`, GitHub `https://github.com/often-called-pk`
  - about[0]: `I studied Electrical and Electronics Engineering at Manipal, where I worked on the electrical subsystem, wiring harness and sensor integration for the Team Manipal Racing Baja SAE car. Four and a half years in analytics followed at Merkle Sokrati and Publicis, writing SQL and Python for clients across time zones. Indian F4 pulled me trackside in 2024, and I moved to the UK to work in motorsport.`
  - about[1]: `I have just finished an MSc in Automotive Mechatronics at Cranfield, with a thesis on active aerodynamics for Zenvo Automotive, and I spend race weekends with British GT Cup and BRSCC teams.`
  - now: `Tyre Performance Engineer at Race Car Consultants and Junior Mechanic and Data at SVG Motorsport.`
  - availability: `UK Graduate visa to Jan 2029. Full UK driving licence. Open to relocation.`
  - metrics: `{P1, UTAC Challenge 2026, Chief Engineer}`, `{30, interns trained on vehicle systems}`, `{3, seasons trackside, F4 and British GT}`
  - photo: `{ src: '/images/projects/active-aero-lap-time/model_aeroMapSurface.png', alt: 'Aero map surface from the active aero thesis' }` (placeholder until user photo, spec 12.1)
- [ ] `profile.ts` also `export const ui = { nav: [About /#about, Projects /#projects, Experience /#experience, Skills /#skills, Contact /#contact] as Link[], cv: 'Download CV', viewProjects: 'View projects', getInTouch: 'Get in touch' }`. Hrefs start with `/` so nav works from project pages. Every later task adds its UI strings (h2s, labels, footer) as keys here, never inline in components.
- [ ] `globals.css`:

```css
@import "tailwindcss";
@theme {
  --color-bg: #0C0D10; --color-card: #15171B; --color-fg: #F2F2F0; --color-muted: #9A9A94;
  --color-line: #24262B; --color-accent: #E0A040; --color-on-accent: #0C0D10;
}
@theme inline { --font-sans: var(--font-archivo); --font-mono: var(--font-jetbrains); }
:root { color-scheme: dark; }
@media (prefers-color-scheme: light) {
  :root {
    color-scheme: light;
    --color-bg: #F5F5F2; --color-card: #FFFFFF; --color-fg: #141518; --color-muted: #5F6068;
    --color-line: #DCDCD6; --color-accent: #9A6214; --color-on-accent: #FFFFFF;
  }
}
body { background: var(--color-bg); color: var(--color-fg); font-size: 16px; line-height: 1.55; }
:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
```
  (`#FFFFFF` is the spec's light card token, allowed.)
- [ ] `layout.tsx`: `Archivo({ subsets:['latin'], weight:['400','600','700','800'], variable:'--font-archivo', display:'swap' })`, `JetBrains_Mono({ subsets:['latin'], weight:['400','500'], variable:'--font-jetbrains', display:'swap' })`. `<html lang="en-GB" className={both variables}>`, `<body className="font-sans antialiased">`. `metadata = { title: \`${profile.name} | ${profile.headline}\`, description: profile.sub }`.
- [ ] `opengraph-image.tsx`: `ImageResponse` from `next/og`, `size = { width: 1200, height: 630 }`, `contentType = 'image/png'`, `alt = profile.name`. Flex column, bg `#0C0D10`, name 72px `#F2F2F0` weight 800, headline 40px `#9A9A94`, 8px x 120px accent bar `#E0A040`. Default font (no font fetch).
- [ ] Verify: `npm run build` exit 0, output lists `/opengraph-image`. `npm run dev`, open `/opengraph-image`: name + headline visible.
- [ ] Commit: `feat: add pit wall tokens, fonts, layout, profile and og image`

## Phase 2: Content

### Task 3: Content files + content test

**Skills:** karpathy-guidelines, ponytail. **Spec:** 7.3-7.5, 10.
**Files:** create `src/content/{experience,education,skills,achievements,hobbies}.ts`, `tests/content.test.ts`.
**Consumes:** types from Task 2. **Produces:** `experience: Experience[]`, `education: Education[]`, `skills: SkillGroup[]`, `achievements: Achievement[]`, `hobbies: Hobby[]`.

- [ ] Write `tests/content.test.ts` first:

```ts
import { expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { profile, ui } from '../src/content/profile';
import { projects } from '../src/content/projects';
import { experience } from '../src/content/experience';
import { education } from '../src/content/education';
import { skills } from '../src/content/skills';
import { achievements } from '../src/content/achievements';
import { hobbies } from '../src/content/hobbies';

const all = JSON.stringify({ profile, ui, projects, experience, education, skills, achievements, hobbies });

it('no em or en dash in content', () => {
  for (const c of [0x2014, 0x2013]) expect(all.includes(String.fromCodePoint(c))).toBe(false);
});
it('hero sub is at most 20 words', () => {
  expect(profile.sub.trim().split(/\s+/).length).toBeLessThanOrEqual(20);
});
it('project slugs unique, only first is featured', () => {
  expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  expect(projects.filter((p) => p.featured).map((p) => p.slug)).toEqual(projects.slice(0, 1).map((p) => p.slug));
});
it('every cover and image exists under public/', () => {
  const srcs = [profile.photo.src, ...projects.flatMap((p) => [p.cover, ...p.images.map((i) => i.src)])];
  for (const s of srcs.filter(Boolean) as string[]) expect(existsSync(join('public', s)), s).toBe(true);
});
it('8 roles, 2 bullets each', () => {
  expect(experience).toHaveLength(8);
  for (const e of experience) expect(e.bullets, e.company).toHaveLength(2);
});
it('exactly one eyebrow in components', () => {
  const dir = 'src/components';
  const files = (readdirSync(dir, { recursive: true }) as string[]).filter((f) => f.endsWith('.tsx'));
  const n = files.reduce((a, f) => a + readFileSync(join(dir, f), 'utf8').split('data-eyebrow').length - 1, 0);
  expect(n).toBe(1);
});
```
- [ ] Stub `src/content/projects.ts`: `export const projects: Project[] = [];` (Task 4 fills it).
- [ ] `npm test`: FAIL (content modules missing).
- [ ] `experience.ts`, order = display. Titles/locations canonical from `D:\Job-Hunt\.claude\skills\ats-resume\references\candidate-facts.md`. Bullets below are the verified CV-body wording (`D:\Job-Hunt\CV\2026-09-29-mclaren-engineering-graduate\cv-body-mclaren-grad.tex`, `...\2026-09-16-motion-applied-fae-general\cv-body-fae.tex`, `...\2026-10-03-mclaren-python-ftc\cv-body-mclaren-python.tex`), em dashes rewritten. Copy exactly.
  - motorsport | Race Car Consultants | Tyre Performance Engineer (weekend contract) | Suffolk, United Kingdom | May 2026 | Present
    - `BRSCC Fiesta Junior and ST240 championships: own tyre allocation and lifecycle tracking for 12 customer cars to the series technical regulations, each car signed off to the run plan before its session. Zero tyre-reg penalties across 5 weekends.`
    - `Diagnose CAN bus, GPS and data-logger faults on ECUMaster systems, separating sensor or wiring faults from configuration faults before anything is replaced.`
  - motorsport | SVG Motorsport | Junior Mechanic and Data (weekend contract) | Gnosall, United Kingdom | Apr 2026 | Present
    - `Ginetta G56 Evo, British GT Cup: setup changes between sessions, pit-stop operations, and post-session data export and analysis fed back to the driver and coach.`
    - `Monitor sensor channels across the weekend to confirm safe running and inform tyre strategy.`
  - motorsport | Indian Formula 4 Championship | Graduate Race Engineer | Chennai, India | Aug 2025 | Sep 2025
    - `Re-engaged for a second season. Post-session telemetry analysis in Marelli WinTAX4 alongside AGS Formule 1 engineers to compare drivers and identify performance areas; relayed data and strategy to drivers in live sessions.`
    - `Trained 30 incoming interns on Mygale M21-F4 vehicle systems and pit-lane safety, using my telemetry platform as the teaching tool; on my own initiative, designed, tested and commissioned an in-chassis trickle-charging unit still in use by the team.`
  - motorsport | Indian Formula 4 Championship | Graduate Junior Mechanic | Chennai, India | Aug 2024 | Nov 2024
    - `Selected by written examination. Prepared Mygale M21-F4 cars for every session with MP Motorsport and Evans GP engineers.`
    - `Diagnosed and replaced on-car electronics under failure: temperature and pressure sensors, throttle-position sensor, data loggers, and a dash after calibration loss.`
  - analytics | Publicis Global Delivery | Analyst, Programmatic and Financial Operations | Remote, India | Apr 2023 | Sep 2025
    - `Built Python automation for the daily data collection and pacing updates on the Anheuser-Busch InBev US account, cutting a daily manual process by 75%.`
    - `Built and presented the dashboards the onshore US team used for spend decisions, working across time zones and raising data errors before they reached the client.`
  - analytics | Purpuligo Technologies | Product Development Manager | Jamshedpur, India | Feb 2025 | Jul 2025
    - `Captured requirements from site visits and stakeholder interviews and wrote the product specifications (sensor integration, power management, connectivity) for IoT devices.`
    - `Ran prototyping from concept to field-tested units in mining and agricultural environments, iterating on field data.`
  - analytics | Merkle Sokrati | Senior Business Analyst, Advanced Analytics | Pune, India | Jul 2022 | Feb 2023
    - `Wrote SQL on Google Ads Data Hub to build multi-channel attribution for four clients, turning each client's business question into a hypothesis, a query and a dashboard.`
    - `Automated the data collection and cleaning behind those analyses; promoted into this team from the role below.`
  - analytics | Merkle Sokrati | Business Analyst, Programmatic | Pune, India | Nov 2020 | Jun 2022
    - `Post-sale technical contact for a Singapore telecoms client: ran status meetings with internal and external stakeholders.`
    - `Resolved discrepancies between 1st- and 3rd-party reporting systems and delivered post-campaign analysis within a two-business-day deadline.`
- [ ] `education.ts`:
  - Cranfield University | MSc Automotive Mechatronics | Sep 2025 | Sep 2026 | lines: `Thesis with Zenvo Automotive: implementable active aerodynamics in minimum lap time simulation.` / `Modules: Vehicle Dynamics, Advanced Control and Optimisation, Embedded Vehicle Control Systems, Vehicle Control Applications (dSPACE HIL lab).`
  - Manipal Institute of Technology | B.Tech Electrical and Electronics Engineering | Jul 2016 | Aug 2020 | lines: `CGPA 7.4/10, UK 2:1 equivalent.` / `Team Manipal Racing (Baja SAE): electrical subsystem design, wiring harness and sensor integration.`
- [ ] `skills.ts`: 5 groups, labels + items exactly spec 7.4 (split items on commas outside parentheses, so `minimum lap time optimal control (CasADi, IPOPT)` and `Python (NumPy, pandas, Plotly, Flask, FastAPI)` each stay one item).
- [ ] `achievements.ts`: `2026` `UTAC Challenge, overall winners, as Chief Engineer of the Cranfield Kia Niro EV team` / `2024` `Indian F4 Championship: selected by written examination` / `2025-26` `Vice President, Motorsports Society of Cranfield` / `2025-26` `Student Ambassador, Cranfield University`.
- [ ] `hobbies.ts`: `{icon:'FlagCheckered', label:'Race weekends'}`, `{icon:'GameController', label:'Gaming'}`, `{icon:'<badminton>', label:'Badminton'}`, `{icon:'PersonSimpleRun', label:'Running'}`. Badminton icon: `ls node_modules/@phosphor-icons/react/dist/csr | grep -i -E 'badminton|shuttle|racquet'`; none -> `TennisBall`. Confirm all 4 names exist the same way.
- [ ] `npm test`: dash, sub, slug, roles PASS. Image test red until Task 5 (hero photo), eyebrow red until Task 7. Expected.
- [ ] Commit: `feat: add experience, education, skills, achievements, hobbies content and content test`

### Task 4: Projects content

**Skills:** karpathy-guidelines, ponytail. **Spec:** 6, 7.2, 7.5.
**Files:** create `src/content/projects.ts` (`export const projects: Project[]`). Order = spec 7.2. Only `active-aero-lap-time` has `featured: true`.

**User decision (2026-10-06):** RacePaceOracle stays; user states it is solely their work. Role `Designer and developer`. Never write any other person's name in any project copy. No repo or README link for it.

Per project: summary 1-2 sentences; overview 2-4 sentences; contributions 3-5 bullets; result 1-2 sentences. Draft only from the listed sources. Any fact not in a source: leave out. Every project: `images: []` and no `cover` (Task 5 adds paths after the visual check). Captions one line, functional ("Cumulative lap-time delta vs best static wing, Barcelona").

| slug | context / role | sources | facts to use | links |
|---|---|---|---|---|
| active-aero-lap-time | MSc thesis, Zenvo Automotive / Sole author | cv-body-mclaren-grad.tex L57-59; cv-body-ansible.tex L77-81; `D:\IRP\MLTP_AA_ATD` README | independent front + rear wings, 4WD torque vectoring; 9 configs, 2 circuits (Barcelona-Catalunya, Nurburgring), 18 converged laps, ~22,000-variable NLP; per-axle aero balance from CFD sweeps + ride-height map, smooth differentiable; Pacejka MF5.2; free wing recovers 0.24-0.43 % of a lap over best static setting; law designed for an assumed 60 deg/s actuator ceases to exist at the rate available, under half that; 8 validation scripts, 26 unit tests, 600+ assertions | none (repo private) |
| utac-2026-kia-niro | Cranfield GDP, UTAC Challenge 2026 / Chief Engineer, 9-person team | cv-body-ansible.tex L55-62; cv-body-mclaren-grad.tex L114-118; `D:\GDP` | overall winners; test plan; Python CAN-bus logger; CarMaker model correlated to cornering + slalom runs; estimators mass, slope, SoC (EKF), friction; 50+ friction runs for lookup table; RLS only if found in D:\GDP | none (team repo holds teammates' work; no consent) |
| indian-f4-telemetry-platform | Indian F4 Championship / Sole developer, own initiative | cv-body-mclaren-python.tex L104-105; candidate-facts.md | Flask + PostgreSQL; ingests WinTAX4 + AiM RaceStudio3; distance-basis overlays up to 4 drivers (Plotly); Docker behind nginx on Azure; inventory with role-based access, two championships; 30 interns trained on it | live `https://indianf4championship.com` only (both public repos hold driver-named telemetry CSVs, checked 2026-10-06: never link them) |
| indian-f4-2025-dashboard | Indian F4 Championship / Sole developer | `D:\Python Projects\IndianF42025Webapp-complete\*\README.md`, `CLAUDE.md` | React, TypeScript, Vite, shadcn/ui; serverless backend AWS Lambda, S3, API Gateway; architecture per arch.excalidraw.png | none (repos private) |
| racepaceoracle | Personal, F1 analysis platform / Designer and developer | `D:\Python Projects\racepaceoracle\README.md` (feature list only; ignore its credits line), `f1_telemetry_webapp_system_design.md` | FastF1 data, React + Vite + Tailwind, Python backend | none |
| fullmodelsim-python | Personal, port of thesis solver / Sole developer | cv-body-mclaren-python.tex L110-111; cv-body-ansible.tex L86-87; `D:\IRP\FullModelSim_Python\README.md` | 23-state model, OO Python 5,600 lines; PySide6 GUI; solver out of process (JSON/subprocess, live log); HSL MA57/MA97 with pre-flight probe + MUMPS fallback; MC64 scaling fixed a stall; 4-5x lower per-iteration solve cost; PyInstaller exe | none (public repo holds `vehParams.py` + aero `.mat`; link only after user clears it) |
| active-aero-controller-codegen | Coursework, Embedded Vehicle Control Systems / Sole author | cv-body-ansible.tex L66-73; cv-body-fae.tex L92-93 | 100 Hz discrete ECU vs 6-DOF plant; 5 buses in a data dictionary; Simulink Coder C, `-std=c99 -pedantic` zero diagnostics; bit-equivalent (exact on 5 of 6 outputs, 1 ulp on sixth); 9-gate suite caught zero-vertical-load wiring defect and showed Magic Formula block could not represent the tyre (2.4 % error to 1e-14 after port) | none |
| arduino-can-cruise-control | Coursework, Embedded Systems / Sole author | `D:\MATLAB_Projects\4_Embedded_Systems\Arduino_CAN_Models`, `...\lab work` | only what the model files and lab docs show (Simulink, Embedded Coder, Arduino, MCP2515 CAN). List every drafted fact in PR body for user fact-check | none |

Tools arrays = spec 7.2 tools column. Years = spec 7.2. Category = first word of spec context column.
F1 race-outcome ML: dropped entirely (user decision). Never mention it.

- [ ] `npm test`: dash, slug, sub tests PASS; image test may fail until Task 5.
- [ ] `grep -n -i -E 'lap time of|[0-9]+\.[0-9]+ ?s\b|pirelli|hankook|michelin|avon|kumho|yokohama' src/content/projects.ts`: no hits.
- [ ] Commit: `feat: add project content`

## Phase 3: Images

### Task 5: Image pipeline (orchestrator runs; needs visual review)

**Files:** `public/images/projects/<slug>/*`. Then update `cover`/`images` in `projects.ts`.

- [ ] Copy (rename to kebab-case, no spaces):
  - `D:\IRP\MLTP_AA_ATD\solutions\report\figs\{res_cumDelta_barcelona,model_aeroMapSurface,aeroActuator_BCN_ARWd_fullLap}.png` -> `active-aero-lap-time/` (cover `res_cumDelta_barcelona.png`)
  - `D:\GDP\efficiency_map.png` -> `utac-2026-kia-niro/`
  - `D:\Job-Hunt\CV\latest\indianf4championship dashboard.png` -> `indian-f4-telemetry-platform/dashboard.png`
  - `D:\Python Projects\IndianF42025Webapp-complete\IndianF42025Webapp-backend\arch.excalidraw.png` -> `indian-f4-2025-dashboard/architecture.png`, plus max 2 of `...-frontend\images\Screenshot 2025-07-*.png`
- [ ] View every copied image (Read tool). Delete any showing driver names with data, lap times in seconds, tyre supplier, vehicle params, track map with corner speeds.
- [ ] RacePaceOracle: background `npm run dev` in `D:\Python Projects\racepaceoracle` (port 8080); then `"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --window-size=1440,900 --virtual-time-budget=10000 --screenshot="<worktree>/public/images/projects/racepaceoracle/home.png" http://localhost:8080`. Stop dev server. Blank/error page -> delete, no images.
- [ ] FullModelSim, from `D:\IRP\FullModelSim_Python`: `venv\Scripts\python.exe -c "import sys; from PySide6.QtWidgets import QApplication; from PySide6.QtCore import QTimer; from app.mainwindow import MainWindow; a=QApplication(sys.argv); w=MainWindow(); w.resize(1440,900); w.show(); QTimer.singleShot(3000, lambda: (w.grab().save(r'<worktree>\public\images\projects\fullmodelsim-python\gui.png'), a.quit())); a.exec()"`. View: vehicle param values visible -> delete. Fail -> image-free.
- [ ] Size: no WebP conversion (next/image serves WebP/AVIF itself). Any file > 1 MB: `node -e "require('sharp')('in.png').resize({width:1600,withoutEnlargement:true}).png().toFile('out.png')"` (sharp ships with next). Skipped otherwise.
- [ ] Update `projects.ts` cover/images. Bento slugs (first 3) must have a cover. `npm test`: image test PASS.
- [ ] Commit: `feat: add project images`

## Phase 4: Components

### Task 6: Motion leaves + email

**Skills:** karpathy-guidelines, ponytail, design-taste-frontend, vercel-react-best-practices. **Spec:** 2 motion, 5.10.
**Files:** create `src/components/motion/{reveal,count-up,stagger}.tsx`, `src/components/email.tsx`.
**Produces:** `Reveal({children, className})`, `Stagger({children, className})`, `StaggerItem({children, className})`, `CountUp({value}: {value: string})`, `Email()`.

- [ ] `reveal.tsx` (`'use client'`): `<MotionConfig reducedMotion="user"><motion.div className initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.3}} transition={{duration:0.5,ease:[0.16,1,0.3,1]}}>`. MotionConfig instead of branching on `useReducedMotion` avoids hydration mismatch.
- [ ] `stagger.tsx`: `Stagger` = MotionConfig + `motion.div initial="hidden" animate="show" variants={{hidden:{}, show:{transition:{staggerChildren:0.06}}}}`; `StaggerItem` = `motion.div variants={{hidden:{opacity:0,y:12}, show:{opacity:1,y:0}}}`.
- [ ] `count-up.tsx`:

```tsx
'use client';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  useEffect(() => {
    const n = Number(value);
    const el = ref.current;
    if (!inView || reduce || !Number.isInteger(n) || !el) return; // "P1" stays static
    const c = animate(0, n, { duration: 1, ease: 'easeOut', onUpdate: (v) => { el.textContent = String(Math.round(v)); } });
    return () => c.stop();
  }, [inView, reduce, value]);
  return <span ref={ref} className="tabular-nums">{value}</span>;
}
```
  SSR renders final value (no-JS and crawler safe).
- [ ] `email.tsx` (`'use client'`): imports `profile`; mounted flag without setState-in-effect (eslint `react-hooks/set-state-in-effect` fails lint): `const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);`. Not mounted -> render nothing (server HTML has no address). Else `<a href={'mailto:' + profile.email}>` + copy button (`navigator.clipboard.writeText`, icon `Copy` -> `Check` for 2 s, `aria-label="Copy email address"`, `aria-live="polite"` status). Clipboard reject -> leave icon, no crash.
- [ ] Verify: `npm run build` exit 0, `npm run lint` exit 0.
- [ ] Commit: `feat: add motion leaves and client email`

### Task 7: Nav, hero, metrics, about

**Skills:** karpathy-guidelines, ponytail, design-taste-frontend, vercel-react-best-practices. **Spec:** 2, 5 (Nav, 1-3).
**Files:** create `src/components/nav.tsx`, `src/components/sections/{hero,metrics,about}.tsx`; modify `src/app/layout.tsx` (render `<Nav />` above `{children}`, once for every page), `src/app/page.tsx`.

- [ ] `nav.tsx` (`'use client'`): sticky top, `h-16`, `bg-bg/90 backdrop-blur border-b border-line`. Left mono uppercase `profile.name`. lg: `ui.nav` anchors as plain `<a>` (hrefs `/#about` etc. from Task 2) + accent button `ui.cv` (`/cv.pdf`, `download`). Mobile: name + CV + `List` icon button (`aria-expanded`, `aria-controls="nav-sheet"`) toggling a full-width sheet; link click and Escape close it. One line at lg.
- [ ] `hero.tsx`: no `h-screen`; top padding `pt-24` max, `grid lg:grid-cols-[1.2fr_1fr] gap-12`. Left: `Stagger` wraps eyebrow (`StaggerItem`, `<p data-eyebrow className="font-mono text-xs uppercase tracking-[0.2em] text-accent">`), h1 OUTSIDE StaggerItem (static, LCP), sub StaggerItem, CTAs StaggerItem: `View projects` (`#projects`, accent) + `Get in touch` (`#contact`, ghost hairline). h1 `text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] text-balance`. Right: `next/image` `profile.photo`, `priority`, `aspect-[4/5] object-cover rounded border border-line`, `sizes="(min-width:1024px) 40vw, 100vw"`. Not animated. Nothing under CTAs.
- [ ] `metrics.tsx`: 3 cells `grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line border-y border-line`, value `font-mono text-4xl` via `CountUp`, label `font-mono text-sm text-muted`.
- [ ] `about.tsx`: `id="about"`, h2 `About` (`text-2xl md:text-3xl font-bold`), 2 paras `max-w-[65ch]`, mono line `Now: {profile.now}`, then `profile.availability` muted. Wrapped in `Reveal`.
- [ ] `page.tsx`: `<main><Hero/><Metrics/><About/></main>` (Nav comes from layout).
- [ ] Verify: `npm test` eyebrow test PASS (1). `npm run build` exit 0. `npm run dev`: 375 px and 1440 px no horizontal scroll; tab order reaches nav, CTAs with visible focus ring.
- [ ] Commit: `feat: add nav, hero, metric strip, about`

### Task 8: Remaining sections

**Skills:** karpathy-guidelines, ponytail, design-taste-frontend, vercel-react-best-practices. **Spec:** 5 (4-10).
**Files:** create `src/components/project-card.tsx`, `src/components/sections/{projects,experience,skills,education,achievements,hobbies,contact}.tsx`; modify `src/app/page.tsx`.
Each section: `<section id>` + `Reveal`, h2 `text-2xl md:text-3xl font-bold`, container `mx-auto max-w-6xl px-4 md:px-8 py-20`. 9 distinct layout families; no eyebrows (count stays 1).

- [ ] `project-card.tsx`: props `{ project: Project; image?: boolean; tall?: boolean }`. Whole card is `<Link href={'/projects/'+slug}>` with `rounded border border-line bg-card transition duration-200 hover:-translate-y-[2px] active:scale-[0.98] motion-reduce:transform-none`. Inside: optional `next/image` cover (only if `image && project.cover`), mono category label, title `min-w-0 break-words`, mono `context · year`, role line, summary, `View project` + `ArrowUpRight`.
- [ ] `projects.tsx` (`id="projects"`, h2 `Selected projects`): bento `grid lg:grid-cols-2 lg:grid-rows-2 gap-4`; `projects[0]` `lg:row-span-2 tall image`, `projects[1..2]` `image`; first bento image `priority`. Then h3 `More projects`, `grid lg:grid-cols-3 gap-4`, rest image-free.
- [ ] `experience.tsx`: `grid lg:grid-cols-2 gap-12`, columns `Motorsport` (group motorsport) then `Analytics and product`. Entry: mono dates `{start} - {end}`, title bold, `company, location` muted, 2 bullets.
- [ ] `skills.tsx`: 5 rows `grid md:grid-cols-[14rem_1fr]`, label left, mono pills `rounded border border-line px-2 py-1 text-sm flex flex-wrap gap-2`, no fill.
- [ ] `education.tsx`: 2 cards side by side lg, `bg-card border border-line rounded p-6`, mono dates, lines as paragraphs.
- [ ] `achievements.tsx`: list, rows separated by single `border-t border-line` (not top + bottom), mono year column `w-20`.
- [ ] `hobbies.tsx` (h2 `Off the clock`): one `flex flex-wrap gap-8` row; map `hobby.icon` via `const icons = { FlagCheckered, GameController, TennisBall, PersonSimpleRun }` (names from Task 3) imported from `/dist/ssr`, size 24, label beside.
- [ ] `contact.tsx` (`id="contact"`, h2 `Let's talk about the next car.`): `<Email/>`, LinkedIn + GitHub from `profile.links` (`LinkedinLogo`, `GithubLogo`, `rel="noopener"`), `Download CV` (`/cv.pdf`). Footer: `{profile.name} {new Date().getFullYear()}`, `Built with Next.js` (`ui.footer`).
- [ ] `page.tsx`: all 10 in spec order.
- [ ] Verify: `npm test` PASS all, `npm run build` exit 0, `npm run lint` exit 0. Dev: cards with no cover show no empty box.
- [ ] Commit: `feat: add projects, experience, skills, education, achievements, hobbies, contact`

### Task 9: Project detail page

**Skills:** karpathy-guidelines, ponytail, design-taste-frontend, vercel-react-best-practices. **Spec:** 4, 6.
**Files:** create `src/app/projects/[slug]/page.tsx`.

- [ ] Code shape (Next 16: `params` is a Promise):

```tsx
export const dynamicParams = false;
export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = projects.find((x) => x.slug === (await params).slug);
  return p ? { title: `${p.title} | ${profile.name}`, description: p.summary } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  // render below
}
```
- [ ] Render (Nav comes from layout): back link `ArrowLeft` `All projects` (`/#projects`); h1; summary; mono meta row `year · context · role · tools.join(', ')` wrapping; h2 blocks Overview / Key contributions (ul) / Result / Tools and skills (pill row as Task 8 skills). Gallery only if `images.length`: 1-3 `next/image` (first `priority`), `figcaption` muted. Links row only if `links.length`. Prev/next: `projects[(i-1+n)%n]`, `projects[(i+1)%n]`, titles + arrows. Labels (`All projects`, `Overview`, ...) as `ui` keys.
- [ ] Verify: `npm run build` lists 8 `/projects/*` SSG routes. Dev: `/projects/active-aero-lap-time` shows gallery; `/projects/arduino-can-cruise-control` shows none.
- [ ] Commit: `feat: add project detail pages`

## Phase 5: CV

### Task 10: cv.pdf

**Skills:** karpathy-guidelines, ponytail. **Files:** `public/cv.pdf` only (tex stays in temp, not committed).
Note: `resume-mclaren-grad.tex` inputs `cv-preamble-ats.tex`, not `cv-preamble.tex`. Copy both.

Temp dir `T` = `C:/Users/ASUS/AppData/Local/Temp/pk-cv` (explicit path; `$TEMP` differs between Git Bash and Python).

- [ ] Bash: `mkdir -p C:/Users/ASUS/AppData/Local/Temp/pk-cv && cp /d/Job-Hunt/CV/2026-09-29-mclaren-engineering-graduate/{cv-body-mclaren-grad,resume-mclaren-grad,cv-preamble,cv-preamble-ats}.tex C:/Users/ASUS/AppData/Local/Temp/pk-cv/`
- [ ] Edit the copies with one Python script (Write it to `T/edit.py`, run `python T/edit.py`), asserting each target line before changing it:
  - body line 34 (index 33, must contain `Engineering Graduate`) -> `    {\small Vehicle dynamics, control and telemetry, proven trackside.}\\[3pt]`
  - body line 140 (index 139, must start `\textbf{Right to work:}`) -> `\textbf{Right to work:} Graduate visa valid to Jan 2029; eligible for Skilled Worker sponsorship. \\` (user decision, exact wording)
  - preamble-ats `\proj` macro: `\textbf{#1} --- #2` -> `\textbf{#1}: #2`
  - then every non-comment line (first non-space char not `%`) of every `T/*.tex`: regex ` ?--- ?` -> `, `, then `--` -> `-`. Ranges become plain hyphens (`0.24-0.43`, `Sep 2025 - Sep 2026`) so the PDF holds no U+2014 or U+2013.
- [ ] Check: `grep -n -E -- '--|textemdash|textendash' T/*.tex | grep -v -E ':[[:space:]]*%'` empty. Read body L59: `headline gain}, measured how much` reads fine.
- [ ] PowerShell compile: `$env:PATH = ($env:PATH -split ';' | Where-Object { $_ -notlike '*claude.exe*' }) -join ';'; Set-Location C:\Users\ASUS\AppData\Local\Temp\pk-cv; & "$env:LOCALAPPDATA\Programs\MiKTeX\miktex\bin\x64\pdflatex.exe" -interaction=nonstopmode resume-mclaren-grad.tex` (run twice).
- [ ] Verify: log has `Output written on resume-mclaren-grad.pdf`. `python -c "import pypdf; t=' '.join(' '.join(p.extract_text() for p in pypdf.PdfReader(r'C:\Users\ASUS\AppData\Local\Temp\pk-cv\resume-mclaren-grad.pdf').pages).split()); print([hex(c) for c in (0x2014,0x2013) if chr(c) in t]); print('proven trackside' in t, 'Skilled Worker sponsorship' in t, 'programme' in t)"` prints `[]` then `True True False`.
- [ ] `cp C:/Users/ASUS/AppData/Local/Temp/pk-cv/resume-mclaren-grad.pdf public/cv.pdf`. Commit: `feat: add cv pdf`

## Phase 6: Gates

### Task 11: Tests, build, lint, leak checks

**Skills:** karpathy-guidelines, ponytail.

- [ ] `npm test`: 6 passed.
- [ ] `npm run build` and `npm run lint`: exit 0, zero type errors.
- [ ] Email leak: `grep -rl 'pk2559896@' .next/server/app --include='*.html' --include='*.rsc' --include='*.body'`: empty.
- [ ] Dash sweep: `node -e "const fs=require('fs'),p=require('path');const bad=[0x2014,0x2013].map(c=>String.fromCodePoint(c));const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(p.join(d,e.name)):[p.join(d,e.name)]);const hits=walk('src').filter(f=>bad.some(b=>fs.readFileSync(f,'utf8').includes(b)));console.log(hits.length?hits:'clean')"`: `clean`.
- [ ] 404: `npx next start -p 3100` (background), `curl -s -o /dev/null -w '%{http_code}' localhost:3100/projects/does-not-exist`: `404`; `/cv.pdf`: `200`. Stop server.
- [ ] Commit only if something changed: `fix: <what>`.

## Phase 7: Delivery

### Task 12: Push, draft PR (orchestrator)

- [ ] Repo exists (user, 2026-10-06): `origin` = `https://github.com/often-called-pk/personal-portfolio`, `main` (`b724d45`) already pushed. Never run `gh repo create`. Never push to main.
- [ ] `git push origin worktree-portfolio-build`.
- [ ] PR body file: `$TEMP/pr-body.md` = summary (3 lines) + section 14 of `C:\Users\ASUS\.claude\skills\design-taste-frontend\SKILL.md` extracted by script with every U+2014 / U+2013 replaced by `-` (`python -c` using `chr(0x2014)`; the source line 5 contains one) + manual checklist: `- [ ] Lighthouse mobile >= 90 (perf, a11y, best practices, SEO)`, `- [ ] Both themes (OS light/dark)`, `- [ ] Keyboard tab through, focus visible`, `- [ ] 375 / 768 / 1024 / 1440 no horizontal scroll`, `- [ ] User fact-check of all copy (esp. Arduino project)`, `- [ ] Owed: profile photo, UTAC photo consent, Arduino rig photo`. Grep body for the two dash chars: none.
- [ ] `gh pr create --draft --base main --head worktree-portfolio-build --title "feat: personal portfolio site" --body-file $TEMP/pr-body.md`. Never push to main after this.
- [ ] Vercel (user step, put in PR body):
  1. vercel.com/new, sign in with GitHub, Import `often-called-pk/personal-portfolio` (grant repo access if not listed).
  2. Project Name `prashantkumar` (taken: `prashant-kumar`, then `prashantkr`). Framework auto-detects Next.js. No env vars. Deploy.
  3. Settings > Git: Production Branch `main`. PR branch gets preview URLs automatically.
  4. Merge PR -> prod deploy at `https://<project>.vercel.app`.
