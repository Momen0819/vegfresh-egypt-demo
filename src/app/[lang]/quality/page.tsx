import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import UnderDevelopment from "@/components/sections/UnderDevelopment";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/quality">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata(lang, "quality", `${t.pages.quality.title} | Veg Fresh Egypt`, t.pages.quality.lead, "/img/sp-harvest.jpg");
}

export default async function QualityPage({ params }: PageProps<"/[lang]/quality">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const q = t.pages.quality;

  return (
    <main>
      <PageHero
        title={q.title}
        lead={q.lead}
        image="/img/sp-harvest.jpg"
        crumbs={[{ href: href(lang), label: t.pages.home }, { label: q.title }]}
      />
      <UnderDevelopment dict={t} lang={lang} pageTitle={q.title} />
    </main>
  );
}
