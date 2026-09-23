import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/sections/PageHero";
import { Specs } from "@/components/sections/Products";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export async function generateMetadata({ params }: PageProps<"/[lang]/quality">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata(lang, "quality", `${t.pages.quality.title} | Veg Fresh Egypt`, t.pages.quality.lead, "/img/sp-pile.jpg");
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
        image="/img/sp-pile.jpg"
        crumbs={[{ href: href(lang), label: t.pages.home }, { label: q.title }]}
      />

      <section className="process">
        <div className="wrap">
          <div className="center rv">
            <h2 className="title">{q.stepsTitle}</h2>
          </div>
          <ol className="steps-flow">
            {q.steps.map((s, i) => (
              <li className="rv" style={delay(i * 0.1)} key={s.title}>
                <span className="step-n">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="step-spec num">{s.spec}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Specs t={t} lang={lang} />

      <section className="certs">
        <div className="wrap">
          <div className="center rv">
            <h2 className="title g">{q.certTitle}</h2>
            <p className="sub">{q.certText}</p>
          </div>
          <div className="cert-grid">
            {[0, 1, 2].map((i) => (
              <div className="cert rv" style={delay(i * 0.1)} key={i}>
                <Icon name="ruler" size={30} />
                <span>{q.certPending}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
