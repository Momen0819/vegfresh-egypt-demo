import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import UnderDevelopment from "@/components/sections/UnderDevelopment";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/media">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata(lang, "media", `${t.pages.media.title} | Veg Fresh Egypt`, t.pages.media.lead, "/img/sp-pile.jpg");
}

export default async function MediaPage({ params }: PageProps<"/[lang]/media">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const m = t.pages.media;

  return (
    <main>
      <PageHero
        title={m.title}
        lead={m.lead}
        image="/img/sp-pile.jpg"
        crumbs={[{ href: href(lang), label: t.pages.home }, { label: m.title }]}
      />
      <UnderDevelopment dict={t} lang={lang} pageTitle={m.title} />
    </main>
  );
}
