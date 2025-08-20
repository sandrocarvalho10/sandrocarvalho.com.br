import '../../styles/global.css'
import { archivo } from "@/fonts/index"

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