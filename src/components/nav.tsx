'use client';
import { ListIcon, XIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { profile, ui } from '@/content/profile';

// Focusable elements list the exact properties they transition (color, background-color,
// border-color). Tailwind's all-colours preset also animates outline-color, which would fade
// the global focus ring in from currentColor.
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const toggle = useRef<HTMLButtonElement>(null);

  // Nav lives in the layout, so its state survives client navigations: a route change closes
  // the sheet. Derived while rendering (not in an effect) so a stale open sheet never paints.
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  // While open, Escape closes the sheet wherever focus is (Safari and Firefox do not focus a
  // clicked button) and gives focus back to the toggle, otherwise it is lost when a focused
  // sheet link disappears.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggle.current?.focus();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    // Floating bar: the header is a transparent sticky strip and only the bar takes pointer events.
    <header className="pointer-events-none sticky top-0 z-40 px-3 pt-3 md:px-6">
      <div className="pointer-events-auto relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded border border-line bg-bg/80 px-3 backdrop-blur md:px-5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex min-h-11 items-center font-mono text-sm font-medium uppercase tracking-[0.12em]"
        >
          {profile.name}
        </Link>
        <div className="flex items-center gap-2 lg:gap-8">
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {ui.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-mono text-sm text-muted transition-[color] hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="/cv.pdf"
            download={ui.cvFilename}
            className="inline-flex h-11 items-center whitespace-nowrap rounded bg-accent px-3 font-mono text-sm font-medium text-on-accent transition-[background-color] hover:bg-accent-hover motion-safe:active:scale-[0.98] sm:px-4"
          >
            {ui.cv}
          </a>
          <button
            ref={toggle}
            type="button"
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label={ui.menu}
            onClick={() => setOpen((o) => !o)}
            className="grid size-11 place-items-center rounded border border-muted transition-[color,border-color] hover:border-accent hover:text-accent motion-safe:active:scale-[0.98] lg:hidden"
          >
            {open ? <XIcon size={20} aria-hidden="true" /> : <ListIcon size={20} aria-hidden="true" />}
          </button>
        </div>
        {/* Drops under the bar instead of pushing the page down. Opaque: backdrop-blur does not nest. */}
        <nav
          id="nav-sheet"
          hidden={!open}
          className="absolute inset-x-0 top-full mt-2 rounded border border-line bg-bg lg:hidden"
        >
          <ul className="px-4">
            {ui.nav.map((item) => (
              <li key={item.href} className="border-b border-line last:border-b-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center font-mono text-base"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
