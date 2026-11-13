'use client';

import { cn } from "@/styles/lib/utils";
import { useEffect, useId, useRef, useState } from "react";

interface PopoverProps {
  /** Conteúdo do botão que abre o popover */
  trigger: React.ReactNode;
  /** Nome acessível do botão (quando o conteúdo é só um ícone) */
  label?: string;
  triggerClassName?: string;
  /** Alinhamento do painel em relação ao botão */
  align?: "start" | "end";
  panelClassName?: string;
  /** Recebe `close` para fechar ao escolher um item */
  children: (close: () => void) => React.ReactNode;
}

/**
 * Menu suspenso leve (sem dependências): abre no clique, fecha com Esc,
 * clique fora ou ao escolher um item. Setas ↑/↓ navegam entre os itens.
 */
export function Popover({ trigger, label, triggerClassName, align = "end", panelClassName, children }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const items = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
    items()[0]?.focus({ preventScroll: true });

    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const list = items();
      if (!list.length) return;
      e.preventDefault();
      const i = list.indexOf(document.activeElement as HTMLElement);
      const next = e.key === "ArrowDown" ? (i + 1) % list.length : (i - 1 + list.length) % list.length;
      list[next].focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        data-open={open}
        onClick={() => setOpen((v) => !v)}
        className={cn("group/trigger", triggerClassName)}
      >
        {trigger}
      </button>

      <div
        ref={panelRef}
        id={id}
        role="menu"
        data-open={open}
        className={cn(
          "absolute top-full z-50 mt-3 min-w-56 origin-top rounded-2xl border border-white/10 bg-[#131311]/95 p-1.5",
          "shadow-[0_24px_48px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md",
          "transition-[opacity,translate,scale,visibility] duration-200 ease-out",
          "invisible -translate-y-1 scale-95 opacity-0",
          "data-[open=true]:visible data-[open=true]:translate-y-0 data-[open=true]:scale-100 data-[open=true]:opacity-100",
          align === "end" ? "right-0 origin-top-right" : "left-0 origin-top-left",
          panelClassName
        )}
      >
        {children(close)}
      </div>
    </div>
  );
}

/** Classe padrão de um item do menu */
export const menuItemClass =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-base text-white/70 outline-none transition-colors " +
  "hover:bg-white/[0.06] hover:text-white focus-visible:bg-white/[0.06] focus-visible:text-white";
