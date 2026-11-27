import { GraduationCap } from "lucide-react";
import Image from "next/image";
import { FEATURED_TECH, TECH_GROUPS, type TechGroupId } from "@/data/tech-stack";
import type { Dictionary } from "@/i18n/dictionaries";
import { AnimatedCard } from "./animated-card";
import { TechBadge } from "./tech-badge";
import { techIcon } from "./tech-icons";

type T = Dictionary["skills"];

/** Tecnologias: 8 principais em destaque + o restante por categoria */
export function CardSkills({ t }: { t: T }) {
    return (
        <AnimatedCard
            glowColor="74, 222, 128"
            className="relative w-full h-full max-w-5xl overflow-hidden flex flex-col gap-8 isolate rounded-[2rem] bg-[#131311] p-6 md:p-12 border border-white/5 rounded-tr-lg rounded-bl-[50px]"
        >
            {/* Background animado */}
            <div className="absolute left-1/2 top-1/2 -z-10 size-[1600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform">
                <div className="w-full h-full animate-rotate-bg">
                    <Image
                        src="/card-skills-bg.png"
                        alt=""
                        width={933}
                        height={386}
                        sizes="1010px"
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-normal">{t.title}</h2>

            <div>
                <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-white/65">{t.featured}</h3>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {FEATURED_TECH.map((slug) => {
                        const icon = techIcon(slug);
                        if (!icon) return null;
                        return (
                            <li
                                key={slug}
                                className="group/tech flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-colors duration-300 hover:border-(--brand)"
                                style={{ "--brand": `#${icon.hex}` } as React.CSSProperties}
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-6 shrink-0 text-(--brand)">
                                    <use href={`/icons/tech.svg#${icon.slug}`} />
                                </svg>
                                <span className="text-sm font-medium text-white/90">{icon.title}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                {(Object.keys(TECH_GROUPS) as TechGroupId[]).map((g) => (
                    <div key={g}>
                        <h3 className="mb-3 text-xs uppercase tracking-[0.2em] text-white/65">{t.groups[g]}</h3>
                        <ul className="flex flex-wrap gap-2">
                            {TECH_GROUPS[g].map((s) => (
                                <TechBadge key={s} item={s} />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </AnimatedCard>
    )
}

/** Card de uma linha: o que está estudando agora */
export function CardLearning({ t }: { t: T }) {
    return (
        <AnimatedCard
            glowColor="74, 222, 128"
            tiltStrength={1}
            className="relative w-full overflow-hidden rounded-[2rem] rounded-tr-lg border border-white/5 bg-[#131311] px-6 py-4 md:px-12"
        >
            <h2 className="flex items-center gap-3 text-base font-light text-white/85">
                <GraduationCap aria-hidden className="size-5 shrink-0 text-emerald-300" />
                <span>
                    {t.learning}{" "}
                    <a
                        href="https://curso.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-white underline decoration-emerald-300/60 underline-offset-4 hover:decoration-emerald-300"
                    >
                        curso.dev
                    </a>
                </span>
            </h2>
        </AnimatedCard>
    )
}
