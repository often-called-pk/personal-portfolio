import type { Icon } from '@phosphor-icons/react';
import { GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react/ssr';
import { Email } from '@/components/email';
import { Reveal } from '@/components/motion/reveal';
import { profile, ui } from '@/content/profile';

// Keyed by the label in profile.links. The email is never read here: Email builds it on the client.
const icons: Record<string, Icon> = { LinkedIn: LinkedinLogoIcon, GitHub: GithubLogoIcon };

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <Reveal>
        <h2 className="text-2xl font-bold md:text-3xl">{ui.contactTitle}</h2>
        {/* min-h-11 holds the row's height while Email renders nothing before hydration. */}
        <div className="mt-8 min-h-11">
          <Email />
        </div>
        <ul className="mt-8 flex flex-wrap gap-3">
          {profile.links.map((link) => {
            const LinkIcon = icons[link.label];
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded border border-muted px-6 font-mono text-sm font-medium transition-[color,border-color] hover:border-accent hover:text-accent motion-safe:active:scale-[0.98]"
                >
                  {LinkIcon ? <LinkIcon size={20} aria-hidden="true" /> : null}
                  {link.label}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="/cv.pdf"
              download={ui.cvFilename}
              className="inline-flex h-12 items-center rounded bg-accent px-6 font-mono text-sm font-medium text-on-accent transition-[background-color] hover:bg-accent/90 motion-safe:active:scale-[0.98]"
            >
              {ui.cv}
            </a>
          </li>
        </ul>
      </Reveal>
    </section>
  );
}

// Outside <main> (see page.tsx) so it is the page footer, not a footer of the main content.
export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-6 font-mono text-sm text-muted md:px-8">
        <p>
          {profile.name} {new Date().getFullYear()}
        </p>
        <p>{ui.footer}</p>
      </div>
    </footer>
  );
}
