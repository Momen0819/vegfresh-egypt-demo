import Image from "next/image";
import type { CSSProperties } from "react";
import { SweetPotatoSketch } from "@/components/Decor";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { href } from "@/lib/routes";
import type { Dictionary } from "@/i18n/dictionaries/ar";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;
const cardSizes = "(max-width: 900px) 100vw, 50vw";

export function Products({ t, lang }: { t: Dictionary; lang: Locale }) {
  const p = t.products;
  return (
    <section className="products" id="products">
      <div className="wrap">
        <SweetPotatoSketch style={{ top: -30, left: 0 }} />
        <div className="center rv">
          <h2 className="title g">{p.title}</h2>
          <p className="sub">{p.subtitle}</p>
        </div>
        <div className="pgrid">
          <article className="pcard big rv">
            <div className="pimg">
              <Image src="/img/sp-basket.jpg" alt={p.sweetPotato} fill sizes={cardSizes} />
            </div>
            <div className="pbody">
              <span className="kicker">{p.mainLine}</span>
              <h3>
                <Link href={href(lang, "products/sweet-potato")}>{p.sweetPotato}</Link>
              </h3>
              <p>{p.sweetPotatoText}</p>
              <div className="chips">
                <span className="chip d">4 GRADES · S M L XL</span>
                <span className="chip d">13–15 °C</span>
                <span className="chip d">SEP → MAY</span>
              </div>
              <Link className="more" href={href(lang, "products/sweet-potato")}>
                {p.fullSpecs}
              </Link>
            </div>
          </article>
          <article className="pcard rv" style={delay(0.1)}>
            <div className="pimg">
              <Image src="/img/pot-golden.jpg" alt={p.table} fill sizes={cardSizes} />
            </div>
            <div className="pbody">
              <h3>
                <Link href={href(lang, "products/table-potatoes")}>{p.table}</Link>
              </h3>
              <p>{p.tableText}</p>
              <div className="chips">
                <span className="chip">4–7 °C</span>
                <span className="chip">JAN → JUN</span>
              </div>
            </div>
          </article>
          <article className="pcard rv" style={delay(0.2)}>
            <div className="pimg">
              <Image src="/img/pot-bunch.jpg" alt={p.processing} fill sizes={cardSizes} />
            </div>
            <div className="pbody">
              <h3>
                <Link href={href(lang, "products/processing-potatoes")}>{p.processing}</Link>
              </h3>
              <p>{p.processingText}</p>
              <div className="chips">
                <span className="chip">CHIPS · FRIES</span>
                <span className="chip">8–10 °C</span>
              </div>
            </div>
          </article>
        </div>
        <p className="swipe-hint" aria-hidden="true">
          <i />
          {t.ui.swipe}
        </p>
      </div>
    </section>
  );
}

export function Seasons({ t, lang }: { t: Dictionary; lang: Locale }) {
  const s = t.seasons;
  return (
    <section className="seasons" id="seasons">
      <div className="wrap">
        <div className="center rv">
          <h2 className="title">{s.title}</h2>
          <p className="sub">{s.subtitle}</p>
        </div>
        <div className="tiles">
          <div className="tile t1 rv">
            <span className="scr">Sweet Potato</span>
            <h3>{s.sweetPotato}</h3>
            <span className="num">SEP → MAY</span>
            <Link className="btn btn-w" href={href(lang, "contact")}>
              {s.book}
            </Link>
          </div>
          <div className="tile t2 rv" style={delay(0.12)}>
            <h3>{s.potatoes}</h3>
            <span className="num">JAN → JUN</span>
            <small>{s.potatoesText}</small>
          </div>
          <div className="tile t3 rv" style={delay(0.24)}>
            <h3>{s.reefer}</h3>
            <span className="num">20 PALLETS · 13 °C</span>
            <small>{s.reeferText}</small>
          </div>
        </div>
        <p className="swipe-hint" aria-hidden="true">
          <i />
          {t.ui.swipe}
        </p>
        <p className="note">
          {s.note} ·{" "}
          <Link className="more-link" href={href(lang, "seasons")}>
            {t.pages.seasons.calendarTitle}
          </Link>
        </p>
      </div>
    </section>
  );
}

export function Specs({ t, lang }: { t: Dictionary; lang: Locale }) {
  const s = t.specs;
  const rows: [string, string, string, string | null][] = [
    [s.sweetPotato, "S · M · L · XL", "13–15 °C", null],
    [s.sweetPotato, s.cured, "29–32 °C · 4–7 d", "—"],
    [s.table, "Spunta · Nicola", "4–7 °C", null],
    [s.table, "Desiree", "4–7 °C", null],
    [s.processing, s.use, "8–10 °C", null],
  ];
  return (
    <section className="specs" id="specs">
      <div className="wrap">
        <div className="specs-txt">
          <div className="bar rv">
            <h2 className="title">{s.title}</h2>
          </div>
          <p className="sub rv" style={delay(0.1)}>
            {s.text}
          </p>
          <p className="specs-note rv" style={delay(0.2)}>
            {s.note}
          </p>
          <div className="rv" style={delay(0.3)}>
            <Link className="btn btn-g" href={href(lang, "contact")}>
              {s.request}
            </Link>
          </div>
        </div>
        <div className="tscroll rv from-side">
          <table>
            <thead>
              <tr>
                <th>{s.head.product}</th>
                <th>{s.head.grade}</th>
                <th>{s.head.storage}</th>
                <th>{s.head.packing}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([product, grade, storage, packing], i) => (
                <tr key={i}>
                  <td data-label={s.head.product}>{product}</td>
                  <td data-label={s.head.grade} className={/[A-Z]/.test(grade) ? "num" : undefined}>
                    {grade}
                  </td>
                  <td data-label={s.head.storage} className="num">
                    {storage}
                  </td>
                  <td data-label={s.head.packing} className={packing ? undefined : "tbc"}>
                    {packing ?? s.toConfirm}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
