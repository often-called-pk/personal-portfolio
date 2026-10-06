import type { SkillGroup } from './types';

export const skills: SkillGroup[] = [
  {
    label: 'Vehicle dynamics and control',
    items: [
      'minimum lap time optimal control (CasADi, IPOPT)',
      'Pacejka tyre models',
      'aero maps',
      'IPG CarMaker',
      'model-to-measurement correlation',
      'LQR/LQG',
      'dSPACE HIL (lab)',
    ],
  },
  {
    label: 'Racing data and electronics',
    items: [
      'Marelli WinTAX4',
      'AiM RaceStudio3',
      'MoTeC i2 Pro',
      'ECUMaster ADU',
      'CAN bus',
      'GPS and data loggers',
      'tyre allocation',
    ],
  },
  {
    label: 'Software',
    items: [
      'MATLAB',
      'Simulink',
      'Simulink Coder',
      'Python (NumPy, pandas, Plotly, Flask, FastAPI)',
      'C',
      'SQL',
      'PostgreSQL',
      'Git',
      'Linux',
      'Docker',
      'nginx',
      'Azure',
      'Excel VBA',
    ],
  },
  {
    label: 'Electrical and hands-on',
    items: [
      'wiring harness',
      'sensor integration',
      'KiCad',
      'corner weights',
      'alignment',
      'ride heights',
      'pit stops',
      'manual lathe and mill',
    ],
  },
  {
    label: 'Languages',
    items: ['English (C2)', 'Hindi (native)'],
  },
];
