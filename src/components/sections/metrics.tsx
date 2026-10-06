import { CountUp } from '@/components/motion/count-up';
import { profile } from '@/content/profile';

export function Metrics() {
  return (
    <div className="mx-auto max-w-6xl px-4 md:px-8">
      <ul className="grid divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {profile.metrics.map((m) => (
          <li key={m.label} className="py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0">
            <p className="font-mono text-4xl font-medium">
              <CountUp value={m.value} />
            </p>
            <p className="mt-2 font-mono text-sm text-muted">{m.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
