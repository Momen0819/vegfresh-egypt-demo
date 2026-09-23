import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { LoadCalculator } from "@/components/client/LoadCalculator";
import { PageHero } from "@/components/sections/PageHero";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { targetPorts } from "@/lib/catalog";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export async function generateMetadata({ params }: PageProps<"/[lang]/logistics">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata(lang, "logistics", `${t.pages.logistics.title} | Veg Fresh Egypt`, t.pages.logistics.lead, "/img/port-sunset.jpg");
}

/** Side view of a 40ft reefer: 10 pallet stacks (×2 rows), cold air flowing from the unit. */
function ReeferDrawing() {
  return (
    <svg className="reefer" viewBox="0 0 900 300" role="img" aria-label="40ft reefer container, 20 pallets">
      <defs>
        <marker id="rf-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1 L10 5 L0 9 z" fill="#9BDB5C" />
        </marker>
      </defs>
      <rect x="40" y="40" width="760" height="200" fill="none" stroke="#CFE3C2" strokeWidth="1.4" />
      <rect x="800" y="40" width="60" height="200" fill="#2B6B41" stroke="#CFE3C2" strokeWidth="1.2" />
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={52 + i * 74} y="78" width="66" height="146" fill="#1E5A33" stroke="#CFE3C2" strokeWidth="1" />
      ))}
      {[114, 150, 186].map((y) => (
        <line key={y} x1="52" y1={y} x2="784" y2={y} stroke="#8FB47E" strokeWidth=".6" />
      ))}
      <path d="M 796 232 L 60 232" fill="none" stroke="#9BDB5C" strokeWidth="1.6" strokeDasharray="6 5" markerEnd="url(#rf-arr)" className="air" />
      <path d="M 60 60 L 796 60" fill="none" stroke="#9BDB5C" strokeWidth="1.6" strokeDasharray="6 5" markerEnd="url(#rf-arr)" className="air" />
      <text x="420" y="30" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600" fontFamily="system-ui">
        10 × 2 = 20 PALLETS · 1200 × 1000
      </text>
      <text x="420" y="268" textAnchor="middle" fill="#CFE3C2" fontSize="12" fontFamily="system-ui">
        INTERNAL L ≈ 11.6 m
      </text>
      <text x="830" y="146" textAnchor="middle" fill="#CFE3C2" fontSize="10" fontFamily="system-ui" transform="rotate(-90 830 146)">
        REEFER UNIT · 13 °C
      </text>
    </svg>
  );
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
        image="/img/port-sunset.jpg"
        crumbs={[{ href: href(lang), label: t.pages.home }, { label: l.title }]}
      />

      <section className="cold">
        <div className="wrap">
          <div className="bar rv">
            <h2 className="title">{l.coldTitle}</h2>
          </div>
          <p className="sub rv" style={delay(0.1)}>
            {l.coldText}
          </p>
          <div className="temps rv" style={delay(0.2)}>
            <div className="temp sp">
              <b className="num">13–15 °C</b>
              <span>{t.pages.items["sweet-potato"].name}</span>
            </div>
            <div className="temp tp">
              <b className="num">4–7 °C</b>
              <span>{t.pages.items["table-potatoes"].name}</span>
            </div>
            <div className="temp pp">
              <b className="num">8–10 °C</b>
              <span>{t.pages.items["processing-potatoes"].name}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="reefer-sec">
        <div className="wrap">
          <h2 className="title w rv">{l.reeferTitle}</h2>
          <div className="reefer-grid">
            <div className="reefer-scroll rv">
              <ReeferDrawing />
            </div>
            <dl className="facts rv" style={delay(0.1)}>
              {l.reeferFacts.map((f) => (
                <div key={f.k}>
                  <dt>{f.k}</dt>
                  <dd className="num">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="calc-sec">
        <div className="wrap">
          <div className="center rv">
            <h2 className="title g">{l.calc.title}</h2>
            <p className="sub">{l.calc.text}</p>
          </div>
          <div className="rv">
            <LoadCalculator t={l.calc} requestTitle={t.contact.form.waTitle} />
          </div>
        </div>
      </section>

      <section className="incoterms">
        <div className="wrap">
          <div className="center rv">
            <h2 className="title">{l.incotermsTitle}</h2>
          </div>
          <div className="inco-grid">
            {l.incoterms.map((x, i) => (
              <div className="inco rv" style={delay(i * 0.1)} key={x.code}>
                <b className="num">{x.code}</b>
                <p>{x.text}</p>
              </div>
            ))}
          </div>
          <div className="ports rv">
            <h3>{l.portsTitle}</h3>
            <div className="port-list">
              {targetPorts.map((g) => (
                <div key={g.region}>
                  <b>{t.markets.regions[g.region]}</b>
                  <span className="ltr">{g.ports.join(" · ")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
