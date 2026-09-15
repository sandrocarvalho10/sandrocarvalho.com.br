"use client";

import { useEffect } from "react";

/** Keep the server-rendered content readable before animation code loads. */
export function PortfolioMotion() {
  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;

    async function setup() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const context = gsap.context(() => {
          gsap.from(".hero-copy > :not(.hero-bottom)", {
            y: 22,
            duration: 0.85,
            stagger: 0.09,
            ease: "power3.out",
            clearProps: "transform,opacity",
          });
          gsap.from(".title-line", {
            y: 25,
            rotation: 1.5,
            transformOrigin: "left bottom",
            duration: 1.15,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform",
          });
          gsap.to(".contact-art", {
            "--contact-drift": "-24px",
            ease: "none",
            scrollTrigger: {
              trigger: ".contact-section",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
          gsap.from(".portrait", {
            y: 16,
            scale: 0.98,
            duration: 1.1,
            ease: "power3.out",
            clearProps: "transform",
          });
          gsap.utils
            .toArray<HTMLElement>(
              ".section-heading, .featured-project, .project-card, .about-copy, .learning-card, .expertise-card, .resume-heading, .resume-download, .contact-section",
            )
            .forEach((element) => {
              // Never hide sections the visitor has already reached (including hash links).
              if (element.getBoundingClientRect().top < window.innerHeight)
                return;
              gsap.from(element, {
                y: 28,
                opacity: 0.25,
                duration: 0.8,
                ease: "power2.out",
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: element,
                  start: "top 94%",
                  once: true,
                },
              });
            });
        }, document.querySelector(".portfolio-shell")!);
        return () => context.revert();
      });
      media.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
        () => {
          const listeners: (() => void)[] = [];
          const context = gsap.context(() => {
            const surfaces = [
              {
                element: document.querySelector<HTMLElement>(".hero-grid"),
                x: "--depth-x",
                y: "--depth-y",
              },
              ...Array.from(
                document.querySelectorAll<HTMLElement>(".project-image"),
              ).map((element) => ({ element, x: "--card-x", y: "--card-y" })),
            ];
            surfaces.forEach(({ element, x, y }) => {
              if (!element) return;
              const moveX = gsap.quickTo(element, x, {
                duration: 0.7,
                ease: "power3.out",
              });
              const moveY = gsap.quickTo(element, y, {
                duration: 0.7,
                ease: "power3.out",
              });
              const move = (event: PointerEvent) => {
                if (event.pointerType !== "mouse") return;
                const bounds = element.getBoundingClientRect();
                moveX(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
                moveY(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
              };
              const leave = () => {
                moveX(0);
                moveY(0);
              };
              element.addEventListener("pointermove", move);
              element.addEventListener("pointerleave", leave);
              listeners.push(() => {
                element.removeEventListener("pointermove", move);
                element.removeEventListener("pointerleave", leave);
              });
            });
          });
          return () => {
            listeners.forEach((remove) => remove());
            context.revert();
          };
        },
      );
      dispose = () => media.revert();
    }

    // Animation is progressive enhancement; a failed chunk must not hide content.
    setup().catch(() => dispose?.());
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);
  return null;
}
