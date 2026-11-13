import { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import '../../styles/global.css'
import { archivo } from "@/fonts/index"
import { ParticleBackground } from "@/screens/components/particle-background"
import { htmlLang, isLocale, localePath, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

type Props = { params: Promise<{ lang: string }> }

// Gera as 3 versões no build; qualquer outro prefixo vira 404
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = getDictionary(lang).meta

  return {
    title: t.title,
    description: t.description,
    metadataBase: new URL('https://sandrocarvalho.com.br'),
    icons: {
      icon: '/icon/favicon-16x16.png',
    },
    alternates: {
      canonical: localePath(lang, '/'),
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], localePath(l, '/')])),
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: localePath(lang, '/'),
      siteName: 'Sandro Carvalho',
      locale: t.ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
    },
    other: {
      'msapplication-TileColor': '#FF8C00',
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return (
    <html lang={htmlLang[lang]} className={`${archivo.variable} ${archivo.className}`}>
      <body>
        <ParticleBackground />
        {children}
      </body>
    </html>
  )
}
