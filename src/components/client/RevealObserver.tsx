"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds `.in` to every `.rv` element as it scrolls into view (re-runs on each page).
 * A scroll-based check backs up IntersectionObserver so content never stays hidden
 * if the observer is throttled.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("in");

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".rv:not(.in)").forEach((el) => observer.observe(el));

    let timer: number | undefined;
    const check = () => {
      timer = undefined;
      document.querySelectorAll(".rv:not(.in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight - 30 && r.bottom > 0) reveal(el);
      });
    };
    const onScroll = () => {
      if (timer === undefined) timer = window.setTimeout(check, 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", check);
    check();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", check);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
