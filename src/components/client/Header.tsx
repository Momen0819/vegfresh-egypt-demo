"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

export type NavItem = { href: string; label: string };

export function Header({
  items,
  homeHref,
  quoteHref,
  menuLabel,
  quoteLabel,
  drawerExtras,
}: {
  items: NavItem[];
  homeHref: string;
  quoteHref: string;
  menuLabel: string;
  quoteLabel: string;
  /** Server-rendered content shown at the bottom of the mobile menu (languages, contact). */
  drawerExtras?: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Home is active only on itself; other items stay active on their sub-pages too.
  const norm = (p: string) => (p.endsWith("/") ? p : `${p}/`);
  const isActive = (itemHref: string) =>
    itemHref === homeHref ? norm(pathname) === itemHref : norm(pathname).startsWith(itemHref);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock page scroll and allow Escape to close while the mobile menu is open.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("menu-open", open);
    if (!open) return;
    // the menu starts right under the header, wherever the header currently sits
    const bottom = document.querySelector("header.site")?.getBoundingClientRect().bottom ?? 96;
    root.style.setProperty("--hdr", `${Math.round(bottom)}px`);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site${scrolled ? " scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="wrap">
        <button
          className="burger"
          type="button"
          aria-label={menuLabel}
          aria-expanded={open}
          aria-controls="mainnav"
          onClick={() => setOpen((o) => !o)}
        >
          <i />
          <i />
          <i />
        </button>
        <Link className="logo" href={homeHref} aria-label="Veg Fresh Egypt" onClick={close}>
          <Image src="/vf-logo.png" alt="Veg Fresh Egypt Export — Good Food, Good Life" width={636} height={670} priority />
        </Link>
        <Link className="btn btn-o h-cta" href={quoteHref}>
          {quoteLabel}
        </Link>
        <nav className={`nav${open ? " open" : ""}`} id="mainnav" aria-label={menuLabel}>
          <div className="nav-links">
            {items.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                className={isActive(href) ? "on" : undefined}
                aria-current={isActive(href) ? "page" : undefined}
                style={{ "--i": i } as React.CSSProperties}
                onClick={close}
              >
                {label}
              </Link>
            ))}
          </div>
          {drawerExtras && (
            <div className="nav-extras" onClick={(e) => (e.target as HTMLElement).closest("a") && close()}>
              {drawerExtras}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
