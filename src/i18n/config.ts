/**
 * Idiomas do site. Português é o padrão e fica sem prefixo na URL
 * ("/", "/curriculo"); os outros usam prefixo ("/en", "/es/curriculo").
 * O `src/proxy.ts` reescreve as URLs sem prefixo para `/pt/...` por dentro.
 */
export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Atributo `lang` do <html> e `hreflang` dos links */
export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

/** Nome de cada idioma escrito nele mesmo (padrão em seletores de idioma) */
export const localeName: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

/** Caminho público de uma página num idioma: localePath("en", "/curriculo") -> "/en/curriculo" */
export function localePath(locale: Locale, path: string = "/") {
  const rest = path === "/" ? "" : path;
  if (locale === defaultLocale) return rest || "/";
  return `/${locale}${rest}`;
}

/** Páginas que existem nos três idiomas (usado no seletor de idioma) */
export type SitePath = "/" | "/curriculo";
