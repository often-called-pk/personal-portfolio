'use client';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

// SSR renders the final value (no-JS and crawler safe); the count only replays it once in view.
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  useEffect(() => {
    const n = Number(value);
    const el = ref.current;
    if (!inView || reduce || !Number.isInteger(n) || !el) return; // "P1" stays static
    const c = animate(0, n, {
      duration: 1,
      ease: 'easeOut',
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => c.stop();
  }, [inView, reduce, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
