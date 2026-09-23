"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { waLink } from "@/lib/site";

/**
 * Floating WhatsApp button (one-time tooltip peek), back-to-top button,
 * and — on phones — a bottom action bar with the quote button.
 */
export function FloatingActions({
  tip,
  hello,
  toTop,
  quote,
  quoteHref,
}: {
  tip: string;
  hello: string;
  toTop: string;
  quote: string;
  quoteHref: string;
}) {
  const [peek, setPeek] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const show = window.setTimeout(() => setPeek(true), 2500);
    const hide = window.setTimeout(() => setPeek(false), 6000);
    const onScroll = () => setScrolledPast(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <button
        className={`to-top${scrolledPast ? " show" : ""}`}
        type="button"
        aria-label={toTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Icon name="up" size={20} />
      </button>

      <div className={`m-bar${scrolledPast ? " show" : ""}`}>
        <Link className="btn btn-o" href={quoteHref}>
          {quote}
        </Link>
      </div>

      <a className="wa-float" href={waLink(hello)} target="_blank" rel="noopener" aria-label={tip}>
        <span className={`wa-tip${peek ? " peek" : ""}`}>{tip}</span>
        <span className="wa-ring r2" aria-hidden="true" />
        <span className="wa-badge" aria-hidden="true">
          1
        </span>
        <span className="wa-ic">
          <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
            <path
              fill="#fff"
              d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.3 28.8l6.6-1.7A12.7 12.7 0 1 0 16 3.2zm0 23.1c-2 0-3.9-.5-5.5-1.5l-.4-.2-3.9 1 1-3.8-.3-.4A10.4 10.4 0 1 1 16 26.3zm5.7-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.9 1.1 3.5.9 4.1.8.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.4.2-1.6-.1-.1-.3-.2-.6-.3z"
            />
          </svg>
        </span>
      </a>
    </>
  );
}
