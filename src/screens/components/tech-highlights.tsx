import { FEATURED_TECH } from "@/data/tech-stack";
import { techIcon } from "./tech-icons";

/**
 * As 8 tecnologias principais, reveladas por trás do retrato ASCII do card
 * do avatar. Server Component: só HTML + SVG + transição CSS.
 *
 * Em repouso os ícones ficam discretos; quando o card pai (`group/reveal`,
 * ver AsciiReveal) está revelado, ganham a cor da marca.
 */
export function TechHighlights() {
  return (
    <ul aria-hidden className="absolute inset-x-6 top-20 bottom-8 grid grid-cols-2 content-center gap-x-4 gap-y-6">
      {FEATURED_TECH.map((slug, i) => {
        const icon = techIcon(slug);
        if (!icon) return null;
        return (
          <li
            key={slug}
            className="flex items-center gap-2.5 text-white/10 transition-[color] duration-700 group-data-[revealed=true]/reveal:text-(--brand)
                       animate-drift motion-reduce:animate-none"
            style={{
              "--brand": `#${icon.hex}`,
              transitionDelay: `${i * 60}ms`,
              // Cada ícone num ritmo e fase diferentes: o conjunto "respira" sem sincronizar
              animationDuration: `${4 + (i % 3) * 0.8}s`,
              animationDelay: `${-i * 0.7}s`,
            } as React.CSSProperties}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-7 shrink-0">
              <use href={`/icons/tech.svg#${icon.slug}`} />
            </svg>
            <span className="text-sm font-semibold text-white/0 transition-colors duration-700 group-data-[revealed=true]/reveal:text-white/85">
              {icon.title}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
