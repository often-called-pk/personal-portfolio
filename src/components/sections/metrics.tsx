import { CountUp } from '@/components/motion/count-up';
import { Stagger, StaggerItem } from '@/components/motion/stagger';
import { profile } from '@/content/profile';

export function Metrics() {
  return (
    <Stagger inView className="mx-auto max-w-6xl px-4 md:px-8">
      {/* Three columns at every width: stacked, two of the three facts would drop below the fold on
          phones. The first card (P1) is the page's one solid accent surface besides buttons. */}
      <ul role="list" className="grid grid-cols-3 gap-2 sm:gap-4">
        {profile.metrics.map((m, i) => (
          <li key={m.label} className="min-w-0">
            <StaggerItem
              className={`h-full rounded border p-3 sm:p-6 lg:p-8 ${i === 0 ? 'border-accent bg-accent text-on-accent' : 'border-line bg-card'}`}
            >
              <p className="font-mono text-3xl font-medium leading-none tracking-[-0.04em] sm:text-5xl lg:text-7xl">
                <CountUp value={m.value} />
              </p>
              <p
                className={`mt-3 break-words font-mono text-xs leading-snug sm:mt-6 sm:text-sm ${i === 0 ? 'text-on-accent' : 'text-muted'}`}
              >
                {m.label}
              </p>
            </StaggerItem>
          </li>
        ))}
      </ul>
    </Stagger>
  );
}
