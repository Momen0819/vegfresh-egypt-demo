import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import UnderDevelopment from "@/components/sections/UnderDevelopment";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/logistics">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata(lang, "logistics", `${t.pages.logistics.title} | Veg Fresh Egypt`, t.pages.logistics.lead, "/img/pot-boxes.jpg");
}

export default async function LogisticsPage({ params }: PageProps<"/[lang]/logistics">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const l = t.pages.logistics;

  return (
    <main>
      <PageHero
        title={l.title}
        lead={l.lead}
        image="/img/pot-boxes.jpg"
        crumbs={[{ href: href(lang), label: t.pages.home }, { label: l.title }]}
      />
      <UnderDevelopment dict={t} lang={lang} pageTitle={l.title} />
    </main>
  );
}
