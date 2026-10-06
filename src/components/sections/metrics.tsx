import { CountUp } from '@/components/motion/count-up';
import { profile } from '@/content/profile';

export function Metrics() {
  return (
    <div className="mx-auto max-w-6xl px-4 md:px-8">
      {/* Three columns at every width: stacked, the strip pushed two of the three facts below
          the fold on phones. It stays one compact row there and opens up from sm. */}
      <ul className="grid grid-cols-3 divide-x divide-line border-y border-line">
        {profile.metrics.map((m) => (
          <li key={m.label} className="px-3 py-4 first:pl-0 last:pr-0 sm:px-6 sm:py-6">
            <p className="font-mono text-2xl font-medium sm:text-4xl">
              <CountUp value={m.value} />
            </p>
            <p className="mt-1 font-mono text-xs text-muted sm:mt-2 sm:text-sm">{m.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
