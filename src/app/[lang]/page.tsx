import { notFound } from "next/navigation"
import { isLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { Footer } from "@/screens/components/footer"
import { About } from "@/screens/landingPage/about"
import { Header } from "@/screens/landingPage/header"
import { Projects } from "@/screens/landingPage/projects"
import { Skills } from "@/screens/landingPage/skills"

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = getDictionary(lang)

  return (
    <main className="flex flex-col w-full px-4 min-h-screen gap-8 pb-8">
      <Header lang={lang} path="/" t={t.nav} resumePdf={t.resume.pdfFile} />
      <About t={t} />
      <Projects lang={lang} t={t} />
      <Skills t={t} />
      <Footer t={t.footer} />
    </main>
  )
}
