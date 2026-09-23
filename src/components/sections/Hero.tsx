import type { CSSProperties } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { href } from "@/lib/routes";
import { Leaf, Tear } from "@/components/Decor";
import { Icon, type IconName } from "@/components/Icon";
import type { Dictionary } from "@/i18n/dictionaries/ar";
import { site } from "@/lib/site";
import Image from "next/image";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function Hero({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-txt">
          <span className="scr">{site.slogan}</span>
          <h1>
            {t.hero.line1}
            <br />
            <span>{t.hero.line2}</span>
          </h1>
          <p>{t.hero.text}</p>
          <div className="btns">
            <Link className="btn btn-g" href={href(lang, "contact")}>
              {t.cta.quote}
            </Link>
            <a className="btn btn-w" href="#products">
              {t.hero.seeProducts}
            </a>
          </div>
        </div>
        <div className="hero-chips">
          <span className="chip d">SWEET POTATO · 4 GRADES</span>
          <span className="chip d">COLD CHAIN 13–15 °C</span>
        </div>
      </div>
      <Tear />
    </section>
  );
}

const featureIcons: IconName[] = ["snow", "ruler", "ship", "talk"];

export function Features({ t }: { t: Dictionary }) {
  return (
    <div className="wrap">
      <div className="feats">
        {t.features.map((f, i) => (
          <div className="feat rv" style={delay(i * 0.1)} key={f.title}>
            <span className="feat-ic">
              <Icon name={featureIcons[i]} size={30} />
            </span>
            <div>
              <b>{f.title}</b>
              <small className={i >= 2 ? "ltr" : undefined}>{f.text}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function About({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="about-txt">
          <div className="bar rv">
            <h2 className="title">{t.about.title}</h2>
          </div>
          <p className="sub rv" style={delay(0.1)}>
            {t.about.before}
            <b className="hl">{t.about.highlight}</b>
            {t.about.after}
          </p>
          <div className="steps">
            {t.about.steps.map((s, i) => (
              <div className="rv" style={delay(0.2 + i * 0.1)} key={s}>
                <b>{i + 1}</b>
                <span>{s}</span>
              </div>
            ))}
          </div>
          <div className="rv" style={delay(0.4)}>
            <Link className="btn btn-o" href={href(lang, "about")}>
              {t.pages.learnMore}
            </Link>
          </div>
        </div>
        <div className="about-img rv zoom">
          <Image className="blob" src="/img/pot-handful.jpg" alt="" fill sizes="(max-width: 900px) 90vw, 45vw" />
          <Leaf width={100} style={{ top: -16, left: 8 }} />
          <Leaf dark width={74} style={{ bottom: 28, right: -10, "--r": "-35deg", animationDelay: "-2s" } as CSSProperties} />
        </div>
      </div>
    </section>
  );
}
