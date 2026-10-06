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
  // The bento (first 3) and the 6-column more-projects grid (next 5) are laid out for exactly 8.
  expect(projects).toHaveLength(8);
  expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  expect(projects.filter((p) => p.featured).map((p) => p.slug)).toEqual(projects.slice(0, 1).map((p) => p.slug));
});
// Every path segment must be listed in its parent directory with exact case: Windows resolves a
// wrong-case path that a Linux host would 404.
function existsExactCase(src: string) {
  let dir = 'public';
  for (const seg of src.split('/').filter(Boolean)) {
    if (!readdirSync(dir).includes(seg)) return false;
    dir = join(dir, seg);
  }
  return true;
}
it('every cover and image exists under public/ with exact case', () => {
  const srcs = [profile.photo.src, ...projects.flatMap((p) => [p.cover, ...p.images.map((i) => i.src)])];
  for (const s of srcs.filter(Boolean) as string[]) expect(existsExactCase(s), s).toBe(true);
});
it('8 roles, 2 bullets each', () => {
  expect(experience).toHaveLength(8);
  for (const e of experience) expect(e.bullets, e.company).toHaveLength(2);
});
// Spec 7.5 deny-list (confidential and unclaimed terms) is kept out of the public repo:
// tests/denylist.local.txt holds one regex source, git-ignored. Skipped where the file is absent (CI, Vercel).
const denyFile = 'tests/denylist.local.txt';
it.skipIf(!existsSync(denyFile))('no confidential or unclaimed terms in content', () => {
  const DENY = new RegExp(readFileSync(denyFile, 'utf8').trim(), 'i');
  expect(all.match(DENY)?.[0], 'denied term in content').toBeUndefined();
});
it('exactly one eyebrow in components', () => {
  const dir = 'src/components';
  const files = (readdirSync(dir, { recursive: true }) as string[]).filter((f) => f.endsWith('.tsx'));
  const n = files.reduce((a, f) => a + readFileSync(join(dir, f), 'utf8').split('data-eyebrow').length - 1, 0);
  expect(n).toBe(1);
});
