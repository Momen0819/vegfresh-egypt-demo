import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { href, type PagePath } from "./routes";
import { site } from "./site";

/** Per-page metadata with canonical + hreflang alternates for all four languages. */
export function pageMetadata(
  lang: Locale,
  path: PagePath,
  title: string,
  description: string,
  image = "/img/sp-pinkyellow.jpg",
): Metadata {
  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: {
      canonical: href(lang, path),
      languages: { ...Object.fromEntries(locales.map((l) => [l, href(l, path)])), "x-default": "/" },
    },
    openGraph: { title, description, url: href(lang, path), siteName: "Veg Fresh Egypt", locale: lang, type: "website", images: [image] },
  };
}
