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
