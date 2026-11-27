'use client';

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/styles/lib/utils";

type Status = "idle" | "copied" | "failed";

interface CopyButtonProps {
  value: string;
  labels: { copy: string; copied: string; failed: string };
  className?: string;
}

/** Copia `value` para a área de transferência e mostra "Copiado!" por 2s. */
export function CopyButton({ value, labels, className }: CopyButtonProps) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  };

  const text = status === "copied" ? labels.copied : status === "failed" ? labels.failed : labels.copy;

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#1a0a00] transition-colors duration-200 hover:bg-amber-100 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange-600",
        className
      )}
    >
      {status === "copied" ? <Check aria-hidden className="size-3.5" /> : <Copy aria-hidden className="size-3.5" />}
      {/* aria-live: leitores de tela anunciam "Copiado!" */}
      <span aria-live="polite">{text}</span>
    </button>
  );
}
