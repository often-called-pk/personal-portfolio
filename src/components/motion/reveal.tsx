'use client';
import { MotionConfig, motion } from 'motion/react';
import type { ReactNode } from 'react';

// MotionConfig (not a useReducedMotion branch) keeps server and client markup identical.
// amount is a fraction of the element: 0.3 never fires for blocks taller than 3.3 viewports
// (stuck at opacity 0 on phones for long sections), so 0.1 (up to 10 viewports).
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
