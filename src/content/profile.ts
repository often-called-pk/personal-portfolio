import type { Link, Profile } from './types';

export const profile: Profile = {
  name: 'Prashant Kumar',
  email: 'pk2559896@gmail.com',
  eyebrow: 'MSc Automotive Mechatronics, Cranfield',
  headline: 'Vehicle dynamics, control and telemetry, proven trackside.',
  sub: 'Thesis on active aero in lap-time simulation with Zenvo. Three seasons of race engineering across Indian F4 and British GT.',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prashantkr97' },
    { label: 'GitHub', href: 'https://github.com/often-called-pk' },
  ],
  about: [
    'I studied Electrical and Electronics Engineering at Manipal, where I worked on the electrical subsystem, wiring harness and sensor integration for the Team Manipal Racing Baja SAE car. Four and a half years in analytics followed at Merkle Sokrati and Publicis, writing SQL and Python for clients across time zones. Indian F4 pulled me trackside in 2024, and I moved to the UK to work in motorsport.',
    'I have just finished an MSc in Automotive Mechatronics at Cranfield, with a thesis on active aerodynamics for Zenvo Automotive, and I spend race weekends with British GT Cup and BRSCC teams.',
  ],
  now: 'Tyre Performance Engineer at Race Car Consultants and Junior Mechanic and Data at SVG Motorsport.',
  availability: 'UK Graduate visa to Jan 2029. Full UK driving licence. Open to relocation.',
  metrics: [
    { value: 'P1', label: 'UTAC Challenge 2026, Chief Engineer' },
    { value: '30', label: 'interns trained on vehicle systems' },
    { value: '3', label: 'seasons trackside, F4 and British GT' },
  ],
  // Placeholder until the user's own photo lands (spec 12.1).
  photo: {
    src: '/images/hero-placeholder.png',
    alt: 'Aero map surface from the active aero thesis',
  },
};

// Every UI string lives here, never inline in components. Later tasks add keys.
export const ui = {
  nav: [
    { label: 'About', href: '/#about' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Contact', href: '/#contact' },
  ] satisfies Link[],
  cv: 'Download CV',
  viewProjects: 'View projects',
  getInTouch: 'Get in touch',
  copyEmail: 'Copy email address',
  emailCopied: 'Email address copied',
  menu: 'Menu',
  aboutTitle: 'About',
  nowLabel: 'Now:',
};
