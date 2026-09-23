# Veg Fresh Egypt — website

Static, multilingual (AR / EN / RU / ZH) site for Veg Fresh Egypt Export, built with Next.js 16 (App Router).

## Run

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /ar/ (or the browser language)
npm run build    # static export to /out — upload that folder to any static host
npm run lint
npx tsc --noEmit
```

## Structure

| Path | What |
|---|---|
| `src/app/(root)/page.tsx` | `/` — picks language (saved choice → browser language → Arabic) |
| `src/app/[lang]/layout.tsx` | root layout per language: `<html lang dir>`, fonts, SEO metadata + hreflang |
| `src/app/[lang]/page.tsx` | home page |
| `src/app/[lang]/{about,products,seasons,quality,logistics,media,contact}/` | inner pages |
| `src/app/[lang]/products/[slug]/` | product detail: sweet-potato, table-potatoes, processing-potatoes |
| `src/lib/catalog.ts` | product images, chips, month availability, target ports |
| `src/i18n/dictionaries/pages/*.ts` | text for the inner pages |
| `src/i18n/dictionaries/*.ts` | all page text — `ar.ts` defines the shape, others must match it |
| `src/lib/site.ts` | phone, WhatsApp, social links, domain |
| `src/components/sections/` | server components for each section |
| `src/components/client/` | the only client components (menu, gallery filter, quote form, load calculator, floating buttons, reveal) |
| `public/img/` | photos (temporary Unsplash images — replace with real station photos) |

Data-fetching rules for this project: see [ARCHITECTURE.md](ARCHITECTURE.md).

## Before launch

- Set the real domain in `src/lib/site.ts`.
- Replace `[للتأكيد]` / `[to confirm]` placeholders in the dictionaries.
- Have native speakers review `ru.ts` and `zh.ts`.
- Add YouTube video IDs in `src/app/[lang]/media/page.tsx` once the channel has uploads (it had none on 2026-09-23).
- Replace Unsplash photos in `public/img/` with real ones (same file names).
