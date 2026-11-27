'use client';

import gsap from "gsap";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { AnimatedCard } from "./animated-card";
import type { Dictionary } from "@/i18n/dictionaries";
import { RESUME_CONTACT } from "@/i18n/resume-data";
import { CopyButton } from "./copy-button";

const linkBtn =
    "inline-flex items-center gap-2 border border-white px-3 py-2 text-sm font-medium text-white transition-colors duration-300 backdrop-blur-[3px] outline-none focus-visible:ring-2 focus-visible:ring-white";

export function CardAnimatedContactMe({ t }: { t: Dictionary["contact"] }) {
    const imgRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        const el = imgRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                { y: -6 },
                {
                    y: -14,
                    duration: 3,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                }
            );
        }, imgRef);

        return () => ctx.revert();
    }, []);

    return (
        <AnimatedCard
            id="contato"
            glowColor="251, 146, 60"
            className="relative w-full h-full max-w-5xl mx-auto overflow-hidden rounded-[2rem] rounded-tl-lg rounded-tr-[50px] bg-linear-to-br from-orange-600/70 to-amber-400/70 p-4 border scroll-mt-8 border-white/5 backdrop-blur-lg min-h-[400px]"
        >
            {/* Radial blur com anéis concêntricos em tons de amarelo com centro na parte inferior */}
            {/* <div className="absolute inset-0 z-0" style={{
                background: 'radial-gradient(circle at 50% 100%, #FFD700 0%, #FFD700 20%, #FFC000 20%, #FFC000 40%, #FFAA00 40%, #FFAA00 60%, #FF8C00 60%, #FF8C00 80%, #FF6F00 80%, #FF6F00 100%)',
                opacity: 0.7
            }}></div> */}

            {/* Camada de brilho suave para suavizar levemente as bordas */}
            <div className="absolute inset-0 z-1" style={{
                background: 'radial-gradient(circle at 50% 100%, rgba(255,215,0,0.4) 0%, transparent 70%)',
                mixBlendMode: 'overlay'
            }}></div>

            {/* Background animado */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                <div className="absolute z-20 bottom-0 left-0 w-full">
                    <Image
                        ref={imgRef}
                        src="/avatar_contact.png"
                        alt=""
                        width={357}
                        height={357}
                        sizes="(min-width: 768px) 270px, 180px"
                        className="w-[180px] md:w-[270px] h-auto object-cover absolute -right-4 -bottom-10 opacity-90 will-change-transform"
                    />
                </div>
            </div>

            {/* Conteúdo (pb deixa o avatar abaixo dos links) */}
            <div className="relative z-30 flex flex-col gap-6 p-2 pb-40 md:p-4 md:pb-56">
                <h2 className="text-3xl font-medium text-white">
                    {t.title}
                </h2>
                <p className="font-light text-white">
                    {t.text}
                </p>

                {/* E-mail visível + copiar. Fundo escuro translúcido garante
                    contraste AA sobre o degradê laranja/âmbar. */}
                <div className="flex flex-col gap-3 rounded-2xl bg-black/35 p-3 backdrop-blur-sm">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/80">{t.emailLabel}</span>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <a href={`mailto:${RESUME_CONTACT.email}`} className="break-all text-sm font-medium text-white underline-offset-4 hover:underline">
                            {RESUME_CONTACT.email}
                        </a>
                        <CopyButton value={RESUME_CONTACT.email} labels={{ copy: t.copy, copied: t.copied, failed: t.copyFailed }} />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <a href={RESUME_CONTACT.linkedin} aria-label={t.linkedin} className={`${linkBtn} hover:bg-[#0a66c2] hover:border-[#0a66c2]`} target="_blank" rel="noopener noreferrer">
                        <LinkedinIcon aria-hidden className="size-4" />
                        LinkedIn
                    </a>
                    <a href={RESUME_CONTACT.github} aria-label={t.github} className={`${linkBtn} hover:bg-black hover:border-black`} target="_blank" rel="noopener noreferrer">
                        <GithubIcon aria-hidden className="size-4" />
                        GitHub
                    </a>
                </div>
            </div>

        </AnimatedCard>

    )
}
