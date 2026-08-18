import { ArrowRight, ExternalLinkIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CardCurrentWork() {
    return (
        <div className="relative w-full mx-auto overflow-hidden rounded-lg rounded-tl-[50px] rounded-tr-[50px] rounded-bl-[50px] 
                        p-6 md:p-12 border border-white/5 backdrop-blur-lg min-h-[400px]
                        bg-[url('/images/banner2k.avif')] bg-cover bg-[50%_50%]
                        bg-linear-to-br from-blue-900/40 to-blue-400/90">
            <div className="w-full mb-32">
                <h2 className="text-2xl md:text-4xl font-light w-full max-w-full md:max-w-[80%] leading-tight md:leading-12">Atualmente estou trabalhando na <span className="text-white font-bold">HVEX</span></h2>
                <p className="text-sm md:text-md font-extralight leading-7 md:leading-8 max-w-full md:max-w-[80%] mt-4 md:mt-8">
                    Estou construindo interfaces dinamicas, otimizadas e escalaveis para o setor eletrico, promovendo a melhor experiencia de usuario.
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

export function CardCurrentWorkPortfolio() {
    return (
        <div className="relative w-full mx-auto overflow-hidden 
                        rounded-lg rounded-tr-[50px] rounded-tl-[50px] rounded-br-[50px] 
                        p-6 md:p-12 border border-white/5 backdrop-blur-lg 
                        min-h-[400px] md:min-h-[560px]
                        bg-gradient-to-br from-[#051824]/90 to-[#041e36]/95">

   
            <div className="absolute inset-0 -z-10">
                <div className="absolute -top-24 -left-24 w-[350px] h-[350px] 
                                bg-cyan-500/30 blur-[120px] rounded-full"></div>

                <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] 
                                bg-blue-600/30 blur-[120px] rounded-full"></div>
            </div>

            {/* Overlay neon suave */}
            <div className="absolute inset-0 
                            bg-gradient-to-br 
                            from-cyan-500/5 
                            via-transparent 
                            to-blue-500/10 
                            mix-blend-overlay pointer-events-none">
            </div>

            <div className="relative w-full">
                <Link
                    href="https://hvex.com.br"
                    target="_blank"
                    className="flex items-center text-4xl font-light 
                               w-full max-w-[80%] leading-12 whitespace-nowrap
                               opacity-80 transition-all duration-300
                               hover:opacity-100">
                    <span>hvex</span>
                    <span className="opacity-50">.com.br</span>

                    <span className="p-1 ml-4 w-12 h-12 rounded-full 
                                     bg-white/10 backdrop-blur-md
                                     flex items-center justify-center
                                     border border-white/20
                                     hover:bg-cyan-400/20 transition">
                        <ArrowRight className="-rotate-45" />
                    </span>
                </Link>
                <p className="text-md font-extralight leading-8 opacity-80 mt-2">
                    Ensaios, proteção, monitoramento, controle e gestão de ativos no setor elétrico.
                </p>
            </div>

            
                <div
                    className="relative w-full h-full flex items-center 
             mt-8 justify-center -mb-12 
             max-h-[500px] overflow-hidden"
                >
                    <Image
                        src="/images/hvex/hvex_site.jpg"
                        alt="HVEX"
                        fill
                        className="w-full max-w-[460px] mx-auto object-cover object-top rounded-t-[2rem]" 
                    />
                </div>
            
        </div>
    )
}