'use client';
import { MotionConfig, motion, stagger, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

// Motion 14 deprecates `staggerChildren`; `delayChildren: stagger(s)` gives the same 0, s, 2s, ... delays.
const container: Variants = { hidden: {}, show: { transition: { delayChildren: stagger(0.06) } } };
const item: Variants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div className={className} initial="hidden" animate="show" variants={container}>
        {children}
      </motion.div>
    </MotionConfig>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
