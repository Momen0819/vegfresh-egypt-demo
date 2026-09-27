import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import UnderDevelopment from "@/components/sections/UnderDevelopment";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { isProductSlug, productMeta, productSlugs } from "@/lib/catalog";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/products/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isProductSlug(slug)) return {};
  const t = await getDictionary(lang);
  const item = t.pages.items[slug];
  return pageMetadata(lang, `products/${slug}`, `${item.name} | Veg Fresh Egypt`, item.intro, productMeta[slug].image);
}

export default async function ProductPage({ params }: PageProps<"/[lang]/products/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isProductSlug(slug)) notFound();
  const t = await getDictionary(lang);
  const item = t.pages.items[slug];
  const meta = productMeta[slug];

  return (
    <main>
      <PageHero
        title={item.name}
        lead={item.short}
        image={meta.image}
        crumbs={[
          { href: href(lang), label: t.pages.home },
          { href: href(lang, "products"), label: t.pages.products.title },
          { label: item.name },
        ]}
      />
      <UnderDevelopment dict={t} lang={lang} pageTitle={item.name} />
    </main>
  );
}
