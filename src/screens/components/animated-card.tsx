'use client';

import { cn } from "@/styles/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Cor do glow/spotlight em formato "r, g, b" */
  glowColor?: string;
  /** Intensidade do tilt 3D em graus */
  tiltStrength?: number;
}

export function AnimatedCard({
  children,
  className,
  glowColor = "255, 255, 255",
  tiltStrength = 4,
  style,
  ...props
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const quickRotX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickRotY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useLayoutEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 32, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );

      quickRotX.current = gsap.quickTo(el, "rotateX", { duration: 0.5, ease: "power2.out" });
      quickRotY.current = gsap.quickTo(el, "rotateY", { duration: 0.5, ease: "power2.out" });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    quickRotY.current?.((px - 0.5) * tiltStrength);
    quickRotX.current?.((0.5 - py) * tiltStrength);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <div className="w-full [perspective:1400px]">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "group/card [transform-style:preserve-3d] will-change-transform opacity-0",
          className
        )}
        style={{ "--glow-color": glowColor, ...style } as React.CSSProperties}
        {...props}
      >
        {children}

        {/* Spotlight tecnológico que segue o cursor */}
        <div
          className="pointer-events-none absolute inset-0 z-40 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            background:
              "radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), rgba(var(--glow-color), 0.08), transparent 65%)",
          }}
        />

        {/* Anel de borda com brilho sutil no hover */}
        <div
          className="pointer-events-none absolute inset-0 z-40 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            boxShadow: `0 0 0 1px rgba(var(--glow-color), 0.22), 0 0 32px -12px rgba(var(--glow-color), 0.3)`,
          }}
        />
      </div>
    </div>
  );
}
