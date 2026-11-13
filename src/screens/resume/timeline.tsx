'use client';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Linha do tempo da experiência: a linha vertical "acende" conforme a rolagem
 * e cada item entra quando chega na tela. Os itens são Server Components
 * passados como children; aqui só entra o comportamento.
 *
 * Marcação esperada nos filhos: `[data-tl-item]` em cada item e
 * `[data-tl-dot]` no marcador da linha.
 */
export function Timeline({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("print").matches) return; // ver AnimatedCard
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(fillRef.current, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-tl-item]").forEach((item) => {
        const dot = item.querySelector("[data-tl-dot]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 82%", once: true },
        });
        tl.fromTo(item, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" });
        if (dot) tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(3)" }, 0.1);
        tl.fromTo(
          item.querySelectorAll("[data-tl-chip]"),
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power2.out" },
          0.3
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative">
      {/* Trilho e preenchimento da linha */}
      <div aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10 md:left-[11px]" />
      <div
        ref={fillRef}
        aria-hidden
        className="absolute left-[7px] top-2 bottom-2 w-px origin-top scale-y-0 bg-linear-to-b from-amber-300 via-orange-500 to-sky-400 shadow-[0_0_12px_rgba(251,146,60,0.7)] md:left-[11px]"
      />
      {children}
    </div>
  );
}
