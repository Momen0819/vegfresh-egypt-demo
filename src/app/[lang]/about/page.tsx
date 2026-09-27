import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import UnderDevelopment from "@/components/sections/UnderDevelopment";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata(lang, "about", `${t.pages.about.title} | Veg Fresh Egypt`, t.pages.about.lead, "/img/pot-handful.jpg");
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const a = t.pages.about;

  return (
    <main>
      <PageHero
        title={a.title}
        lead={a.lead}
        image="/img/sp-harvest.jpg"
        crumbs={[{ href: href(lang), label: t.pages.home }, { label: a.title }]}
      />
      <UnderDevelopment dict={t} lang={lang} pageTitle={a.title} />
    </main>
  );
}
