import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import "../pages.css";
import { FloatingActions } from "@/components/client/FloatingActions";
import { Header } from "@/components/client/Header";
import { RevealObserver } from "@/components/client/RevealObserver";
import { SiteFooter } from "@/components/sections/Contact";
import { MenuExtras, TopBar } from "@/components/sections/TopBar";
import { dirOf, hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { fontVariables } from "@/lib/fonts";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

// Only the four locales exist; anything else is a 404 at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata(lang, "", t.meta.title, t.meta.description);
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  const nav = [
    { href: href(lang), label: t.nav.home },
    { href: href(lang, "about"), label: t.nav.about },
    { href: href(lang, "products"), label: t.nav.products },
    { href: href(lang, "seasons"), label: t.nav.seasons },
    { href: href(lang, "quality"), label: t.nav.quality },
    { href: href(lang, "logistics"), label: t.nav.logistics },
    { href: href(lang, "media"), label: t.nav.media },
    { href: href(lang, "contact"), label: t.nav.contact },
  ];

  return (
    <html lang={lang} dir={dirOf(lang)} className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before paint so scroll-reveal content starts hidden only when it can be revealed. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <TopBar t={t} lang={lang} />
        <Header
          items={nav}
          homeHref={href(lang)}
          quoteHref={href(lang, "contact")}
          menuLabel={t.nav.menu}
          quoteLabel={t.cta.quote}
          drawerExtras={<MenuExtras t={t} lang={lang} />}
        />
        {children}
        <SiteFooter t={t} lang={lang} />
        <FloatingActions
          tip={t.wa.tip}
          hello={t.wa.hello}
          toTop={t.wa.toTop}
          quote={t.cta.quote}
          quoteHref={href(lang, "contact")}
        />
        <RevealObserver />
      </body>
    </html>
  );
}
