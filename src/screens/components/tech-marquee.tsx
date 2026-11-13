import { TECH_ICONS, type TechIcon } from "./tech-icons";

/**
 * Faixas de ícones das tecnologias passando no fundo do card do avatar.
 * Server Component: só HTML + SVG + animação CSS (sem JS no cliente).
 *
 * Em repouso os ícones ficam brancos e discretos; quando o card pai
 * (`group/reveal`, ver AsciiReveal) está revelado, ganham a cor da marca.
 */

const ROWS = 4;
// Duração e sentido de cada faixa: velocidades diferentes dão profundidade
const ROW_STYLE = [
  { duration: "55s", reverse: false },
  { duration: "42s", reverse: true },
  { duration: "65s", reverse: false },
  { duration: "48s", reverse: true },
];

function Icon({ icon, index }: { icon: TechIcon; index: number }) {
  return (
    <li
      className="mr-7 flex shrink-0 items-center gap-2 text-white/10 transition-[color,opacity] duration-700
                 group-data-[revealed=true]/reveal:text-(--brand)"
      style={{
        "--brand": `#${icon.hex}`,
        // Cores entram em cascata quando o retrato se dissolve
        transitionDelay: `${(index % 8) * 60}ms`,
      } as React.CSSProperties}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-7" aria-hidden>
        <use href={`/icons/tech.svg#${icon.slug}`} />
      </svg>
      <span className="text-xs font-semibold whitespace-nowrap text-white/0 transition-colors duration-700 group-data-[revealed=true]/reveal:text-white/60">
        {icon.title}
      </span>
    </li>
  );
}

export function TechMarquee() {
  const perRow = Math.ceil(TECH_ICONS.length / ROWS);
  const rows = Array.from({ length: ROWS }, (_, r) =>
    TECH_ICONS.slice(r * perRow, (r + 1) * perRow)
  );

  return (
    <div
      aria-hidden
      className="absolute inset-0 flex flex-col justify-center gap-12 overflow-hidden
                 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      {rows.map((row, r) => (
        // Conteúdo duplicado: a faixa anda -50% e recomeça sem emenda
        <ul
          key={r}
          className="flex w-max animate-marquee motion-reduce:animate-none"
          style={{
            animationDuration: ROW_STYLE[r].duration,
            animationDirection: ROW_STYLE[r].reverse ? "reverse" : "normal",
          }}
        >
          {[...row, ...row].map((icon, i) => (
            <Icon key={`${icon.slug}-${i}`} icon={icon} index={i} />
          ))}
        </ul>
      ))}
    </div>
  );
}
