import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SHIELD_X } from "@/data/case-studies"
import { htmlLang, isLocale, localePath, locales } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { CaseStudyView } from "@/screens/case-study/case-study"
import { Footer } from "@/screens/components/footer"
import { Header } from "@/screens/landingPage/header"

type Props = { params: Promise<{ lang: string }> }

const PATH = `/projetos/${SHIELD_X.slug}` as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = getDictionary(lang)
  const title = `${t.caseStudy.kicker}: ${SHIELD_X.name} — Sandro Carvalho`
  const description = SHIELD_X.summary[lang]
  return {
    title,
    description,
    alternates: {
      canonical: localePath(lang, PATH),
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], localePath(l, PATH)])),
    },
    openGraph: { title, description, url: localePath(lang, PATH), type: "article" },
    twitter: { title, description },
  }
}

export default async function ShieldXPage({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = getDictionary(lang)

  return (
    <main className="flex flex-col w-full px-4 min-h-screen gap-8 pb-8">
      <Header lang={lang} path={PATH} t={t.nav} resumePdf={t.resume.pdfFile} />
      <CaseStudyView study={SHIELD_X} lang={lang} t={t.caseStudy} />
      <Footer t={t.footer} />
    </main>
  )
}
