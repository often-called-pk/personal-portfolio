'use client';
import { CheckIcon, CopyIcon } from '@phosphor-icons/react';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { profile, ui } from '@/content/profile';

// Module level so the subscribe identity is stable across renders.
const subscribe = () => () => {};

export function Email() {
  // false while prerendering and hydrating, true after: the address never reaches the HTML.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const [copied, setCopied] = useState(false);

  // The reset timer lives and dies with `copied`, so unmount clears it.
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  if (!mounted) return null;

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      // Denied or unavailable (insecure context): keep the copy icon.
    }
  }

  return (
    <div className="flex items-center gap-3">
      <a
        href={`mailto:${profile.email}`}
        className="min-w-0 break-all py-2 font-mono text-lg underline decoration-muted underline-offset-4 transition-[color,text-decoration-color] hover:text-accent hover:decoration-accent md:text-2xl"
      >
        {profile.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={ui.copyEmail}
        className="grid size-11 shrink-0 place-items-center rounded border border-line text-muted transition-[color,border-color] hover:border-accent hover:text-accent motion-safe:active:scale-[0.98]"
      >
        {copied ? <CheckIcon size={20} aria-hidden="true" /> : <CopyIcon size={20} aria-hidden="true" />}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? ui.emailCopied : ''}
      </span>
    </div>
  );
}
