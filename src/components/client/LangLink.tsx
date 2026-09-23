"use client";

import type { AnchorHTMLAttributes } from "react";
import type { Locale } from "@/i18n/config";

export const LANG_STORAGE_KEY = "vf-lang";

/**
 * Link to another language that also remembers the choice for the next visit.
 * A plain <a> on purpose: each language has its own root layout (<html lang dir>), so
 * switching is a full page load anyway, and this keeps the exact `/xx/` URL that
 * static hosts serve without needing a trailing-slash redirect.
 */
export function LangLink({ locale, onClick, ...props }: { locale: Locale } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      href={`/${locale}/`}
      hrefLang={locale}
      onClick={(e) => {
        try {
          localStorage.setItem(LANG_STORAGE_KEY, locale);
        } catch {
          // storage blocked (private mode) — the link still works
        }
        onClick?.(e);
      }}
    />
  );
}
