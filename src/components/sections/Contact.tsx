import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Icon } from "@/components/Icon";
import { RfqForm } from "@/components/client/RfqForm";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/ar";
import { href } from "@/lib/routes";
import { site, waLink } from "@/lib/site";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function SocialLinks({ className = "socs" }: { className?: string }) {
  return (
    <div className={className}>
      <a className="soc" href={site.whatsappChannel} target="_blank" rel="noopener" aria-label="WhatsApp Channel">
        <Icon name="whatsapp" />
      </a>
      <a className="soc" href={site.youtube} target="_blank" rel="noopener" aria-label="YouTube">
        <Icon name="youtube" />
      </a>
      <a className="soc" href={site.facebook} target="_blank" rel="noopener" aria-label="Facebook">
        <Icon name="facebook" />
      </a>
    </div>
  );
}

export function SocialBar({ t }: { t: Dictionary }) {
  return (
    <section className="social">
      <div className="wrap">
        <div className="social-txt rv">
          <Icon name="bubble" size={42} />
          <div>
            <b>{t.social.title}</b>
            <span>{t.social.text}</span>
          </div>
        </div>
        <div className="rv" style={delay(0.15)}>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}

/** Quote form + contact cards. Used on the home page and the contact page. */
export function ContactSection({ t, heading = true }: { t: Dictionary; heading?: boolean }) {
  const c = t.contact;
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        {heading && (
          <div className="center rv">
            <h2 className="title w">{c.title}</h2>
            <p>{c.text}</p>
          </div>
        )}
        <div className="c-grid">
          <div className="rv">
            <RfqForm t={c.form} />
          </div>
          <div className="infos">
            <div className="info rv" style={delay(0.1)}>
              <span className="info-ic">
                <Icon name="pin" />
              </span>
              <div>
                <b>{c.address}</b>
                <span>{c.addressValue}</span>
              </div>
            </div>
            <div className="info rv" style={delay(0.2)}>
              <span className="info-ic">
                <Icon name="chat" />
              </span>
              <div>
                <b>{c.whatsapp}</b>
                <a className="num" href={waLink()} target="_blank" rel="noopener" style={{ fontWeight: 500 }}>
                  {site.whatsappDisplay}
                </a>
              </div>
            </div>
            <div className="info rv" style={delay(0.3)}>
              <span className="info-ic">
                <Icon name="mail" />
              </span>
              <div>
                <b>{c.email}</b>
                <span className="muted">{c.emailValue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ t, lang }: { t: Dictionary; lang: Locale }) {
  const links = [
    { path: "about", label: t.nav.about },
    { path: "products", label: t.nav.products },
    { path: "seasons", label: t.nav.seasons },
    { path: "quality", label: t.nav.quality },
    { path: "logistics", label: t.nav.logistics },
    { path: "media", label: t.nav.media },
    { path: "contact", label: t.nav.contact },
  ] as const;
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="f-grid">
          <div className="f-brand">
            <span className="foot-logo">
              <Image src="/vf-logo.png" alt="Veg Fresh Egypt" width={636} height={670} />
            </span>
            <span className="scr">{site.slogan}</span>
            <p>{t.meta.description}</p>
          </div>
          <nav className="f-col" aria-label={t.pages.footer.links}>
            <b>{t.pages.footer.links}</b>
            {links.map((l) => (
              <Link key={l.path} href={href(lang, l.path)}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="f-col">
            <b>{t.pages.footer.contact}</b>
            <span>{t.contact.addressValue}</span>
            <a className="num" href={waLink()} target="_blank" rel="noopener">
              {site.whatsappDisplay}
            </a>
          </div>
          <div className="f-col">
            <b>{t.pages.footer.follow}</b>
            <SocialLinks className="socs f-socs" />
          </div>
        </div>
        <div className="foot">
          <small>{t.footer.copyright}</small>
          <span className="scr">{site.slogan}</span>
        </div>
      </div>
    </footer>
  );
}
