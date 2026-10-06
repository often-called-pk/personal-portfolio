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
  availability: string; photo: { src: string; alt: string };
};
