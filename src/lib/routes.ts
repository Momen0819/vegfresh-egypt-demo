import type { Locale } from "@/i18n/config";

/** Every page of the site, as a path segment under /[lang]/. */
export const pages = ["", "about", "products", "seasons", "quality", "logistics", "media", "contact"] as const;
export type PagePath = (typeof pages)[number] | `products/${string}`;

/** Build a link that matches the static export (always a trailing slash). */
export const href = (lang: Locale, path: PagePath = "") => `/${lang}/${path ? `${path}/` : ""}`;
