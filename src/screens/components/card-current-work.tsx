import type { Dictionary } from "@/i18n/dictionaries";

export function CardCurrentWork({ t }: { t: Dictionary["currentWork"] }) {
    return (
        <div className="relative w-full mx-auto overflow-hidden rounded-lg rounded-tl-[50px] rounded-tr-[50px] rounded-bl-[50px] 
                        isolate p-6 md:p-12 border border-white/5 min-h-[400px]
                        bg-[url('/images/banner2k.avif')] bg-cover bg-[50%_50%]
                        bg-linear-to-br from-blue-900/40 to-blue-400/90">
            <div className="w-full mb-32">
                <h3 className="text-2xl md:text-4xl font-light w-full max-w-full md:max-w-[80%] leading-tight md:leading-12">{t.titleBefore} <span className="text-white font-bold">HVEX</span></h3>
                <p className="text-sm md:text-md font-extralight leading-7 md:leading-8 max-w-full md:max-w-[80%] mt-4 md:mt-8">
                    {t.text}
                </p>
            </div>

            <div className="absolute bottom-6 right-6 perspective-[800px] ">
                <div
                    className="w-56 h-26 bg-[url('/images/hvex/logo-hvex.webp')]
                                bg-contain bg-no-repeat
                                opacity-30
                                transform
                                rotate-x-[65deg]
                                rotate-z-[-15deg]
                                blur-[0.3px]
                                drop-shadow-2xl"
                />
            </div>

        </div>
    )
}
