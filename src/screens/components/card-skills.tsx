import Image from "next/image";
import { AnimatedCard } from "./animated-card";
import type { Dictionary } from "@/i18n/dictionaries";

type T = Dictionary["skills"];

function CardHeader({ t }: { t: T }) {

    return (
        <div className="w-full flex items-center justify-between">
            <h4 className="text-base font-light text-white opacity-80">
                {t.kicker}
            </h4>

        </div>
    )
}

function CardContent({ t }: { t: T }) {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl md:text-3xl font-normal w-full leading-8 md:leading-10 max-w-full md:max-w-[50%]">{t.title}</h1>
            <p className="text-base font-extralight leading-7 md:leading-9 max-w-full md:max-w-[60%]">
                {t.text}
            </p>
        </div>
    )
}

export function CardSkills({ t }: { t: T }) {
    return (
        <AnimatedCard
            glowColor="74, 222, 128"
            className="relative w-full h-full max-w-5xl overflow-hidden flex flex-col gap-4 isolate rounded-[2rem] bg-[#131311] p-6 md:p-12 border border-white/5 rounded-tr-lg rounded-bl-[50px]"
        >

            {/* Background animado */}
            <div className="absolute left-1/2 top-1/2 z-0 size-[1600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform">
                <div className="w-full h-full animate-rotate-bg">
                    <Image
                        src="/card-skills-bg.png"
                        alt=""
                        width={933}
                        height={386}
                        sizes="1010px"
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>
            </div>

            <CardHeader t={t} />
            <CardContent t={t} />
        </AnimatedCard>

    )
}
