import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarLegend, monthNames } from "@/components/sections/Calendar";
import { PageHero } from "@/components/sections/PageHero";
import { Seasons } from "@/components/sections/Products";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { availability, productSlugs } from "@/lib/catalog";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/seasons">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata(lang, "seasons", `${t.pages.seasons.title} | Veg Fresh Egypt`, t.pages.seasons.lead, "/img/pot-field.jpg");
}

export default async function SeasonsPage({ params }: PageProps<"/[lang]/seasons">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const s = t.pages.seasons;
  const months = monthNames(lang);

  return (
    <main>
      <PageHero
        title={s.title}
        lead={s.lead}
        image="/img/pot-field.jpg"
        crumbs={[{ href: href(lang), label: t.pages.home }, { label: s.title }]}
      />

      <section className="calendar">
        <div className="wrap">
          <div className="cal-head rv">
            <h2 className="title g">{s.calendarTitle}</h2>
            <CalendarLegend legend={s.legend} />
          </div>
          <div className="cal-scroll rv">
            <table className="cal">
              <thead>
                <tr>
                  <th />
                  {months.map((m) => (
                    <th key={m} scope="col">
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productSlugs.map((slug) => (
                  <tr key={slug}>
                    <th scope="row">
                      <Link href={href(lang, `products/${slug}`)}>{t.pages.items[slug].name}</Link>
                    </th>
                    {availability[slug].map((m, i) => (
                      <td key={i} className={m ? `m-${m}` : undefined}>
                        <span className="sr">{m ? s.legend[m === "h" ? "harvest" : m === "p" ? "peak" : "available"] : "—"}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note">{s.note}</p>
        </div>
      </section>

      <Seasons t={t} lang={lang} />
    </main>
  );
}
