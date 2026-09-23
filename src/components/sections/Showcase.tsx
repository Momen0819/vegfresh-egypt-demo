import Image from "next/image";
import type { CSSProperties } from "react";
import { Leaf, Tear } from "@/components/Decor";
import { Gallery, type GalleryItem } from "@/components/client/Gallery";
import { LangLink } from "@/components/client/LangLink";
import { locales, localeNames, type Locale } from "@/i18n/config";
import Link from "next/link";
import { href } from "@/lib/routes";
import type { Dictionary } from "@/i18n/dictionaries/ar";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function GallerySection({ t, lang, more = true }: { t: Dictionary; lang: Locale; more?: boolean }) {
  const c = t.gallery.captions;
  const items: GalleryItem[] = [
    { src: "/img/sp-harvest.jpg", caption: c.harvest, category: "field" },
    { src: "/img/pot-field.jpg", caption: c.field, category: "field" },
    { src: "/img/sp-pile.jpg", caption: c.grading, category: "station" },
    { src: "/img/pot-shovel.jpg", caption: c.packing, category: "station" },
    { src: "/img/sp-market.jpg", caption: c.ready, category: "station" },
    { src: "/img/pot-golden.jpg", caption: c.table, category: "field" },
    { src: "/img/port-sunset.jpg", caption: c.containers, category: "ship" },
    { src: "/img/port-ships.jpg", caption: c.port, category: "ship" },
  ];
  return (
    <section className="gallery" id="gallery">
      <Tear flip />
      <div className="wrap">
        <div className="center rv">
          <h2 className="title w">{t.gallery.title}</h2>
        </div>
        <div className="rv" style={delay(0.1)}>
          <Gallery items={items} filters={t.gallery.filters} />
        </div>
        <p className="gnote">{t.gallery.note}</p>
        {more && (
          <div className="center">
            <Link className="btn btn-w" href={href(lang, "media")}>
              {t.nav.media}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export function Faq({ t }: { t: Dictionary }) {
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="faq-list">
          <div className="bar rv">
            <h2 className="title">{t.faq.title}</h2>
          </div>
          <div className="rv" style={delay(0.1)}>
            {t.faq.items.map((item, i) => (
              <details key={item.q} open={i === 0}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
        <div className="faq-img rv zoom">
          <Image src="/img/pot-hands.jpg" alt="" fill sizes="(max-width: 900px) 90vw, 35vw" />
          <Leaf width={90} style={{ top: 36, right: -18, "--r": "25deg", animationDelay: "-3s" } as CSSProperties} />
        </div>
      </div>
    </section>
  );
}

const greetings = { ar: "مرحبًا", en: "Hello", ru: "Здравствуйте", zh: "您好" } as const;
const ports = {
  ar: "JEBEL ALI · JEDDAH · DAMMAM",
  en: "ROTTERDAM · FELIXSTOWE",
  ru: "NOVOROSSIYSK · ST. PETERSBURG",
  zh: "SHANGHAI · NANSHA",
} as const;

export function Markets({ t }: { t: Dictionary }) {
  return (
    <section className="markets">
      <div className="wrap">
        <div className="m-head rv">
          <div>
            <span className="tag">{t.markets.tag}</span>
            <h2>{t.markets.title}</h2>
          </div>
          <p>{t.markets.text}</p>
        </div>
        <div className="langs-grid">
          {locales.map((l, i) => (
            <LangLink key={l} locale={l} className="lg rv" style={delay(i * 0.1)}>
              <span className={`hi ${l}`} lang={l}>
                {greetings[l]}
              </span>
              <b>{t.markets.regions[l]}</b>
              <span className="ports ltr">{ports[l]}</span>
              <span className="go" lang={l}>
                {localeNames[l]} {l === "ar" ? "←" : "→"}
              </span>
            </LangLink>
          ))}
        </div>
      </div>
    </section>
  );
}
