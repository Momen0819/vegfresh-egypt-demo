import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { ContactSection } from "@/components/sections/Contact";
import { PageHero } from "@/components/sections/PageHero";
import { Faq } from "@/components/sections/Showcase";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata(lang, "contact", `${t.pages.contact.title} | Veg Fresh Egypt`, t.pages.contact.lead);
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const c = t.pages.contact;

  return (
    <main>
      <PageHero
        title={c.title}
        lead={c.lead}
        image="/img/pot-hands.jpg"
        crumbs={[{ href: href(lang), label: t.pages.home }, { label: c.title }]}
      />
      <ContactSection t={t} heading={false} />
      <section className="map-cta">
        <div className="wrap">
          <a
            className="btn btn-g"
            href="https://www.google.com/maps/search/?api=1&query=Abis%2C%20Alexandria%2C%20Egypt"
            target="_blank"
            rel="noopener"
          >
            <Icon name="pin" size={20} />
            {c.map}
          </a>
        </div>
      </section>
      <Faq t={t} />
    </main>
  );
}
