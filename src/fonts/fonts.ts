import { Archivo } from 'next/font/google'

// Fonte única do site. Inter e Roboto Mono foram removidas: eram baixadas
// (preload) em toda visita, mas nenhum elemento as usava.
export const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-archivo',
})
