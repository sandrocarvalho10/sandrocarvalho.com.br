import { Metadata, Viewport } from 'next'
import '../styles/global.css'
import { archivo } from "@/fonts/index"

export const metadata: Metadata = {
  title: 'Sandro Carvalho — Developer',
  description: 'Portfolio de Sandro Carvalho, desenvolvedor Full Stack apaixonado por transformar ideias em projetos e interfaces eficientes.',
  metadataBase: new URL('https://sandrocarvalho.com.br'),
  icons: {
    icon: '/icon/favicon-16x16.png',
  },
  openGraph: {
    title: 'Sandro Carvalho — Developer',
    description: 'Portfolio de Sandro Carvalho, desenvolvedor Full Stack apaixonado por transformar ideias em projetos e interfaces eficientes.',
    url: 'https://sandrocarvalho.com.br',
    siteName: 'Sandro Carvalho',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandro Carvalho — Developer',
    description: 'Portfolio de Sandro Carvalho, desenvolvedor Full Stack apaixonado por transformar ideias em projetos e interfaces eficientes.',
  },
  other: {
    'msapplication-TileColor': '#FF8C00',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" className={archivo.className}>
      <body>{children}</body>
    </html>
  )
}