/** Language-independent product facts. Text for each product lives in the dictionaries (pages.items). */
export const productSlugs = ["sweet-potato", "table-potatoes", "processing-potatoes"] as const;
export type ProductSlug = (typeof productSlugs)[number];

export const isProductSlug = (v: string): v is ProductSlug => (productSlugs as readonly string[]).includes(v);

export const productMeta: Record<ProductSlug, { image: string; gallery: string[]; chips: string[] }> = {
  "sweet-potato": {
    image: "/img/sp-basket.jpg",
    gallery: ["/img/sp-pile.jpg", "/img/sp-harvest.jpg", "/img/sp-purple.jpg"],
    chips: ["4 GRADES · S M L XL", "13–15 °C", "SEP → MAY"],
  },
  "table-potatoes": {
    image: "/img/pot-golden.jpg",
    gallery: ["/img/pot-dirt.jpg", "/img/pot-field.jpg", "/img/pot-pile2.jpg"],
    chips: ["SPUNTA · NICOLA · DESIREE", "4–7 °C", "JAN → JUN"],
  },
  "processing-potatoes": {
    image: "/img/pot-bunch.jpg",
    gallery: ["/img/pot-shovel.jpg", "/img/pot-handful.jpg", "/img/pot-pile2.jpg"],
    chips: ["CHIPS · FRIES", "8–10 °C", "JAN → MAY"],
  },
};

/** Availability per month (Jan…Dec): h = harvest, p = export peak, a = available from storage, "" = off. */
export type MonthState = "h" | "p" | "a" | "";
export const availability: Record<ProductSlug, MonthState[]> = {
  "sweet-potato": ["a", "a", "a", "a", "a", "", "", "h", "p", "p", "p", "p"],
  "table-potatoes": ["p", "p", "p", "p", "a", "a", "", "", "", "", "", "h"],
  "processing-potatoes": ["a", "p", "p", "p", "a", "", "", "", "", "", "", "h"],
};

export const targetPorts = [
  { region: "ar", ports: ["Jebel Ali", "Jeddah", "Dammam"] },
  { region: "en", ports: ["Rotterdam", "Felixstowe"] },
  { region: "ru", ports: ["Novorossiysk", "St. Petersburg"] },
  { region: "zh", ports: ["Shanghai", "Nansha"] },
] as const;
