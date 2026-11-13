import type { Locale } from "@/i18n/config";

/**
 * Bandeiras em SVG inline (emoji de bandeira não aparece no Windows).
 * Desenho simplificado: em 20px os detalhes (estrelas, brasões) somem.
 * Recortadas em círculo pelo container.
 */
function Brazil() {
  return (
    <svg viewBox="0 0 20 14" preserveAspectRatio="xMidYMid slice" className="size-full">
      <rect width="20" height="14" fill="#009C3B" />
      <path d="M10 1.6 18.4 7 10 12.4 1.6 7Z" fill="#FFDF00" />
      <circle cx="10" cy="7" r="3.3" fill="#002776" />
      <path d="M6.9 6.2c2.1-.5 4.4-.2 6.2.9" stroke="#fff" strokeWidth=".6" fill="none" />
    </svg>
  );
}

function Spain() {
  return (
    <svg viewBox="0 0 20 14" preserveAspectRatio="xMidYMid slice" className="size-full">
      <rect width="20" height="14" fill="#AA151B" />
      <rect y="3.5" width="20" height="7" fill="#F1BF00" />
    </svg>
  );
}

function UnitedStates() {
  return (
    <svg viewBox="0 0 19 10" preserveAspectRatio="xMidYMid slice" className="size-full">
      <rect width="19" height="10" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 10) / 13} width="19" height={10 / 13} fill="#B22234" />
      ))}
      <rect width="7.6" height={(10 * 7) / 13} fill="#3C3B6E" />
    </svg>
  );
}

const FLAGS: Record<Locale, () => React.JSX.Element> = { pt: Brazil, es: Spain, en: UnitedStates };

export function Flag({ locale, className = "size-5" }: { locale: Locale; className?: string }) {
  const Svg = FLAGS[locale];
  return (
    <span aria-hidden className={`inline-block shrink-0 overflow-hidden rounded-full ring-1 ring-white/15 ${className}`}>
      <Svg />
    </span>
  );
}
