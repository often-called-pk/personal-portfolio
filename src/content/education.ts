import type { Education } from './types';

export const education: Education[] = [
  {
    school: 'Cranfield University',
    degree: 'MSc Automotive Mechatronics',
    start: 'Sep 2025',
    end: 'Sep 2026',
    lines: [
      'Thesis with Zenvo Automotive: implementable active aerodynamics in minimum lap time simulation.',
      'Modules: Vehicle Dynamics, Advanced Control and Optimisation, Embedded Vehicle Control Systems, Vehicle Control Applications (dSPACE HIL lab).',
    ],
  },
  {
    school: 'Manipal Institute of Technology',
    degree: 'B.Tech Electrical and Electronics Engineering',
    start: 'Jul 2016',
    end: 'Aug 2020',
    lines: [
      'CGPA 7.4/10, UK 2:1 equivalent.',
      'Team Manipal Racing (Baja SAE): electrical subsystem design, wiring harness and sensor integration.',
    ],
  },
];
