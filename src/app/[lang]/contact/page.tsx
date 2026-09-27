import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import UnderDevelopment from "@/components/sections/UnderDevelopment";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata(lang, "contact", `${t.pages.contact.title} | Veg Fresh Egypt`, t.pages.contact.lead, "/img/pot-handful.jpg");
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const c = t.pages.contact;

  return (
    <main>
      <PageHero
        title={c.title}
        lead={c.lead}
        image="/img/pot-handful.jpg"
        crumbs={[{ href: href(lang), label: t.pages.home }, { label: c.title }]}
      />
      <UnderDevelopment dict={t} lang={lang} pageTitle={c.title} />
    </main>
  );
}
