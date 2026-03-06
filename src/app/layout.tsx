import { Metadata, Viewport } from 'next'
import '../styles/global.css'
import { archivo } from "@/fonts/index"

export const metadata: Metadata = {
  icons: {
    icon: '/icon/favicon-16x16.png',
  },
  other: {
    'msapplication-TileColor': '#ffffff',
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