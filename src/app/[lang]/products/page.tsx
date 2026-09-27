import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import UnderDevelopment from "@/components/sections/UnderDevelopment";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/products">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata(lang, "products", `${t.pages.products.title} | Veg Fresh Egypt`, t.pages.products.lead, "/img/sp-pile.jpg");
}

export default async function ProductsPage({ params }: PageProps<"/[lang]/products">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const p = t.pages.products;

  return (
    <main>
      <PageHero
        title={p.title}
        lead={p.lead}
        image="/img/sp-pile.jpg"
        crumbs={[{ href: href(lang), label: t.pages.home }, { label: p.title }]}
      />
      <UnderDevelopment dict={t} lang={lang} pageTitle={p.title} />
    </main>
  );
}
