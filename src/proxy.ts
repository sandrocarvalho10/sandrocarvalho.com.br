import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

/**
 * Português é o idioma padrão e não tem prefixo na URL.
 * - "/en/...", "/es/..." seguem direto para app/[lang]
 * - "/pt/..." redireciona para a versão sem prefixo (uma URL por página)
 * - o resto ("/", "/curriculo") é reescrito por dentro para "/pt/..."
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (isLocale(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Ignora arquivos internos do Next e qualquer arquivo com extensão (public/)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
