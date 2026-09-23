import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { MonthBar } from "@/components/sections/Calendar";
import { PageHero } from "@/components/sections/PageHero";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { availability, isProductSlug, productMeta, productSlugs } from "@/lib/catalog";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { waLink } from "@/lib/site";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

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
  const p = t.pages.product;
  const item = t.pages.items[slug];
  const meta = productMeta[slug];

  const specs = [
    { k: p.varieties, v: item.varieties },
    { k: p.grades, v: item.grades },
    { k: p.packing, v: item.packing },
    { k: p.storage, v: item.storage },
    { k: p.season, v: item.season },
  ];

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

      <section className="pdetail">
        <div className="wrap">
          <div className="pd-media rv zoom">
            <div className="pd-main">
              <Image src={meta.image} alt={item.name} fill sizes="(max-width: 900px) 100vw, 50vw" priority />
            </div>
            <div className="pd-thumbs">
              {meta.gallery.map((src) => (
                <div className="pd-thumb" key={src}>
                  <Image src={src} alt="" fill sizes="(max-width: 900px) 33vw, 16vw" />
                </div>
              ))}
            </div>
          </div>

          <div className="pd-info">
            <p className="sub rv">{item.intro}</p>
            <div className="chips rv" style={delay(0.1)}>
              {meta.chips.map((c) => (
                <span className="chip" key={c}>
                  {c}
                </span>
              ))}
            </div>

            <div className="sheet rv" style={delay(0.15)}>
              <div className="sheet-head">
                <b>{p.specSheet}</b>
                <span className="num">VF · {slug.toUpperCase()}</span>
              </div>
              <dl>
                {specs.map((s) => (
                  <div key={s.k}>
                    <dt>{s.k}</dt>
                    <dd className={s.v.startsWith("[") ? "tbc" : undefined}>{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rv" style={delay(0.2)}>
              <h3 className="pd-sub">{p.uses}</h3>
              <ul className="uses">
                {item.uses.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </div>

            <div className="rv" style={delay(0.25)}>
              <h3 className="pd-sub">{p.season}</h3>
              <MonthBar lang={lang} months={availability[slug]} legend={t.pages.seasons.legend} />
            </div>

            <div className="pd-cta rv" style={delay(0.3)}>
              <Link className="btn btn-o" href={href(lang, "contact")}>
                {p.quote}
              </Link>
              <a className="btn btn-g" href={waLink(`${t.contact.form.waTitle}: ${item.name}`)} target="_blank" rel="noopener">
                {t.wa.short}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="related">
        <div className="wrap">
          <div className="bar rv">
            <h2 className="title">{p.other}</h2>
          </div>
          <div className="rel-grid">
            {productSlugs
              .filter((s) => s !== slug)
              .map((s, i) => (
                <Link className="rel-card rv" style={delay(i * 0.1)} href={href(lang, `products/${s}`)} key={s}>
                  <span className="rel-img">
                    <Image src={productMeta[s].image} alt="" fill sizes="(max-width: 680px) 100vw, 33vw" />
                  </span>
                  <b>{t.pages.items[s].name}</b>
                  <small>{t.pages.items[s].short}</small>
                </Link>
              ))}
            <Link className="rel-card all rv" style={delay(0.2)} href={href(lang, "products")}>
              <b>{p.back}</b>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
