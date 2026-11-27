import { techIcon } from "./tech-icons";

/** Nome de exibição de um item de stack (slug do sprite ou texto livre) */
export function techName(item: string) {
  return techIcon(item)?.title ?? item;
}

/**
 * Tag compacta de tecnologia (cards de projeto e grupos de stack).
 * O ícone ganha a cor da marca no hover.
 */
export function TechBadge({ item }: { item: string }) {
  const icon = techIcon(item);
  return (
    <li
      className="group/badge inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/75 transition-colors duration-300 hover:border-(--brand) hover:text-white"
      style={{ "--brand": icon ? `#${icon.hex}` : "rgb(245 179 76)" } as React.CSSProperties}
    >
      {icon && (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-3.5 text-white/60 transition-colors duration-300 group-hover/badge:text-(--brand)">
          <use href={`/icons/tech.svg#${icon.slug}`} />
        </svg>
      )}
      {icon?.title ?? item}
    </li>
  );
}
