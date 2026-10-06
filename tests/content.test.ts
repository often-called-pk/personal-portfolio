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
