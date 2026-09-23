import Image from "next/image";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Leaf } from "@/components/Decor";
import { Icon, type IconName } from "@/components/Icon";
import { SocialBar } from "@/components/sections/Contact";
import { PageHero } from "@/components/sections/PageHero";
import { Markets } from "@/components/sections/Showcase";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;
const valueIcons: IconName[] = ["ruler", "snow", "pin", "talk"];

export async function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata(lang, "about", `${t.pages.about.title} | Veg Fresh Egypt`, t.pages.about.lead, "/img/pot-handful.jpg");
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const a = t.pages.about;

  return (
    <main>
      <PageHero
        title={a.title}
        lead={a.lead}
        image="/img/sp-harvest.jpg"
        crumbs={[{ href: href(lang), label: t.pages.home }, { label: a.title }]}
      />

      <section className="about">
        <div className="wrap">
          <div className="about-txt">
            <div className="bar rv">
              <h2 className="title">{a.storyTitle}</h2>
            </div>
            {a.story.map((p, i) => (
              <p className="sub rv" style={delay(0.1 * (i + 1))} key={i}>
                {p}
              </p>
            ))}
          </div>
          <div className="about-img rv zoom">
            <Image className="blob" src="/img/pot-handful.jpg" alt="" fill sizes="(max-width: 900px) 90vw, 45vw" />
            <Leaf width={100} style={{ top: -16, left: 8 }} />
          </div>
        </div>
      </section>

      <section className="values">
        <div className="wrap">
          <div className="center rv">
            <h2 className="title g">{a.valuesTitle}</h2>
          </div>
          <div className="v-grid">
            {a.values.map((v, i) => (
              <div className="v-card rv" style={delay(i * 0.1)} key={v.title}>
                <span className="feat-ic">
                  <Icon name={valueIcons[i]} size={28} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="station">
        <div className="wrap">
          <div className="station-card rv">
            <div>
              <h2 className="title">{a.stationTitle}</h2>
              <p className="sub">{a.stationText}</p>
            </div>
            <a
              className="btn btn-g"
              href="https://www.google.com/maps/search/?api=1&query=Abis%2C%20Alexandria%2C%20Egypt"
              target="_blank"
              rel="noopener"
            >
              <Icon name="pin" size={20} />
              {t.pages.contact.map}
            </a>
          </div>
        </div>
      </section>

      <Markets t={t} />
      <SocialBar t={t} />
    </main>
  );
}
