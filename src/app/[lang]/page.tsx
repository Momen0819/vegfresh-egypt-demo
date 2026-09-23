import { notFound } from "next/navigation";
import { ContactSection, SocialBar } from "@/components/sections/Contact";
import { About, Features, Hero } from "@/components/sections/Hero";
import { Products, Seasons, Specs } from "@/components/sections/Products";
import { Faq, GallerySection, Markets } from "@/components/sections/Showcase";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  // Content is read on the server at build time; client components only get the strings they display.
  const t = await getDictionary(lang);

  return (
    <main>
      <Hero t={t} lang={lang} />
      <Features t={t} />
      <About t={t} lang={lang} />
      <Products t={t} lang={lang} />
      <Seasons t={t} lang={lang} />
      <Specs t={t} lang={lang} />
      <GallerySection t={t} lang={lang} />
      <Faq t={t} />
      <Markets t={t} />
      <SocialBar t={t} />
      <ContactSection t={t} />
    </main>
  );
}
