import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Specs } from "@/components/sections/Products";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { productMeta, productSlugs } from "@/lib/catalog";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export async function generateMetadata({ params }: PageProps<"/[lang]/products">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata(lang, "products", `${t.pages.products.title} | Veg Fresh Egypt`, t.pages.products.lead, "/img/sp-basket.jpg");
}

export default async function ProductsPage({ params }: PageProps<"/[lang]/products">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <main>
      <PageHero
        title={t.pages.products.title}
        lead={t.pages.products.lead}
        image="/img/sp-pile.jpg"
        crumbs={[{ href: href(lang), label: t.pages.home }, { label: t.pages.products.title }]}
      />

      <section className="plist">
        <div className="wrap">
          {productSlugs.map((slug, i) => {
            const item = t.pages.items[slug];
            const meta = productMeta[slug];
            return (
              <article className={`prow rv${i % 2 ? " flip" : ""}`} style={delay(0.05)} key={slug}>
                <Link className="prow-img" href={href(lang, `products/${slug}`)} tabIndex={-1} aria-hidden="true">
                  <Image src={meta.image} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
                </Link>
                <div className="prow-body">
                  {i === 0 && <span className="kicker">{t.products.mainLine}</span>}
                  <h2>
                    <Link href={href(lang, `products/${slug}`)}>{item.name}</Link>
                  </h2>
                  <p>{item.intro}</p>
                  <div className="chips">
                    {meta.chips.map((c) => (
                      <span className="chip" key={c}>
                        {c}
                      </span>
                    ))}
                  </div>
                  <Link className="btn btn-g" href={href(lang, `products/${slug}`)}>
                    {t.pages.product.specSheet}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Specs t={t} lang={lang} />
    </main>
  );
}
