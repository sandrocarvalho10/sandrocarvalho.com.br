import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { htmlLang, isLocale, localePath, locales } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { Footer } from "@/screens/components/footer"
import { Header } from "@/screens/landingPage/header"
import { Resume } from "@/screens/resume/resume"
import { ResumePrint } from "@/screens/resume/resume-print"

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = getDictionary(lang).meta
  return {
    title: t.resumeTitle,
    description: t.resumeDescription,
    alternates: {
      canonical: localePath(lang, "/curriculo"),
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], localePath(l, "/curriculo")])),
    },
    openGraph: { title: t.resumeTitle, description: t.resumeDescription, url: localePath(lang, "/curriculo") },
  }
}

export default async function ResumePage({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = getDictionary(lang)

  return (
    <main className="flex flex-col w-full px-4 min-h-screen gap-8 pb-8 print:p-0 print:gap-0">
      <Header lang={lang} path="/curriculo" t={t.nav} resumePdf={t.resume.pdfFile} />
      <Resume t={t.resume} />
      <ResumePrint t={t.resume} />
      <Footer t={t.footer} />
    </main>
  )
}
