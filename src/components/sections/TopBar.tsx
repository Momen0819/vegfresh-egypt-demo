import { Icon } from "@/components/Icon";
import { LangLink } from "@/components/client/LangLink";
import { locales, localeNames, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ar";
import { site, waLink } from "@/lib/site";

export function TopBar({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <div className="top">
      <div className="wrap">
        <div className="top-info">
          <span>
            <Icon name="pin" size={16} />
            {t.top.address}
          </span>
          <span>
            <Icon name="chat" size={16} />
            <span className="num" style={{ fontWeight: 500 }}>
              {site.whatsappDisplay}
            </span>
          </span>
        </div>
        <nav className="langs" aria-label={t.top.language}>
          <Icon name="globe" size={16} />
          {locales.map((l) => (
            <LangLink key={l} locale={l} lang={l} aria-current={l === lang}>
              {localeNames[l]}
            </LangLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

/** Bottom of the mobile menu: language pills + quick contact. */
export function MenuExtras({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <>
      <div className="menu-langs" aria-label={t.top.language}>
        {locales.map((l) => (
          <LangLink key={l} locale={l} lang={l} aria-current={l === lang}>
            {localeNames[l]}
          </LangLink>
        ))}
      </div>
      <div className="menu-cta">
        <a className="btn btn-o" href="#contact">
          {t.cta.quote}
        </a>
        <a className="btn btn-g" href={waLink(t.wa.hello)} target="_blank" rel="noopener">
          <Icon name="chat" size={20} />
          {t.wa.short}
        </a>
      </div>
      <p className="menu-addr">
        <Icon name="pin" size={16} />
        {t.top.address}
      </p>
    </>
  );
}
