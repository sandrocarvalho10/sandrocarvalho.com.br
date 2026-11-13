import type { Locale } from "../config";
import { en } from "./en";
import { es } from "./es";
import { pt } from "./pt";

export type Dictionary = typeof pt;

const dictionaries: Record<Locale, Dictionary> = { pt, en, es };

/** Textos do site num idioma. Só roda no servidor: nada disso vai para o bundle. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
