import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { SocialBar } from "@/components/sections/Contact";
import { PageHero } from "@/components/sections/PageHero";
import { GallerySection } from "@/components/sections/Showcase";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

/**
 * YouTube video IDs to show on the page. The channel has no uploads yet (checked 2026-09-23);
 * add IDs here as videos are published, e.g. ["dQw4w9WgXcQ"].
 */
const videos: string[] = [];

export async function generateMetadata({ params }: PageProps<"/[lang]/media">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata(lang, "media", `${t.pages.media.title} | Veg Fresh Egypt`, t.pages.media.lead, "/img/sp-harvest.jpg");
}

export default async function MediaPage({ params }: PageProps<"/[lang]/media">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const m = t.pages.media;

  return (
    <main>
      <PageHero
        title={m.title}
        lead={m.lead}
        image="/img/sp-purple.jpg"
        crumbs={[{ href: href(lang), label: t.pages.home }, { label: m.title }]}
      />

      <GallerySection t={t} lang={lang} more={false} />

      <section className="videos">
        <div className="wrap">
          <div className="center rv">
            <h2 className="title">{m.videosTitle}</h2>
          </div>
          {videos.length ? (
            <div className="video-grid">
              {videos.map((id) => (
                <div className="video rv" key={id}>
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${id}`}
                    title="YouTube video"
                    loading="lazy"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="video-empty rv">
              <span className="play">
                <Icon name="youtube" size={40} />
              </span>
              <p>{m.videosEmpty}</p>
              <a className="btn btn-o" href={site.youtube} target="_blank" rel="noopener">
                {m.youtube}
              </a>
            </div>
          )}
        </div>
      </section>

      <SocialBar t={t} />
    </main>
  );
}
