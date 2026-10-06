'use client';
import { MotionConfig, motion, stagger, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

// Motion 14 deprecates `staggerChildren`; `delayChildren: stagger(s)` gives the same 0, s, 2s, ... delays.
const container: Variants = { hidden: {}, show: { transition: { delayChildren: stagger(0.06) } } };
const item: Variants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

// inView plays the set once it scrolls into view (grids below the hero); without it the set plays
// on mount (hero). amount 0.1 matches Reveal, so tall stacked grids on phones still trigger.
// Variants reach StaggerItem through plain elements (ul, ol, li) in between.
export function Stagger({
  children,
  className,
  inView = false,
}: {
  children: ReactNode;
  className?: string;
  inView?: boolean;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial="hidden"
        animate={inView ? undefined : 'show'}
        whileInView={inView ? 'show' : undefined}
        viewport={inView ? { once: true, amount: 0.1 } : undefined}
        variants={container}
      >
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
