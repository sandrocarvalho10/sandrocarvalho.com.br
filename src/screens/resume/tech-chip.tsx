import { techIcon } from "../components/tech-icons";

/**
 * Chip de tecnologia. Se o item for um slug do sprite, mostra o ícone, que
 * ganha a cor da marca no hover (mesma ideia do slider do card do avatar).
 */
export function TechChip({ item }: { item: string }) {
  const icon = techIcon(item);

  return (
    <li
      data-tl-chip
      className="group/chip inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-sm text-neutral-200
                 transition-[border-color,background-color,color] duration-300 hover:border-(--brand) hover:bg-neutral-700 hover:text-white"
      style={{ "--brand": icon ? `#${icon.hex}` : "rgb(245 179 76)" } as React.CSSProperties}
    >
      {icon ? (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4 text-neutral-400 transition-colors duration-300 group-hover/chip:text-(--brand)">
          <use href={`/icons/tech.svg#${icon.slug}`} />
        </svg>
      ) : (
        <span aria-hidden className="size-1.5 rounded-full bg-neutral-500 transition-colors duration-300 group-hover/chip:bg-(--brand)" />
      )}
      {icon?.title ?? item}
    </li>
  );
}
