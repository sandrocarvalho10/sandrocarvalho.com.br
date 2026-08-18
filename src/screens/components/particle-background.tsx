'use client';

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
}

const COLORS = [0xf5b34c, 0x4ade80, 0x60a5fa];
const LINK_DISTANCE = 130;
const MOUSE_RADIUS = 160;

export function ParticleBackground() {
    const hostRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let destroyed = false;
        let app: import("pixi.js").Application | null = null;
        let onPointerMove: ((e: PointerEvent) => void) | null = null;
        let onVisibility: (() => void) | null = null;

        (async () => {
            const PIXI = await import("pixi.js");
            if (destroyed || !hostRef.current) return;

            app = new PIXI.Application();
            await app.init({
                resizeTo: window,
                backgroundAlpha: 0,
                antialias: true,
                resolution: Math.min(window.devicePixelRatio || 1, 2),
                autoDensity: true,
                powerPreference: "low-power",
            });

            if (destroyed) {
                app.destroy(true, { children: true });
                return;
            }

            hostRef.current.appendChild(app.canvas);

            const area = window.innerWidth * window.innerHeight;
            const count = Math.max(28, Math.min(90, Math.round(area / 22000)));

            const dot = new PIXI.Graphics().circle(0, 0, 3).fill({ color: 0xffffff });
            const texture = app.renderer.generateTexture(dot);
            dot.destroy();

            const particles: Particle[] = [];
            const sprites: import("pixi.js").Sprite[] = [];

            const linkLayer = new PIXI.Graphics();
            app.stage.addChild(linkLayer);

            for (let i = 0; i < count; i++) {
                const sprite = new PIXI.Sprite(texture);
                sprite.anchor.set(0.5);
                const scale = Math.random() * 0.5 + 0.35;
                sprite.scale.set(scale);
                sprite.alpha = Math.random() * 0.35 + 0.15;
                sprite.tint = COLORS[i % COLORS.length];
                app.stage.addChild(sprite);
                sprites.push(sprite);

                const p: Particle = {
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    vx: (Math.random() - 0.5) * 0.18,
                    vy: (Math.random() - 0.5) * 0.18,
                    r: scale * 3,
                };
                particles.push(p);
                sprite.x = p.x;
                sprite.y = p.y;
            }

            const mouse = { x: -9999, y: -9999, active: false };
            onPointerMove = (e: PointerEvent) => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                mouse.active = true;
            };
            window.addEventListener("pointermove", onPointerMove, { passive: true });

            const tick = () => {
                const w = window.innerWidth;
                const h = window.innerHeight;

                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    p.x += p.vx;
                    p.y += p.vy;

                    if (mouse.active) {
                        const dx = p.x - mouse.x;
                        const dy = p.y - mouse.y;
                        const dist = Math.hypot(dx, dy);
                        if (dist < MOUSE_RADIUS && dist > 0.001) {
                            const force = (1 - dist / MOUSE_RADIUS) * 0.6;
                            p.x += (dx / dist) * force;
                            p.y += (dy / dist) * force;
                        }
                    }

                    if (p.x < -10) p.x = w + 10;
                    if (p.x > w + 10) p.x = -10;
                    if (p.y < -10) p.y = h + 10;
                    if (p.y > h + 10) p.y = -10;

                    sprites[i].x = p.x;
                    sprites[i].y = p.y;
                }

                linkLayer.clear();
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const a = particles[i];
                        const b = particles[j];
                        const dist = Math.hypot(a.x - b.x, a.y - b.y);
                        if (dist < LINK_DISTANCE) {
                            const alpha = (1 - dist / LINK_DISTANCE) * 0.12;
                            linkLayer
                                .moveTo(a.x, a.y)
                                .lineTo(b.x, b.y)
                                .stroke({ width: 1, color: 0xffffff, alpha });
                        }
                    }
                }
            };

            if (!reduceMotion) {
                app.ticker.add(tick);
            } else {
                tick();
            }

            onVisibility = () => {
                if (!app) return;
                if (document.hidden) app.ticker.stop();
                else if (!reduceMotion) app.ticker.start();
            };
            document.addEventListener("visibilitychange", onVisibility);
        })();

        return () => {
            destroyed = true;
            if (onPointerMove) window.removeEventListener("pointermove", onPointerMove);
            if (onVisibility) document.removeEventListener("visibilitychange", onVisibility);
            if (app) app.destroy(true, { children: true });
        };
    }, []);

    return (
        <div
            ref={hostRef}
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 opacity-70"
        />
    );
}
