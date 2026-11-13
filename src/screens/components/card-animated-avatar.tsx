import { AnimatedCard } from "./animated-card";
import { AsciiReveal } from "./ascii-reveal";
import { TechMarquee } from "./tech-marquee";
import type { Dictionary } from "@/i18n/dictionaries";

export function CardAnimatedAvatar({ t }: { t: Dictionary["avatar"] }) {
    return (
        <AnimatedCard
            glowColor="255, 200, 40"
            aboveTheFold
            className="relative w-full h-full max-w-5xl mx-auto overflow-hidden rounded-[2rem] bg-[#0c0c0b] border border-white/5 min-h-[400px] rounded-bl-lg  rounded-tl-[50px] rounded-br-[50px]"
        >
            {/* Anéis quentes bem sutis: o retrato ASCII foi feito para fundo escuro,
                mas o card continua na família "quente" */}
            <div className="absolute inset-0 z-0" style={{
                background: 'radial-gradient(circle at 50% 100%, #FFD700 0%, #FFD700 20%, #FFC000 20%, #FFC000 40%, #FFAA00 40%, #FFAA00 60%, #FF8C00 60%, #FF8C00 80%, #FF6F00 80%, #FF6F00 100%)',
                opacity: 0.1
            }}></div>

            {/* Brilho quente na base */}
            <div className="absolute inset-0 z-1" style={{
                background: 'radial-gradient(120% 60% at 50% 100%, rgba(255,140,0,0.22) 0%, transparent 70%)',
            }}></div>

            <AsciiReveal
                className="absolute inset-0 z-20 cursor-crosshair"
                label={t.label}
            >
                <TechMarquee />

                {/* Mesma tipografia do "Olá, Eu sou Sandro." (card-animated) */}
                <span className="absolute top-8 left-8 text-lg font-medium text-white/0 transition-colors duration-700 delay-300
                                 group-data-[revealed=true]/reveal:text-white/60">
                    {t.stack}
                </span>
            </AsciiReveal>
        </AnimatedCard>
    )
}
