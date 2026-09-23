import "server-only";
import type { Locale } from "./config";

const dictionaries = {
  ar: () => import("./dictionaries/ar").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
  ru: () => import("./dictionaries/ru").then((m) => m.default),
  zh: () => import("./dictionaries/zh").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
