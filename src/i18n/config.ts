export const locales = ["ar", "en", "ru", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

/** Label shown in the language switcher, written in its own language. */
export const localeNames: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
  ru: "Русский",
  zh: "中文",
};
